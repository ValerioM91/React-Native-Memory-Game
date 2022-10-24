import { StyleSheet, View, GestureResponderEvent, Text } from "react-native";
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

type Props = NativeStackScreenProps<RootStackNavigator, "Game">;

export default function Game({ navigation }: Props) {
  const initialCardRows = useRef(getShuffledCards()).current;
  const { updateRecords } = useRecordContext();

  const [shuffledCards, setShuffledCards] = useState(initialCardRows.flat());

  const [movesQuantity, setMovesQuantity] = useState(0);
  const [time, setTime] = useState(0);

  const [selectedCards, setSelectedCards] = useState<TCard[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((previous) => previous + 6);
    }, 60);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedCards.length === 2) {
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
    }
  }, [selectedCards]);

  useEffect(() => {
    if (shuffledCards.every((card) => card.pairFound)) {
      updateRecords(movesQuantity, time);
      navigation.replace("Victory", {
        moves: movesQuantity,
        time,
      });
    }
  }, [shuffledCards, navigation, movesQuantity, time, updateRecords]);

  const selectCardHandler = useCallback(
    (card: TCard) => {
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

  return (
    <View style={styles.screen}>
      <Timer time={time} />
      {initialCardRows.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((item, itemIndex) => (
            <Item
              pairFound={shuffledCards[rowIndex * 4 + itemIndex].pairFound}
              key={`${item.svg}-${item.pairNumber}`}
              card={item}
              onPress={() => selectCardHandler(item)}
              isFaceUp={selectedCards.some(
                (card) =>
                  card.svg === item.svg && card.pairNumber === item.pairNumber
              )}
            />
          ))}
        </View>
      ))}
      <Text style={styles.movesText}>Total Moves: {movesQuantity}</Text>
    </View>
  );
}

const Item = ({
  card,
  onPress,
  isFaceUp,
  pairFound,
}: {
  card: TCard;
  onPress: (event: GestureResponderEvent) => void;
  isFaceUp: boolean;
  pairFound: boolean;
}) => {
  const Svg = Svgs[card.svg];

  return (
    <Card onPress={onPress} isFaceUp={isFaceUp} pairFound={pairFound}>
      <Svg svgProps={{ width: "100%" }} color={card.color} />
    </Card>
  );
};

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
