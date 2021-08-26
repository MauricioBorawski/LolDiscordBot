let matchData = null;

module.exports = {
  //Saves the data from getSummonerInfo
  //This is in order to avoid doing multiple calls 😵
  setSpectatorData: (data) => {
    matchData = data;
  },
  executeButtonInteraction: (interaction) => {
    if (!matchData) return;
    const { gameType, participants, bannedChampions, champions } = matchData;

    const banList = bannedChampions.map((bannedChampion) => ({
      ...champions.find((champion) => {
        if (bannedChampion.championId === -1) return { name: "No ban" };
        return bannedChampion.championId.toString() === champion.key;
      }),
      team: bannedChampion.teamId,
    }));

    const pickedChamps = participants.map((summoner) => ({
      ...champions.find(
        (champion) => summoner.championId.toString() === champion.key
      ),
      team: summoner.teamId,
      summonerName: summoner.summonerName,
    }));

    interaction.reply({
      content: `
      ${gameType}
      ----- Blue Team -----
      /// Bans
      ${banList
        .filter((ban) => ban.team === 100)
        .map(
          (champion) =>
            `
      ${champion.name}
      `
        )}

      /// Picks
      ${pickedChamps
        .filter((champ) => champ.team === 100)
        .map(
          (champion) =>
            `
      ${champion.summonerName}g:
      ${champion.name}
      `
        )}

      ----- Red Team -----
      /// Bans
      ${banList
        .filter((ban) => ban.team === 200)
        .map(
          (champion) =>
            `${champion.name}
      `
        )}
      
      /// Picks
      ${pickedChamps
        .filter((champ) => champ.team === 200)
        .map(
          (champion) =>
            `
      ${champion.summonerName}
      ${champion.name}
      `
        )}
      `,
      ephemeral: true,
    });
  },
};
