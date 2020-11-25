const fs = require('fs');

const mold = (message, prefix) => {
  args = message.content.slice(prefix.length).trim().split(/ +/);
  command = args.shift().toLowerCase();
  molded = { "args" : args,  "command" : command };
  return molded;
}
const cbl = (path, value) => {
  b = fs.readFileSync(path, 'utf-8');
  blacklist = b.split("\n");
  return blacklist.includes(value);
}
module.exports = {
  mold,
  cbl
}
  


  
