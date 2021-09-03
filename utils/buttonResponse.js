const { MessageEmbed } = require("discord.js");
let matchData = null;

module.exports = {
  //Saves the data from getSummonerInfo
  //This is in order to avoid doing multiple calls 😵
  setSpectatorData: (data) => {
    matchData = data;
  },
  executeButtonInteraction: (interaction) => {
    if (!matchData) return;
    const { gameType, participants, champions } = matchData;

    if (gameType !== "MATCHED_GAME")
      interaction.reply({
        content: "Lo siento, no puedo encontrar el tipo de juego.",
        ephemeral: true,
      });

    const pickedChamps = participants.map((summoner) => ({
      ...champions.find(
        (champion) => summoner.championId.toString() === champion.key
      ),
      team: summoner.teamId,
      summonerName: summoner.summonerName,
    }));

    const blueTeamResponse = new MessageEmbed()
      .setColor("BLUE")
      .setTitle("Blue side")
      .addFields(
        pickedChamps
          .filter((pick) => pick.team === 100)
          .map((champ) => ({
            name: champ.name,
            value: `[${
              champ.summonerName.length > 12
                ? champ.summonerName.replace(/.{8}$/, "...")
                : champ.summonerName
            }](https://las.op.gg/summoner/userName=${champ.summonerName
              .replace(/\s/, "+")
              .replace(/\s/g, "")})`,
            inline: true,
          }))
      );

    const redTeanResponse = new MessageEmbed()
      .setColor("RED")
      .setTitle("Red side")
      .addFields(
        pickedChamps
          .filter((pick) => pick.team === 200)
          .map((champ) => ({
            name: champ.name,
            value: `[${
              champ.summonerName.length > 12
                ? champ.summonerName.replace(/.{8}$/, "...")
                : champ.summonerName
            }](https://las.op.gg/summoner/userName=${champ.summonerName
              .replace(/\s/, "+")
              .replace(/\s/g, "")})`,
            inline: true,
          }))
      );

    interaction.reply({
      embeds: [blueTeamResponse, redTeanResponse],
      ephemeral: true,
    });
  },
};
