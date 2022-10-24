import { StyleSheet, View, GestureResponderEvent, Text } from "react-native";
import * as Svgs from "../components/SVGS";
import Card from "../components/UI/Card";
import { useCallback, useEffect, useRef, useState } from "react";
import { getShuffledCards } from "../utils/getShuffledCards";
import { TCard } from "../types/Card";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackNavigator } from "../App";
import useRecordContext from "../store";
import { colors } from "../constants/colors";

type Props = NativeStackScreenProps<RootStackNavigator, "Game">;

export default function Game({ navigation }: Props) {
  const initialCardRows = useRef(getShuffledCards()).current;

  const [shuffledCards, setShuffledCards] = useState(initialCardRows.flat());

  const [selectedCards, setSelectedCards] = useState<TCard[]>([]);

  const [movesQuantity, setMovesQuantity] = useState(0);

  const [time, setTime] = useState(0);

  const { updateTimeRecord, updateMovesRecord } = useRecordContext();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((previous) => previous + 0.1);
    }, 100);

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
      updateMovesRecord(movesQuantity);
      updateTimeRecord(time);
      navigation.replace("Victory", {
        moves: movesQuantity,
        time,
      });
    }
  }, [
    shuffledCards,
    navigation,
    movesQuantity,
    updateMovesRecord,
    time,
    updateTimeRecord,
  ]);

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
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{time.toFixed(1)}</Text>
      </View>
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
      <Text style={styles.movesText}>Total moves: {movesQuantity}</Text>
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
    marginTop: 32,
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
    textAlign: "center",
    fontSize: 16,
  },
  timeContainer: {
    alignItems: "center",
    marginVertical: 32,
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
