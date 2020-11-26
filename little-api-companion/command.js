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

const cmdInit = (client, path) => {

    const commandFolders = fs.readdirSync(path);

    let commandlist = ['']
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));


        for (const file of commandFiles) {
            const commander = require(`${process.cwd()}/${path}/${folder}/${file}`);
            client.commands.set(commander.name, commander);
            commandlist.push(commander.name);
        }
    }

    return commandlist;
}

module.exports = {
  mold,
  cbl,
  setCommands
}
  


  
