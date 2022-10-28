import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { getFormattedTime } from "../../utils/getFormattedTime";

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
  const {
    text,
    title: titleStyle,
    results,
    newRecord,
    resultsContainer,
    row,
  } = styles;

  if (!time || !moves) {
    return (
      <View style={resultsContainer}>
        <Text style={[text, titleStyle]}>{title}</Text>
        <View style={row}>
          <Text style={[text, results]}>No record found</Text>
          <Text style={[text, results]}>No record found</Text>
        </View>
      </View>
    );
  }

  const { minutes, seconds, cents } = getFormattedTime(time);

  return (
    <View style={resultsContainer}>
      <Text style={[text, titleStyle]}>{title}</Text>
      <View style={row}>
        <Text style={[text, results, isMovesNewRecord ? newRecord : {}]}>
          {`Moves: ${moves}`}
        </Text>
        <Text style={[text, results, isTimeNewRecord ? newRecord : {}]}>
          {`Time: ${minutes}:${seconds}:${cents}`}
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
    color: colors.sea,
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
    color: colors.green,
  },
});
