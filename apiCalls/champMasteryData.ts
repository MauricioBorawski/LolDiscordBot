require("dotenv").config();
import axios from "axios";
import { ChampionMastery } from "../types/responseTypes";

export async function getChampMasteryData(
  SummonerId: string
): Promise<ChampionMastery> {
  return await axios.get(
    `https://la2.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${SummonerId}?api_key=${process.env.RIOT_API_KEY}`
  );
}
