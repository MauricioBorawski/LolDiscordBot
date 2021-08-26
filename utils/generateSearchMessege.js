const { MessageEmbed } = require("discord.js");

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

  const generateQueueForm = (queue) => queue !== undefined ? [
    {
      name: `Division:`,
      value: `${capitalizeFirstLetter(queue.tier)} ${queue.rank}`,
      inline: true,
    },
    { name: `Puntos: `, value: `${queue.leaguePoints}`, inline: true },
    {
      name: `Winrate:`,
      value: `${Math.round(
        (queue.wins * 100) / (queue.wins + queue.losses)
      )}%`,
      inline: true,
    },
    { name: `Victorias:`, value: `${queue.wins}`, inline: true },
    {
      name: `Partidas:`,
      value: `${queue.wins + queue.losses}`,
    },
  ] : [{ name: "Unranked", value: "Invocador no rankeado" }]

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
      generateQueueForm(soloQ).map(
        (field) => field
      )
    )
    .addFields(
      { name: "Ranked:", value: "Flex Queue" },
      generateQueueForm(flexQ).map(
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
};

module.exports = generateSearchMessege;
