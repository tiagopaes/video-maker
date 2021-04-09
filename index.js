const robots = {
  input: require('./robots/input.js'),
  transferMarkt: require('./robots/transferMarkt.js'),
  video: require('./robots/video.js'),
};

async function start() {
  try {
    const playersUrls = robots.input();
    const firstPlayer = await robots.transferMarkt(playersUrls[0]);
    const secondPlayer = await robots.transferMarkt(playersUrls[1]);
    await robots.video([firstPlayer, secondPlayer]);
  } catch(error) {
    console.log(error);
  }
}

start();

