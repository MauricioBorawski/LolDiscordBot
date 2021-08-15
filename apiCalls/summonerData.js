require("dotenv").config();
const axios = require("axios");

async function getSummonerData(summoner_name) {
  return await axios.get(
    `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_name}?api_key=${process.env.RIOT_API_KEY}`
  );
}

module.exports = getSummonerData;
