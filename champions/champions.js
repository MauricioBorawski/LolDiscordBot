const axios = require("axios");
//Function to get all the champios.

const getChampionData = async () => {
  const finalChampionList = [];

  const {
    data: { data: rawChampionList },
  } = await axios.get(
    "http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/champion.json"
  );

  Object.entries(rawChampionList).forEach((champion) =>
    finalChampionList.push({ name: champion[1].name, key: champion[1].key })
  );

  return finalChampionList;
};

module.exports = getChampionData;
