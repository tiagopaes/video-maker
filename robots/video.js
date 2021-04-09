const fs = require('fs');
const { execSync } = require('child_process');

function robot(players) {
  const contentFilePath =
    __dirname + '/../remotion-video/src/assets/players-data.json';
  fs.writeFileSync(contentFilePath, JSON.stringify(players));

  execSync('npm run build', {
    cwd: __dirname + '/../remotion-video',
    stdio: 'inherit',
  });

  const fileName = `${players[0].slug}-vs-${players[1].slug}.mp4`;
  execSync(`mv output.mp4 ${fileName}`, {
    cwd: __dirname + '/../dist',
    stdio: 'inherit',
  });
}

module.exports = robot;
