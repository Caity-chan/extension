var express= require('express')
var app = express();
const fs = require('fs')
const command = fs.readFileSync("./command.js", "utf-8")
app.get('/command', (req, res) => {
  const thingy = command.split("\n")
  res.send(thingy.join("\n"));
})
app.listen(3000);