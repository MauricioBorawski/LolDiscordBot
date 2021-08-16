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

    const summonerInfo = getSummonerData(summoner_name)
      .then(({ data: { id, summonerLevel: summoner_level } }) => {
        return { id, summoner_level };
      })
      .catch((error) => {
        console.log("Error en el nombre de invocador");
      });

    const rankInfo = summonerInfo
      .then(({ id }) => {
        return getRankData(id).then(({ data: rank }) => {
          return { rank };
        });
      })
      .catch(() => {
        console.log(
          "Hubo un error tratando de conseguir los datos del invocador."
        );
      });

    const championMastery = summonerInfo
      .then(({ id }) => {
        return getChampMastery(id).then(({ data: champs_mastery }) => {
          const treeFirstChampions = champs_mastery.slice(0, 3);

          const bestMasteryChampions = treeFirstChampions.map((champ) =>
            championList.find(
              (champ2) => champ.championId.toString() === champ2.key
            )
          );
          return { treeFirstChampions, bestMasteryChampions };
        });
      })
      .catch(() => {
        console.log("Hubo un error tratando de obtener las maestrias");
      });

    Promise.all([summonerInfo, rankInfo, championMastery])
      .then(
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
      )
      .catch(() => {
        interaction.followUp({
          content: "El nombre de invocador no existe ❌",
          ephemeral: true,
        });
      });
  },
};
