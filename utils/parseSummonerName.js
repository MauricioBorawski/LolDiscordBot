const { Buffer } = require("buffer");

//Regex for checking if there is a UTF8 character
//Transform that character to HEX
//Another regex to catch the first 2 characters
//Add % at the beggining and the end of the name
const parseSummonerName = (summoner_name) =>   
summoner_name.replace(/[^a-zA-Z0-9-. ]/g, (letter) =>
  Buffer.from(letter)
    .toString("hex")
    .replace(/^[a-z-A-Z-0-9]{2}/g, (hexcode) => `%${hexcode}%`)
);

module.exports = parseSummonerName;