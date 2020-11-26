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

const evInit = (client, path) => {
    const eventFolders = fs.readdirSync(path);
    for (const eventFolder of eventFolders) {
        const eventFiles = fs.readdirSync(`${path}/${eventFolder}/`).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const eventer = require(`${process.cwd()}/${path}/${eventFolder}/${file}`);
            client.events.set(eventer.name, eventer);
        }
        
        
    }
    client.events.forEach(function(index) {
        client.on(index.name, (event) => {
            if (index.name != "message") console.log(index.name, event);
            client.events.get(index.name).eventexec(client, event);
        });
    })
}
const execmd = (command, message, args, client) => {
    let cmd = client.commands.get(command)
    if (cmd) cmd.execute(message, args, client);
}
module.exports = {
  mold,
  cbl,
  cmdInit,
  evInit,
  execmd
}
  


  
