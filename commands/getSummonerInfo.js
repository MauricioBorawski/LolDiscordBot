require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const getChampionData = require("../champions/champions");

let championList;
getChampionData().then((data) => (championList = data));

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

    interaction.reply("Buscando...");

    const {
      data: { id, summonerLevel },
    } = await axios.get(
      `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_name}?api_key=${api_key}`
    );

    const { data: league } = await axios.get(
      `https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${api_key}`
    );

    const { data: champs_mastery } = await axios.get(
      `https://la2.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${api_key}`
    );

    const treeFirstChampions = champs_mastery.slice(0, 3);

    const bestMasteryChampions = treeFirstChampions.map((champ) =>
      championList.find((champ2) => champ.championId.toString() === champ2.key)
    );

    interaction.followUp(`\`\`\`
    Nombre de invocador: ${summoner_name} 
    Level: ${summonerLevel}

    Division: ${league[0].tier} ${league[0].rank} Puntos: ${league[0].leaguePoints}

    Winrate: ${Math.round((league[0].wins * 100) / (league[0].wins + league[0].losses))}% Partidas: ${league[0].wins + league[0].losses} Victorias: ${league[0].wins}

    Mejores champs por maestria:
    1) ${bestMasteryChampions[0].name}
    Puntos de maestria: ${treeFirstChampions[0].championPoints}

    2) ${bestMasteryChampions[1].name}
    Puntos de maestria: ${treeFirstChampions[1].championPoints}

    3) ${bestMasteryChampions[2].name}
    Puntos de maestria: ${treeFirstChampions[2].championPoints}
    \`\`\``);
  },
};
