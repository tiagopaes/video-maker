import * as functions from 'firebase-functions';
import { Telegraf } from 'telegraf';
import { getPlayer } from './transferMarkt'

const bot = new Telegraf(functions.config().telegrambot.key);

const createVideoCommand = '/createVideo';

bot.command(createVideoCommand, createVideo);
bot.catch(errorHandler);
bot.launch();

exports.bot = functions.https.onRequest((req, res) => {
  bot.handleUpdate(req.body, res);
})

// functions

async function createVideo(ctx: any) {
  const [firstPlayerUrl, secondPlayerUrl] = (ctx.message.text as String)
    .replace(createVideoCommand + ' ', '')
    .split(' ');
  console.log([firstPlayerUrl, secondPlayerUrl]);
  const firstPlayer = await getPlayer(firstPlayerUrl);
  const secondPlayer = await getPlayer(secondPlayerUrl);

  ctx.reply(`The video '${firstPlayer.personal_info.name} vs ${secondPlayer.personal_info.name}' is processing...`);
}

function errorHandler(err: unknown, ctx: any) {
  functions.logger.error('[Bot] Error', err)
  ctx.reply(`Ooops, aconteceu um erro inesperado ${ctx.updateType}`, err)
}
