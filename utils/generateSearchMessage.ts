import { MessageEmbed, EmbedFieldData } from "discord.js";
import { ChampionMasteryList, RankData } from "../types/responseTypes";

const capitalizeFirstLetter = (string: string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

export const generateSearchMessage = (
  summoner_name: string,
  summoner_level: number,
  icon_number: number,
  soloQ: RankData,
  flexQ: RankData,
  masteryChamps: ChampionMasteryList,
  bestChamps: any[]
) => {
  const generateQueueForm = (queue: RankData, rankedType: string): EmbedFieldData[] =>
    queue !== undefined
      ? [
          {name: "Ranked:", value: rankedType},
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
        ]
      : [{ name: "Unranked", value: "Invocador no rankeado" }];

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
      generateQueueForm(soloQ, "Solo Queue").map((field) => field)
    )
    .addFields(
      generateQueueForm(flexQ, "Flex Queue").map((field) => field)
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
    );
};
