import * as Svgs from "../components/SVGS";
import { TCard } from "../types";
import { colors as colorObject } from "../constants/colors";
import { shuffleArray } from "./shuffleArray";

export const getShuffledCards = () => {
  const svgs = shuffleArray(Object.keys(Svgs)).slice(0, 8);

  const colors = shuffleArray(
    Object.keys(colorObject.cardsColors)
  ) as (keyof typeof colorObject.cardsColors)[];

  const cards = svgs.flatMap((svg, index) => {
    return [
      { svg, pairNumber: 1, color: colors[index], pairFound: false },
      { svg, pairNumber: 2, color: colors[index], pairFound: false },
    ];
  }) as TCard[];

  const shuffledCards = shuffleArray(cards) as TCard[];

  const cardsInRowsOfFour = [] as Array<Array<TCard>>;

  for (let index = 0; index < shuffledCards.length / 4; index++) {
    cardsInRowsOfFour.push(shuffledCards.slice(4 * index, 4 + 4 * index));
  }

  return cardsInRowsOfFour;
};
