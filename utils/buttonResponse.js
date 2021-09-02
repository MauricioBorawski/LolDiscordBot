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
            value: champ.summonerName
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
            value: champ.summonerName
          })),
      );

    interaction.reply({
      embeds: [blueTeamResponse, redTeanResponse],
      ephemeral: true,
    });
  },
};
