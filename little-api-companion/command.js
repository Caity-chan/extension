const Discord = require('discord.js');
const fs = require('fs');

const mold = (message, prefix) => {
  args = message.content.slice(prefix.length).trim().split(/ +/);
  command = args.shift().toLowerCase();
  //client.prefix = prefix;
  molded = { "args" : args,  "command" : command };
  return molded;
}
const cbl = (path, value) => {
  b = fs.readFileSync(path, 'utf-8');
  blacklist = b.split("\n");
  return blacklist.includes(value);
}

const cmdInit = (client, path) => {
    
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    client.categories = [];
    client.catcmds = [];
    const commandFolders = fs.readdirSync(path);

    let commandlist = ['']
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));


        for (const file of commandFiles) {
            delete require.cache[require.resolve(`${process.cwd()}/${path}/${folder}/${file}`)];
            const commander = require(`${process.cwd()}/${path}/${folder}/${file}`);
            
            client.commands.set(commander.name, commander);
            if (!client.categories.includes(folder)) {
                client.categories.push(folder);
                client.catcmds[folder] = [];
            }
            client.catcmds[folder].push(commander);
            if (commander.aliases) {
                for (const aly of commander.aliases) {
                    client.aliases.set(aly, commander);
                }
            }
            
            commandlist.push(commander.name);
        }
    }

    return commandlist;
}

const evInit = (client, path) => {
    
    client.events = new Discord.Collection();
    client.initializedEvs = new Discord.Collection();
    const eventFolders = fs.readdirSync(path);
    for (const eventFolder of eventFolders) {
        const eventFiles = fs.readdirSync(`${path}/${eventFolder}/`).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            delete require.cache[require.resolve(`${process.cwd()}/${path}/${eventFolder}/${file}`)];
            const eventer = require(`${process.cwd()}/${path}/${eventFolder}/${file}`);
            client.events.set(eventer.name, eventer);
        }
        
        
    }
    if (!index.name) {
        
    }
    client.events.forEach(function(index) {
        check = client.initializedEvs.get(index.name);
        if (!check === true) {
            client.on(index.name, (event) => {
                if (index.name != "message") console.log(index.name, event);
                client.events.get(index.name).eventexec(client, event);
                client.initializedEvs.set(index.name, true);
            });
        }
    })
}
const execmd = (command, message, args, client) => {
    let cmd = client.commands.get(command)
    if (cmd) return cmd.execute(message, args, client);
    else cmd = client.aliases.get(command)
    if (cmd) return cmd.execute(message, args, client);
}
const helpCmd = (message, args, client) => {
        
    if(!args.join(" ")) {
        helpEmbed = new Discord.MessageEmbed().setColor('#43f8b7').addFields(
            {name: "Commands", value: "This is the category command list for the " + client.user.username + " bot!"}
        )
        for (const category of client.categories) {
            helpEmbed.addFields(
                {
                    name: category,
                    value: "help " + category
                }
            )
        }
    } else {
        category = args.join(" ");
        helpEmbed = new Discord.MessageEmbed().setColor('#43f8b7').addFields(
            {name: "Commands", value: "This is the " + category + " command list for the " + client.user.username + " bot!"}
        )
        client.catcmds[category].forEach(command=>{
            helpEmbed.addFields(
                {
                    name: command.name,
                    value: "usage: " + command.usage
                }
            )
        })
    }
        
    message.channel.send(
        helpEmbed
    );
}
module.exports = {
  mold,
  cbl,
  cmdInit,
  evInit,
  execmd,
  helpCmd
}
  


  
