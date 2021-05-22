import puppeteer from 'puppeteer';
import * as functions from 'firebase-functions';

const log = functions.logger.info;

export interface Player {
  id: string,
  slug: string,
  url: string,
  personal_info: personalInfoModel,
  international_career: internationalCareerModel,
  national_leagues_career: {},
  champions_league_career: {},
  total_career: totalCareerModel,
  achievements: {},
}

interface personalInfoModel {
  name : string,
  image : string,
  birth_date : string,
  age : string,
  country : string,
  height : string,
  market_value : string|null,
  current_club : string|null,
  position : string,
  most_games_for : string|null
}

interface totalCareerModel {
  matches: number,
  goals: number,
  assists: number,
  yellow_cards: number,
  red_cards: number,
  goals_average: number | null,
  assists_average: number | null
}

interface internationalCareerModel {
  matches: number,
  goals: number,
  goals_average: number,
  assists: number,
  assists_average: number,
  yellow_cards: number,
  red_cards: number,
}

export async function getPlayer(url: string): Promise<Player> {
  const player = {
    id: url.split('/')[6],
    slug: url.split('/')[3],
    url,
    personal_info: <personalInfoModel>{},
    international_career: <internationalCareerModel>{},
    national_leagues_career: {},
    champions_league_career: {},
    total_career: <totalCareerModel>{},
    achievements: {},
  };
  const host = 'https://www.transfermarkt.com';

  log(`> Fetching ${player.slug} data...`);
  log(`> Fetching ${player.slug} data...`)

  const browser = await puppeteer.launch({
    // headless: false,
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url, {
    waitUntil: 'load',
    timeout: 0,
  });
  await page.waitForSelector('#main .dataMain h1', { visible: true });

  log('> Fetching personal info...');
  player.personal_info = await page.evaluate((): personalInfoModel => {
    const name = (document.querySelector('#main .dataMain h1') as HTMLElement).innerText;
    const image = (document.querySelector('#main div.dataBild img') as HTMLImageElement).src;
    const birth_date = (
      document.querySelector('#main div.dataContent span[itemprop="birthDate"]') as HTMLElement
    ).innerText.trim().split(' (')[0];
    const age = (document
      .querySelector('#main div.dataContent span[itemprop="birthDate"]') as HTMLElement)
      .innerText.trim()
      .split(' (')[1]
      .replace(')', '');
    const country = (document.querySelector(
      '#main div.dataContent span[itemprop="nationality"]'
    ) as HTMLElement).innerText;
    const height = (document.querySelector(
      '#main div.dataContent span[itemprop="height"]'
    ) as HTMLElement).innerText;
    const market_value = document.querySelector('#main div.dataMarktwert a')
      ? (document.querySelector('#main div.dataMarktwert a') as HTMLElement)
        .innerText.split('Last update:')[0]
        .trim()
      : null;
    const current_club = (document.querySelector(
      '#main div.dataZusatzbox .dataZusatzDaten span[itemprop="affiliation"]'
    ) as HTMLElement).innerText;
    const most_games_for = document.querySelector(
      '#main > div:nth-child(12) > div > div > div.dataZusatzbox > div.dataZusatzDaten > span:nth-child(8) > a'
    )
      ? (document.querySelector(
        '#main > div:nth-child(12) > div > div > div.dataZusatzbox > div.dataZusatzDaten > span:nth-child(8) > a'
      ) as HTMLElement).innerText
      : null;
    const position = (document.querySelector(
      'div.dataDaten:nth-child(2) > p:nth-child(2) > span:nth-child(2)'
    ) as HTMLElement).innerText;

    return {
      name,
      image,
      birth_date,
      age,
      country,
      height,
      market_value,
      current_club,
      position,
      most_games_for
    };
  });
  log('> Done.');

  log('> Fetching internation career info...');
  await page.click('#national-team a');
  await page.waitForSelector('tfoot tr td', { visible: true });
  player.international_career = await page.evaluate(() => {
    const tds = document.querySelectorAll('tfoot tr td');
    const matches = Number((tds[2] as HTMLElement).innerText.replace('-', ''));
    const goals = Number((tds[3] as HTMLElement).innerText.replace('-', ''));
    const assists = Number((tds[4] as HTMLElement).innerText.replace('-', ''));
    const yellow_cards = Number((tds[5] as HTMLElement).innerText.replace('-', ''));
    const red_cards = Number((tds[7] as HTMLElement).innerText.replace('-', ''));
    const goals_average = Number((goals / matches).toFixed(2));
    const assists_average = Number((assists / matches).toFixed(2));

    return {
      matches,
      goals,
      goals_average,
      assists,
      assists_average,
      yellow_cards,
      red_cards,
    };
  });
  log('> Done.');

  log('> Fetching national leagues career info...');
  await page.goto(
    `${host}/${player.slug}/detaillierteleistungsdaten/spieler/${player.id}`
  );
  await page.waitForSelector('#yw1 > table > tfoot > tr > td', { visible: true });
  player.national_leagues_career = await page.evaluate(() => {
    const tds = document.querySelectorAll('#yw1 > table > tfoot > tr > td');
    const matches = Number((tds[4] as HTMLElement).innerText.replace('-', ''));
    const goals = Number((tds[5] as HTMLElement).innerText.replace('-', ''));
    const assists = Number((tds[6] as HTMLElement).innerText.replace('-', ''));
    const yellow_cards = Number((tds[7] as HTMLElement).innerText.replace('-', ''));
    const red_cards = Number((tds[9] as HTMLElement).innerText.replace('-', ''));
    const goals_average = Number((goals / matches).toFixed(2));
    const assists_average = Number((assists / matches).toFixed(2));

    return {
      matches,
      goals,
      goals_average,
      assists,
      assists_average,
      yellow_cards,
      red_cards,
    };
  });
  log('> Done.');

  log('> Fetching champions league career info...');
  player.champions_league_career = await page.evaluate(() => {
    let matches = 0;
    let goals = 0;
    let assists = 0;
    let yellow_cards = 0;
    let red_cards = 0;

    document.querySelectorAll('#yw3 > table > tbody > tr').forEach((tr) => {
      if ((tr.children[2] as HTMLElement).innerText === 'Champions League') {
        matches += Number((tr.children[4] as HTMLElement).innerText.replace('-', ''));
        goals += Number((tr.children[5] as HTMLElement).innerText.replace('-', ''));
        assists += Number((tr.children[6] as HTMLElement).innerText.replace('-', ''));
        yellow_cards += Number((tr.children[7] as HTMLElement).innerText.replace('-', ''));
        red_cards += Number((tr.children[9] as HTMLElement).innerText.replace('-', ''));
      }
    });
    const goals_average = Number((goals / matches).toFixed(2));
    const assists_average = Number((assists / matches).toFixed(2));

    return {
      matches,
      goals,
      goals_average,
      assists,
      assists_average,
      yellow_cards,
      red_cards,
    };
  });
  log('> Done.');

  log('> Fetching total career info...');
  await page.goto(
    `${host}/${player.slug}/leistungsdatendetails/spieler/${player.id}`
  );
  await page.waitForSelector('tfoot tr td', {
    visible: true,
  });
  player.total_career = await page.evaluate((): totalCareerModel => {
    const tds = document.querySelectorAll('tfoot tr td');
    const matches = Number((tds[4] as HTMLElement).innerText.replace('-', ''));
    const goals = Number((tds[6] as HTMLElement).innerText.replace('-', ''));
    const assists = Number((tds[7] as HTMLElement).innerText.replace('-', ''));
    const yellow_cards = Number(
      (tds[8] as HTMLElement).innerText.split('/')[0].replace('-', '')
    );
    const red_cards = Number((tds[8] as HTMLElement).innerText.split('/')[2].replace('-', ''));

    return {
      matches,
      goals,
      assists,
      yellow_cards,
      red_cards,
      assists_average: null,
      goals_average: null
    };
  });

  player.total_career.matches += player.international_career.matches;
  player.total_career.goals += player.international_career.goals;
  player.total_career.assists += player.international_career.assists;
  player.total_career.yellow_cards += player.international_career.yellow_cards;
  player.total_career.red_cards += player.international_career.red_cards;
  player.total_career.goals_average = Number(
    (player.total_career.goals / player.total_career.matches).toFixed(2)
  );
  player.total_career.assists_average = Number(
    (player.total_career.assists / player.total_career.matches).toFixed(2)
  );
  log('> Done.');

  log('> Fetching achievements info...');
  await page.goto(`${host}/${player.slug}/erfolge/spieler/${player.id}`);
  await page.waitForSelector('.box tr.bg_Sturm .hauptlink', {
    visible: true,
  });
  player.achievements = await page.evaluate(() => {
    let top_scorer = 0;
    let champions_league = 0;
    let fifa_world_cup = 0;
    let fifa_ballon_dor = 0;
    let golden_boot = 0;
    let fifa_the_best = 0;

    document.querySelectorAll('.box tr.bg_Sturm .hauptlink').forEach((td) => {
      let [quantity, title] = (td as HTMLElement).innerText.split('x');
      const convertedQuantity = Number(quantity);
      title = title.trim();

      if (title === 'Top scorer') {
        top_scorer = convertedQuantity;
      }

      if (title === 'Champions League winner') {
        champions_league = convertedQuantity;
      }

      if (title === 'World Cup winner') {
        fifa_world_cup = convertedQuantity;
      }

      if (title === "Winner Ballon d'Or") {
        fifa_ballon_dor = convertedQuantity;
      }

      if (title === 'Golden Boot winner') {
        golden_boot = convertedQuantity;
      }

      if (title === "The Best FIFA Men's Player") {
        fifa_the_best = convertedQuantity;
      }
    });

    return {
      top_scorer,
      champions_league,
      fifa_world_cup,
      fifa_ballon_dor,
      golden_boot,
      fifa_the_best,
    };
  });
  log('> Done.');

  await browser.close();

  log(`> ${player.slug} data fetched.`);

  return player;
}
