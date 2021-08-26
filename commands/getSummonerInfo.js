require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const Errors = require("../errors/errors");
const { setSpectatorData } = require("../utils/buttonResponse");
const getChampionList = require("../champions/champions");
const getSummonerData = require("../apiCalls/summonerData");
const getRankData = require("../apiCalls/rankData");
const getChampMastery = require("../apiCalls/champMasteryData");
const getSpectatorData = require("../apiCalls/spectatorInfo");
const generateSearchMessege = require("../utils/generateSearchMessege");
const generateNewButton = require("../utils/generateButton");

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
      .then(
        ({ data: { id, summonerLevel: summoner_level, profileIconId } }) => {
          return { id, summoner_level, profileIconId };
        }
      )
      .catch(() => {
        Errors.setErrors({
          type: "summoner_name_error",
          message: "Ha habido un error en el nombre del invocador ❌",
        });
      });

    const rankInfo = summonerInfo
      .then(({ id }) => {
        return getRankData(id).then(({ data: rank }) => {
          return { rank };
        });
      })
      .catch(() => {
        Errors.setErrors({
          type: "summoner_rank_error",
          message:
            "Ha habido un error al tratar de conseguir los datos del invocador ❌",
        });
      });

    const championMastery = summonerInfo.then(({ id }) => {
      return getChampMastery(id)
        .then(({ data: champs_mastery }) => {
          const treeFirstChampions = champs_mastery.slice(0, 3);

          const bestMasteryChampions = treeFirstChampions.map((champ) =>
            championList.find(
              (champ2) => champ.championId.toString() === champ2.key
            )
          );
          return { treeFirstChampions, bestMasteryChampions };
        })
        .catch(() => {
          Errors.setErrors({
            type: "champ_mastery_error",
            message:
              "Ha habido un error al tratar de conseguir los campeones ❌",
          });
        });
    });

    const spectator = summonerInfo.then(({ id }) => {
      return getSpectatorData(id)
        .then(
          ({ data: { gameId, gameType, participants, bannedChampions } }) => {
            return {
              gameId,
              gameType,
              participants,
              bannedChampions,
              status_code: 200,
            };
          }
        )
        .catch(() => ({ status_code: 404 }));
    });

    Promise.all([summonerInfo, rankInfo, championMastery, spectator])
      .then(
        ([
          { summoner_level, profileIconId },
          { rank },
          { treeFirstChampions, bestMasteryChampions },
          { status_code, gameId, gameType, participants, bannedChampions },
        ]) => {
          setSpectatorData({
            status_code,
            gameId,
            gameType,
            participants,
            bannedChampions,
            champions: championList,
          });
          interaction.followUp({
            embeds: [
              generateSearchMessege(
                summoner_name,
                summoner_level,
                profileIconId,
                rank,
                bestMasteryChampions,
                treeFirstChampions
              ),
            ],
            ephemeral: true,
            components: [generateNewButton(status_code, "Partida en vivo 🔴")],
          });
        }
      )
      .catch((error) => {
        console.log(error);
        Errors.setErrors({
          type: "promise_error",
          message: "Hubo un error al procesar los datos ❌",
        });
        interaction.followUp({
          content: Errors.errors[0].message,
          ephemeral: true,
        });
        Errors.resetErrors();
      });
  },
};
