import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";

interface Props {
  title: string;
  moves: number | null | undefined;
  time: number | null | undefined;
  isTimeNewRecord?: boolean;
  isMovesNewRecord?: boolean;
}

export default function Results({
  title,
  moves,
  time,
  isTimeNewRecord,
  isMovesNewRecord,
}: Props) {
  const { text, title: titleStyle, results, newRecord } = styles;

  return (
    <View style={styles.resultsContainer}>
      <Text style={[text, titleStyle]}>{title}</Text>
      <View style={styles.row}>
        <Text style={[text, results, isTimeNewRecord ? newRecord : {}]}>
          {moves ? `Moves: ${moves}` : "No record found"}
        </Text>
        <Text style={[text, results, isMovesNewRecord ? newRecord : {}]}>
          {time ? `Time: ${time.toFixed(1)}s` : "No record found"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultsContainer: {
    marginBottom: 32,
  },
  title: {
    color: colors.cardsColors.sea,
    fontSize: 20,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
  },
  text: {
    textAlign: "center",
    fontWeight: "700",
    flexDirection: "row",
    margin: 4,
    padding: 16,
    color: colors.darkBlue,
    backgroundColor: "white",
    borderRadius: 6,
    overflow: "hidden",
  },
  results: {
    flex: 1,
  },
  newRecord: {
    color: colors.cardsColors.green,
  },
});
