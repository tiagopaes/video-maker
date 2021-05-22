import { interpolate, Sequence, useCurrentFrame, useVideoConfig, Audio } from 'remotion';
import { Comparison } from './Comparison/Comparison';
import { Intro } from './Intro/Intro';
import { WhoIsTheBest } from './WhoIsBest/WhoIsTheBest';
import audio from './assets/audio.mp3';

export interface Player {
  id: string,
  slug: string,
  url: string,
  personal_info: {
    name: string,
    image: string,
    birth_date: string,
    age: string,
    country: string,
    height: string,
    market_value: string | null,
    current_club: string | null,
    position: string,
    most_games_for: string | null
  },
  international_career: {
    matches: number,
    goals: number,
    goals_average: number,
    assists: number,
    assists_average: number,
    yellow_cards: number,
    red_cards: number,
  },
  national_leagues_career: {
    matches: number,
    goals: number,
    goals_average: number,
    assists: number,
    assists_average: number,
    yellow_cards: number,
    red_cards: number,
  },
  champions_league_career: {
    matches: number,
    goals: number,
    goals_average: number,
    assists: number,
    assists_average: number,
    yellow_cards: number,
    red_cards: number,
  },
  total_career: {
    matches: number,
    goals: number,
    assists: number,
    yellow_cards: number,
    red_cards: number,
    goals_average: number | null,
    assists_average: number | null
  },
  achievements: {
    top_scorer: number,
    champions_league: number,
    fifa_world_cup: number,
    fifa_ballon_dor: number,
    golden_boot: number,
    fifa_the_best: number,
  },
}

export const Video: React.FC<{players: Array<Player>}> = ({players}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 15],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const comparisonSections = [
    {
      name: 'Personal Information',
      items: [
        {
          itemName: 'Country',
          leftItemValue: `${players[0].personal_info.country}`,
          rightItemValue: `${players[1].personal_info.country}`,
        },
        {
          itemName: 'Born',
          leftItemValue: `${players[0].personal_info.birth_date}`,
          rightItemValue: `${players[1].personal_info.birth_date}`,
        },
        {
          itemName: 'Age',
          leftItemValue: `${players[0].personal_info.age}`,
          rightItemValue: `${players[1].personal_info.age}`,
        },
        {
          itemName: 'Position',
          leftItemValue: `${players[0].personal_info.position}`,
          rightItemValue: `${players[1].personal_info.position}`,
        },
        {
          itemName: 'Current Club',
          leftItemValue: `${players[0].personal_info.current_club}`,
          rightItemValue: `${players[1].personal_info.current_club}`,
        },
        {
          itemName: players[0].personal_info.market_value ? 'Market Value' : 'Most Games for',
          leftItemValue: players[0].personal_info.market_value ? `${players[0].personal_info.market_value}` : `${players[0].personal_info.most_games_for}`,
          rightItemValue: players[0].personal_info.market_value ? `${players[1].personal_info.market_value}` : `${players[1].personal_info.most_games_for}`,
        },
      ],
    },
    {
      name: 'International Career',
      items: [
        {
          itemName: 'Matches',
          leftItemValue: `${players[0].international_career.matches}`,
          rightItemValue: `${players[1].international_career.matches}`,
        },
        {
          itemName: 'Goals',
          leftItemValue: `${players[0].international_career.goals}`,
          rightItemValue: `${players[1].international_career.goals}`,
        },
        {
          itemName: 'Goals Average',
          leftItemValue: `${players[0].international_career.goals_average}`,
          rightItemValue: `${players[1].international_career.goals_average}`,
        },
        {
          itemName: 'Assists',
          leftItemValue: `${players[0].international_career.assists}`,
          rightItemValue: `${players[1].international_career.assists}`,
        },
        {
          itemName: 'Assists Average',
          leftItemValue: `${players[0].international_career.assists_average}`,
          rightItemValue: `${players[1].international_career.assists_average}`,
        },
        {
          itemName: 'Yellow Cards',
          leftItemValue: `${players[0].international_career.yellow_cards}`,
          rightItemValue: `${players[1].international_career.yellow_cards}`,
        },
      ],
    },
    {
      name: 'National Leagues Career',
      items: [
        {
          itemName: 'Matches',
          leftItemValue: `${players[0].national_leagues_career.matches}`,
          rightItemValue: `${players[1].national_leagues_career.matches}`,
        },
        {
          itemName: 'Goals',
          leftItemValue: `${players[0].national_leagues_career.goals}`,
          rightItemValue: `${players[1].national_leagues_career.goals}`,
        },
        {
          itemName: 'Goals Average',
          leftItemValue: `${players[0].national_leagues_career.goals_average}`,
          rightItemValue: `${players[1].national_leagues_career.goals_average}`,
        },
        {
          itemName: 'Assists',
          leftItemValue: `${players[0].national_leagues_career.assists}`,
          rightItemValue: `${players[1].national_leagues_career.assists}`,
        },
        {
          itemName: 'Assists Average',
          leftItemValue: `${players[0].national_leagues_career.assists_average}`,
          rightItemValue: `${players[1].national_leagues_career.assists_average}`,
        },
        {
          itemName: 'Yellow Cards',
          leftItemValue: `${players[0].national_leagues_career.yellow_cards}`,
          rightItemValue: `${players[1].national_leagues_career.yellow_cards}`,
        },
      ],
    },
    {
      name: 'UEFA Champions League',
      items: [
        {
          itemName: 'Matches',
          leftItemValue: `${players[0].champions_league_career.matches}`,
          rightItemValue: `${players[1].champions_league_career.matches}`,
        },
        {
          itemName: 'Goals',
          leftItemValue: `${players[0].champions_league_career.goals}`,
          rightItemValue: `${players[1].champions_league_career.goals}`,
        },
        {
          itemName: 'Goals Average',
          leftItemValue: `${players[0].champions_league_career.goals_average}`,
          rightItemValue: `${players[1].champions_league_career.goals_average}`,
        },
        {
          itemName: 'Assists',
          leftItemValue: `${players[0].champions_league_career.assists}`,
          rightItemValue: `${players[1].champions_league_career.assists}`,
        },
        {
          itemName: 'Assists Average',
          leftItemValue: `${players[0].champions_league_career.assists_average}`,
          rightItemValue: `${players[1].champions_league_career.assists_average}`,
        },
        {
          itemName: 'Yellow Cards',
          leftItemValue: `${players[0].champions_league_career.yellow_cards}`,
          rightItemValue: `${players[1].champions_league_career.yellow_cards}`,
        },
      ],
    },
    {
      name: 'Total Career',
      items: [
        {
          itemName: 'Matches',
          leftItemValue: `${players[0].total_career.matches}`,
          rightItemValue: `${players[1].total_career.matches}`,
        },
        {
          itemName: 'Goals',
          leftItemValue: `${players[0].total_career.goals}`,
          rightItemValue: `${players[1].total_career.goals}`,
        },
        {
          itemName: 'Goals Average',
          leftItemValue: `${players[0].total_career.goals_average}`,
          rightItemValue: `${players[1].total_career.goals_average}`,
        },
        {
          itemName: 'Assists',
          leftItemValue: `${players[0].total_career.assists}`,
          rightItemValue: `${players[1].total_career.assists}`,
        },
        {
          itemName: 'Assists Average',
          leftItemValue: `${players[0].total_career.assists_average}`,
          rightItemValue: `${players[1].total_career.assists_average}`,
        },
        {
          itemName: 'Red Cards',
          leftItemValue: `${players[0].total_career.red_cards}`,
          rightItemValue: `${players[1].total_career.red_cards}`,
        },
      ],
    },
    {
      name: 'Trophies / Awards',
      items: [
        {
          itemName: 'Top Scorer',
          leftItemValue: `${players[0].achievements.top_scorer}`,
          rightItemValue: `${players[1].achievements.top_scorer}`,
        },
        {
          itemName: "Ballon D'or",
          leftItemValue: `${players[0].achievements.fifa_ballon_dor}`,
          rightItemValue: `${players[1].achievements.fifa_ballon_dor}`,
        },
        {
          itemName: 'FIFA The Best',
          leftItemValue: `${players[0].achievements.fifa_the_best}`,
          rightItemValue: `${players[1].achievements.fifa_the_best}`,
        },
        {
          itemName: 'Champions League',
          leftItemValue: `${players[0].achievements.champions_league}`,
          rightItemValue: `${players[1].achievements.champions_league}`,
        },
        {
          itemName: 'FIFA World Cup',
          leftItemValue: `${players[0].achievements.fifa_world_cup}`,
          rightItemValue: `${players[1].achievements.fifa_world_cup}`,
        },
        {
          itemName: 'Golden Boot',
          leftItemValue: `${players[0].achievements.golden_boot}`,
          rightItemValue: `${players[1].achievements.golden_boot}`,
        },
      ],
    },
  ];

  return (
    <div style={{ flex: 1, backgroundColor: '#171717' }}>
      <Audio src={audio} startFrom={0} endAt={durationInFrames} />
      <div style={{ opacity }}>
        <Sequence from={0} durationInFrames={180}>
          <Intro />
        </Sequence>
        <Sequence from={210} durationInFrames={8190}>
          <Comparison
            leftPlayerImage={players[0].personal_info.image}
            leftPlayerName={players[0].personal_info.name}
            rightPlayerImage={players[1].personal_info.image}
            rightPlayerName={players[1].personal_info.name}
            comparisonSections={comparisonSections}
          />
        </Sequence>
        <Sequence from={8370} durationInFrames={durationInFrames}>
          <WhoIsTheBest
            leftPlayerImage={players[0].personal_info.image}
            rightPlayerImage={players[1].personal_info.image}
          />
        </Sequence>
      </div>
    </div>
  );
};
