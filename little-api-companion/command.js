
  mold(message, prefix) {
    args = message.content.slice(prefix.length).trim().split(/ +/);
    command = args.shift().toLowerCase();
    molded = { "args" : args,  "command" : command };
    return molded;
  }



  cbl(path, value) {
    const b = fs.readFileSync(path, 'utf-8');
    const blacklist = b.split("\n");
    return blacklist.includes(value);
  }
