
module.exports = {
  name: "blacklist",
  description: "blacklist api",
  cbl(path, value) {
    const b = fs.readFileSync(path, 'utf-8');
    const blacklist = b.split("\n");
    return blacklist.includes(value);
  }
}