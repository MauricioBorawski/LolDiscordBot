require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");

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
    const summoner_name = interaction.options.getString("input");

    interaction.reply("Buscando...");

    const { data } = await axios.get(
      `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_name}?api_key=${process.env.RIOT_API_KEY}`
    );

    await interaction.followUp(`+--------+
    | Result |
    +--------+
    |${data.accountId} |
    +--------+`);
  },
};
