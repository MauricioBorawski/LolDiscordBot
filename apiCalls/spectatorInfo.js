require("dotenv").config();
const axios = require("axios");

const getSpectatorData = async (id) => {
  return await axios.get(
    `https://la2.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}?api_key=${process.env.RIOT_API_KEYS}`
  );
};

module.exports = getSpectatorData;
