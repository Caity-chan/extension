module.exports = {
  name: "test",
  description: "test api",
  mold(message, prefix) {
    args = message.content.slice(prefix.length).trim().split(/ +/);
    command = args.shift().toLowerCase();
    molded = { "args" : args,  "command" : command };
    return molded;
  }
}