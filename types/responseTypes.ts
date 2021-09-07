export interface SummonerData {
    accountId: string;
    profileIconId: number;
    summonerLevel: number;
}

export interface RankData {
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    hotStreak: boolean;
}

export interface ChampionData {
    name: string;
    key: string;
}
export interface ChampionMastery {
    championId: number;
    championPoints: number;
}

export interface ChampionMasteryList {
    data: ChampionMastery[];
}

export interface BannedChampions {
    pickTurn: number;
    championId: number;
    teamId: 100 | 200;
}

export interface Participants {
    championId: number;
    teamId: 100 | 200;
    summonerName: string;
}

export interface Spectator {
    gameType: string;
    bannedChampions: BannedChampions[];
    participants: Participants[];
}