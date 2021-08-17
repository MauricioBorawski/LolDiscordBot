const { MessageEmbed } = require("discord.js");
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
  return new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`${summoner_name}`)
    .setURL(`https://las.op.gg/summoner/userName=${summoner_name}`)
    .setThumbnail(
      `http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${icon_number}.png`
    )
    .addFields(
      { name: `Level: `, value: `${summoner_level}` },
      { name: "\u200B", value: "\u200B" },
      {
        name: `Division:`,
        value: `${capitalizeFirstLetter(rank[1].tier)} ${rank[1].rank}`,
        inline: true,
      },
      { name: `Puntos: `, value: `${rank[1].leaguePoints}`, inline: true },
      {
        name: `Winrate:`,
        value: `${Math.round(
          (rank[1].wins * 100) / (rank[1].wins + rank[1].losses)
        )}%`,
        inline: true,
      },
      { name: `Vicotorias:`, value: `${rank[1].wins}`, inline: true },
      {
        name: `Partidas:`,
        value: `${rank[1].wins + rank[1].losses}`,
      }
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
    .setImage(`${ranked_emblem[rank[1].tier.toLowerCase()]}`);
};

module.exports = generateSearchMessege;
