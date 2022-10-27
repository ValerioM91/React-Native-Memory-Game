import { StyleSheet, View, Text } from "react-native";
import * as Svgs from "../components/SVGS";
import Card from "../components/UI/Card";
import { useCallback, useEffect, useRef, useState } from "react";
import { getShuffledCards } from "../utils/getShuffledCards";
import { TCard } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackNavigator } from "../App";
import useRecordContext from "../store/context";
import { colors } from "../constants/colors";
import Timer from "../components/UI/Timer";
import Elementino from "../components/UI/Elementino";

type Props = NativeStackScreenProps<RootStackNavigator, "Game">;

// let timer = 0;
let initialCardRows = getShuffledCards();

export default function Game({ navigation }: Props) {
  // const initialCardRows = useRef(getShuffledCards());
  const { updateRecords } = useRecordContext();

  const [shuffledCards, setShuffledCards] = useState(initialCardRows.flat());

  const [movesQuantity, setMovesQuantity] = useState(0);
  const [time, setTime] = useState(0);

  const [selectedCards, setSelectedCards] = useState<TCard[]>([]);

  useEffect(() => {
    initialCardRows = getShuffledCards();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((previous) => previous + 6);
    }, 60);

    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   timer = 0;

  //   const timerInterval = setInterval(() => {
  //     timer = timer + 6;
  //   }, 60);

  //   return () => clearInterval(timerInterval);
  // }, []);

  const selectCardHandler = useCallback(
    (card: TCard) => {
      console.log("selected");
      if (selectedCards.length === 2) return;
      setSelectedCards((current) => {
        if (
          current[0]?.svg === card.svg &&
          current[0]?.pairNumber === card.pairNumber
        ) {
          return [...current];
        }
        return [...current, card];
      });
    },
    [selectedCards]
  );

  // const onAnimationComplete = useCallback(() => {
  //   console.log("running");
  //   if (selectedCards.length !== 2) return;

  //   setMovesQuantity((current) => current + 1);

  //   const equalSelectedCards = selectedCards[0].svg === selectedCards[1].svg;
  //   if (equalSelectedCards) {
  //     setShuffledCards((current) => {
  //       let removedEqualCards = [...current];
  //       removedEqualCards = removedEqualCards.map((card) =>
  //         card.svg === selectedCards[0].svg
  //           ? { ...card, pairFound: true }
  //           : card
  //       );
  //       return removedEqualCards;
  //     });
  //   }
  //   setSelectedCards([]);
  // }, [selectedCards]);

  const checkPairHandler = useCallback(() => {
    if (selectedCards.length !== 2) return;
    setMovesQuantity((current) => current + 1);
    const equalSelectedCards = selectedCards[0].svg === selectedCards[1].svg;
    setTimeout(() => {
      if (equalSelectedCards) {
        setShuffledCards((current) => {
          let removedEqualCards = [...current];
          removedEqualCards = removedEqualCards.map((card) =>
            card.svg === selectedCards[0].svg
              ? { ...card, pairFound: true }
              : card
          );
          return removedEqualCards;
        });
      }
      setSelectedCards([]);
    }, 500);
  }, [selectedCards]);

  const isGameEndedHandler = useCallback(() => {
    if (shuffledCards.every((card) => card.pairFound)) {
      updateRecords(movesQuantity, time);
      navigation.replace("Victory", {
        moves: movesQuantity,
        time: time,
      });
    }
  }, [movesQuantity, navigation, time, shuffledCards, updateRecords]);

  useEffect(() => {
    checkPairHandler();
  }, [checkPairHandler]);

  useEffect(() => {
    isGameEndedHandler();
  }, [isGameEndedHandler]);

  return (
    <View style={styles.screen}>
      <Timer time={time} />
      {initialCardRows.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((item, itemIndex) => {
            return (
              // <Elementino
              //   key={`${item.svg}-${item.pairNumber}`}
              //   itemIndex={itemIndex + rowIndex * 4}
              //   isFaceUp={selectedCards.some(
              //     (card) =>
              //       card.svg === item.svg && card.pairNumber === item.pairNumber
              //   )}
              //   pairFound={shuffledCards[rowIndex * 4 + itemIndex].pairFound}
              //   item={item}
              //   onPress={selectCardHandler}
              // />
              <Card
                svg={item.svg}
                color={item.color}
                key={`${item.svg}-${item.pairNumber}`}
                onPress={selectCardHandler}
                isFaceUp={selectedCards.some(
                  (card) =>
                    card.svg === item.svg && card.pairNumber === item.pairNumber
                )}
                pairFound={shuffledCards[rowIndex * 4 + itemIndex].pairFound}
                item={item}
                // onAnimationComplete={onAnimationComplete}
              ></Card>
            );
          })}
        </View>
      ))}
      <Text style={styles.movesText}>Total Moves: {movesQuantity}</Text>
    </View>
  );
}

// const Item = ({
//   card,
//   onPress,
//   isFaceUp,
//   pairFound,
//   onAnimationComplete,
// }: {
//   card: TCard;
//   onPress: (event: GestureResponderEvent) => void;
//   isFaceUp: boolean;
//   pairFound: boolean;
//   onAnimationComplete: () => void;
// }) => {
//   const Svg = Svgs[card.svg];

//   return (
//     <Card
//       onPress={onPress}
//       isFaceUp={isFaceUp}
//       pairFound={pairFound}
//       onAnimationComplete={onAnimationComplete}
//     >
//       <Svg svgProps={{ width: "100%" }} color={card.color} />
//     </Card>
//   );
// };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  grid: {
    flex: 0,
  },
  movesText: {
    marginVertical: 32,
    color: "white",
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  timeContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  time: {
    textAlign: "center",
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "white",
    minWidth: 110,
    paddingHorizontal: 24,
    paddingVertical: 16,
    fontWeight: "700",
    fontSize: 24,
    color: colors.cardsColors.sea,
  },
});
