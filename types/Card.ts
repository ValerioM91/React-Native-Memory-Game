import * as Svgs from "../components/SVGS";
import { colors } from "../constants/colors";

export type TCard = {
  svg: keyof typeof Svgs;
  pairNumber: 1 | 2;
  color: keyof typeof colors.cardsColors;
  pairFound: boolean;
};
