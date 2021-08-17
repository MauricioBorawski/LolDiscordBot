const { MessageEmbed } = require("discord.js");
const { silver } = require("../ranked-emblems/ranked_emblems");
const ranked_emblem = require("../ranked-emblems/ranked_emblems");

const capitalizeFirstLetter = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

const generateSearchMessege = (
  summoner_name,
  summoner_level,
  icon_number,
  rank,
  masteryChamps,
  bestChamps
) => {
  const soloQ = rank.find((data) => data.queueType === "RANKED_SOLO_5x5");
  const flexQ = rank.find((data) => data.queueType === "RANKED_FLEX_SR");

  const generateQueueForm = () => ({
    soloQueue: [
      {
        name: `Division:`,
        value: `${capitalizeFirstLetter(soloQ.tier)} ${soloQ.rank}`,
        inline: true,
      },
      { name: `Puntos: `, value: `${soloQ.leaguePoints}`, inline: true },
      {
        name: `Winrate:`,
        value: `${Math.round(
          (soloQ.wins * 100) / (soloQ.wins + soloQ.losses)
        )}%`,
        inline: true,
      },
      { name: `Vicotorias:`, value: `${soloQ.wins}`, inline: true },
      {
        name: `Partidas:`,
        value: `${soloQ.wins + soloQ.losses}`,
      },
    ],
    flexQueue: [
      {
        name: `Division:`,
        value: `${capitalizeFirstLetter(flexQ.tier)} ${flexQ.rank}`,
        inline: true,
      },
      { name: `Puntos: `, value: `${flexQ.leaguePoints}`, inline: true },
      {
        name: `Winrate:`,
        value: `${Math.round(
          (flexQ.wins * 100) / (flexQ.wins + flexQ.losses)
        )}%`,
        inline: true,
      },
      { name: `Vicotorias:`, value: `${flexQ.wins}`, inline: true },
      {
        name: `Partidas:`,
        value: `${flexQ.wins + flexQ.losses}`,
      },
    ],
    unranked: [{ name: "Unranked", value: "Invocador no rankeado" }],
  });

  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`${summoner_name}`)
    .setURL(
      `https://las.op.gg/summoner/userName=${summoner_name
        .replace(/\s/, "+")
        .replace(/\s/g, "")}`
    )
    .setThumbnail(
      `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${icon_number}.png`
    )
    .addFields({ name: `Level: `, value: `${summoner_level}` })
    .addFields(
      { name: "Ranked:", value: "SoloQueue" },
      generateQueueForm()[soloQ ? "soloQueue" : "unranked"].map(
        (field) => field
      )
    )
    .addFields(
      { name: "Ranked:", value: "Flex Queue" },
      generateQueueForm()[flexQ ? "flexQueue" : "unranked"].map(
        (field) => field
      )
    )
    .addFields(
      {
        name: `${masteryChamps[0].name}`,
        value: `${bestChamps[0].championPoints}`,
        inline: true,
      },
      {
        name: `${masteryChamps[1].name}`,
        value: `${bestChamps[1].championPoints}`,
        inline: true,
      },
      {
        name: `${masteryChamps[2].name}`,
        value: `${bestChamps[2].championPoints}`,
        inline: true,
      }
    )
    .setImage(
      `${
        ranked_emblem[
          soloQ !== undefined
            ? soloQ.tier.toLowerCase()
            : flexQ !== undefined
            ? flexQ.tier.toLowerCase()
            : "unranked"
        ]
      }`
    );
};

module.exports = generateSearchMessege;
