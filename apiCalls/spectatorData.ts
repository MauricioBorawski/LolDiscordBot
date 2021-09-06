require("dotenv").config();
import axios from "axios";
import { Spectator } from "../types/responseTypes";

export async function getSpectatorData(accountId: string): Promise<Spectator> {
  return await axios.get(
    `https://la2.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${accountId}?api_key=${process.env.RIOT_API_KEY}`
  );
}
