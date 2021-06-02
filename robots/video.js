const fs = require('fs');
const { execSync } = require('child_process');

function robot(players) {
  const contentFilePath =
    __dirname + '/../remotion-video/.data/players-data.json';
  fs.writeFileSync(contentFilePath, JSON.stringify(players));

  const remotionPath = __dirname + '/../remotion-video';

  execSync(`npm run build -- --props='${JSON.stringify({ players })}'`, {
    cwd: remotionPath,
    stdio: 'inherit',
  });

  const fileName = `./../dist/${players[0].slug}-vs-${players[1].slug}.mp4`;
  execSync(`cp out.mp4 ${fileName}`, {
    cwd: remotionPath,
    stdio: 'inherit',
  });
}

module.exports = robot;
