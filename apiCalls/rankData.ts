require("dotenv").config();
import axios from "axios";
import { RankData } from "../types/responseTypes";

export async function getRankInfo(summonerId: string): Promise<RankData> {
  return await axios.get(
    `https://la2.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${process.env.RIOT_API_KEY}`
  );
}
