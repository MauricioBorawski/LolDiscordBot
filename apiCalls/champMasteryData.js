require('dotenv').config();
const axios = require('axios');

async function getChampMasteryData(summoner_id){
    return await axios.get(`https://la2.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner_id}?api_key=${process.env.RIOT_API_KEY}`)
}

module.exports = getChampMasteryData;