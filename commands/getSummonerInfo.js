require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const getChampionList = require("../champions/champions");
const getSummonerData = require("../apiCalls/summonerData");
const getRankData = require("../apiCalls/rankData");
const getChampMastery = require("../apiCalls/champMasteryData");
const generateSearchMessege = require("../utils/generateSearchMessege");

let championList;
getChampionList().then((data) => (championList = data));

const api_key = process.env.RIOT_API_KEY;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buscar")
    .setDescription("Ingrese un nombre de invocador.")
    .addStringOption((option) =>
      option
        .setName("nombre_de_invocador")
        .setDescription("Nombre de invocador")
        .setRequired(true)
    ),
  async execute(interaction) {
    const summoner_name = interaction.options.getString("nombre_de_invocador");

    interaction.reply({ content: "Buscando...", ephemeral: true });

    const summonerInfo = getSummonerData(summoner_name).then(
      ({ data: { id, summonerLevel: summoner_level } }) => {
        return { id, summoner_level };
      }
    );

    const rankInfo = summonerInfo.then(({ id }) => {
      return getRankData(id).then(({ data: rank }) => {
        return { rank };
      });
    });

    const championMastery = summonerInfo.then(({ id }) => {
      return getChampMastery(id).then(({ data: champs_mastery }) => {
        const treeFirstChampions = champs_mastery.slice(0, 3);

        const bestMasteryChampions = treeFirstChampions.map((champ) =>
          championList.find(
            (champ2) => champ.championId.toString() === champ2.key
          )
        );
        return { treeFirstChampions, bestMasteryChampions };
      });
    });

    Promise.all([summonerInfo, rankInfo, championMastery]).then(
      ([
        { summoner_level },
        { rank },
        { treeFirstChampions, bestMasteryChampions },
      ]) => {
        interaction.followUp({
          content: generateSearchMessege(
            summoner_name,
            summoner_level,
            rank,
            bestMasteryChampions,
            treeFirstChampions
          ),
          ephemeral: true,
        });
      }
    );
  },
};
