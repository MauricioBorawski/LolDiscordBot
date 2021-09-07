import axios from "axios";
import { ChampionData } from "../types/responseTypes";
//Function to get all the champions.

export const getChampionsData = async () => {
  const finalChampionList: ChampionData[] = [];

  const {
    data: { data: rawChampionList },
  }: { data: { data: ChampionData[] } } = await axios.get(
    "http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/champion.json"
  );

  Object.entries(rawChampionList).forEach((champion) =>
    finalChampionList.push({ name: champion[1].name, key: champion[1].key })
  );

  return finalChampionList;
};
