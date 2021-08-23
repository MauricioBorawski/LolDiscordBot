let matchData = null;

module.exports = {
    //Saves the data from getSummonerInfo
    //This is in order to avoid doing multiple calls 😵
  setSpectatorData: (data) => {
    matchData = data;
  },
  executeButtonInteraction: (interaction) => {
    if (!matchData) return;

    interaction.reply({
      content: "Obteniendo datos...",
      ephemeral: true,
    });
  },
};
