require("dotenv").config();
const parseSummonerName = require('../utils/parseSummonerName');
const axios = require("axios");

async function getSummonerData(summoner_name) {
  const parsedSummonerName = parseSummonerName(summoner_name);
  
  return await axios.get(
    `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${parsedSummonerName}?api_key=${process.env.RIOT_API_KEY}`
  );
}

module.exports = getSummonerData;
