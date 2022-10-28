import { StyleSheet, View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackNavigator } from "../App";
import { useCallback, useEffect, useMemo, useState } from "react";
import { colors } from "../constants/colors";
import { getShuffledCards } from "../utils/getShuffledCards";
import { TCard } from "../types";
import useRecordContext from "../store/context";
import Card from "../components/UI/Card";
import Timer from "../components/UI/Timer";

type Props = NativeStackScreenProps<RootStackNavigator, "Game">;

export default function Game({ navigation }: Props) {
  const initialCardRows = useMemo(() => getShuffledCards(), []);

  const { updateRecords } = useRecordContext();
  const [movesQuantity, setMovesQuantity] = useState(0);
  const [time, setTime] = useState(0);

  const [shuffledCards, setShuffledCards] = useState(initialCardRows.flat());
  const [selectedCards, setSelectedCards] = useState<TCard[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((previous) => previous + 6);
    }, 60);

    return () => clearInterval(timer);
  }, []);

  const selectCardHandler = useCallback(
    (card: TCard) => {
      if (selectedCards.length === 2) return;
      setSelectedCards((current) => {
        if (current[0]?.svg === card.svg && current[0]?.pairNumber === card.pairNumber) {
          return [...current];
        }
        return [...current, card];
      });
    },
    [selectedCards]
  );

  const checkPairHandler = useCallback(() => {
    if (selectedCards.length !== 2) return;

    setMovesQuantity((current) => current + 1);
    const equalSelectedCards = selectedCards[0].svg === selectedCards[1].svg;
    setTimeout(() => {
      if (equalSelectedCards) {
        setShuffledCards((current) => {
          let removedEqualCards = [...current];
          removedEqualCards = removedEqualCards.map((card) =>
            card.svg === selectedCards[0].svg ? { ...card, pairFound: true } : card
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
        time,
      });
    }
  }, [movesQuantity, navigation, shuffledCards, time, updateRecords]);

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
            const isFaceUp = selectedCards.some(
              (card) => card.svg === item.svg && card.pairNumber === item.pairNumber
            );
            const pairFound = shuffledCards[rowIndex * 4 + itemIndex].pairFound;

            return (
              <Card
                key={`${item.svg}-${item.pairNumber}`}
                item={item}
                onPress={selectCardHandler}
                isFaceUp={isFaceUp}
                pairFound={pairFound}
              />
            );
          })}
        </View>
      ))}
      <Text style={styles.movesText}>Total Moves: {movesQuantity}</Text>
    </View>
  );
}

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
