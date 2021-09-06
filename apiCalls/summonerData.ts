require("dotenv").config();
import axios from "axios";
import { SummonerData } from "../types/responseTypes";
import { parseSummonerName } from "../utils/parseSummonerName";

export async function getSummonerData(summoner_name: string): Promise<SummonerData> {
  const parsedSummonerName = parseSummonerName(summoner_name);
  return await axios.get(
    `https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${parsedSummonerName}?api_key=${process.env.RIOT_API_KEY}`
  );
}
