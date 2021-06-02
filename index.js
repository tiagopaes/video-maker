const argv = require('minimist')(process.argv.slice(2));
const robots = {
  transferMarkt: require('./robots/transferMarkt.js'),
  video: require('./robots/video.js'),
};

async function start() {
  try {
    const firstPlayer = await robots.transferMarkt(argv.firstPlayerUrl);
    const secondPlayer = await robots.transferMarkt(argv.secondPlayerUrl);
    await robots.video([firstPlayer, secondPlayer]);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}

start();

