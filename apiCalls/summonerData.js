require("dotenv").config();
const { Buffer } = require("buffer");
const axios = require("axios");

async function getSummonerData(summoner_name) {
  //Regex for checking if there is a UTF8 character
  //Transform that character to HEX
  //Another regex to catch the first 2 characters
  //Add % at the beggining and the end of the name
  const parsedSummonerName = summoner_name.replace(/[^a-zA-Z0-9-. ]/g, (letter) =>
    Buffer.from(letter)
      .toString("hex")
      .replace(/^[a-z-A-Z-0-9]{2}/g, (hexcode) => `%${hexcode}%`)
  );
  
  return await axios.get(
    `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${parsedSummonerName}?api_key=${process.env.RIOT_API_KEY}`
  );
}

module.exports = getSummonerData;
