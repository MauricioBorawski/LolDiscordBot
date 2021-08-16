const generateSearchMessege = (
  summoner_name,
  summoner_level,
  rank,
  masteryChamps,
  bestChamps,
) => `\`\`\`
Nombre de invocador: ${summoner_name} 
Level: ${summoner_level}

Division: ${rank[0].tier} ${rank[0].rank} Puntos: ${rank[0].leaguePoints}

Winrate: ${Math.round(
  (rank[0].wins * 100) / (rank[0].wins + rank[0].losses)
)}% Partidas: ${rank[0].wins + rank[0].losses} Victorias: ${rank[0].wins}

Mejores champs por maestria:
1) ${masteryChamps[0].name}
Puntos de maestria: ${bestChamps[0].championPoints}

2) ${masteryChamps[1].name}
Puntos de maestria: ${bestChamps[1].championPoints}

3) ${masteryChamps[2].name}
Puntos de maestria: ${bestChamps[2].championPoints}
\`\`\`
Para informacion mas detallada usa los siguientes enlaces:
op.gg:
https://las.op.gg/summoner/userName=${summoner_name}
League of Graphs:
https://www.leagueofgraphs.com/es/summoner/las/${summoner_name.toLowerCase()}
`;

module.exports = generateSearchMessege;
