require('dotenv').config()
const axios = require('axios');

async function getRankInfo(summoner_id){
    return await axios.get(`https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner_id}?api_key=${process.env.RIOT_API_KEY}`);
}

module.exports = getRankInfo;