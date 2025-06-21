let blacklist = [];

function addTokenToBlacklist(token) {
  blacklist.push(token);
}

function isTokenBlacklisted(token) {
  return blacklist.includes(token);
}

module.exports = { addTokenToBlacklist, isTokenBlacklisted };
