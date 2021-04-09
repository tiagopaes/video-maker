const readline = require('readline-sync');

function robot() {
  const firstPlayerUrl = readline.question('First player url: ');
  const secondPlayerUrl = readline.question('Second player url: ');

  return [firstPlayerUrl, secondPlayerUrl];
}

module.exports = robot;
