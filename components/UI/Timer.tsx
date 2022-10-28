import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { getFormattedTime } from "../../utils/getFormattedTime";

interface Props {
  time: number;
}

export default function Timer({ time }: Props) {
  const { minutes, seconds, cents } = getFormattedTime(time);

  return (
    <View style={styles.container}>
      <Number digit={minutes} />

      <Text style={[styles.text, styles.digit]}>:</Text>

      <Number digit={seconds} />

      <Text style={[styles.text, styles.digit]}>:</Text>

      <Number digit={cents} />
    </View>
  );
}

const Number = ({ digit }: { digit: number }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.background, styles.text]}>88</Text>
      <Text style={[styles.digit, styles.text]}>
        {String(digit).padStart(2, "0")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    width: "100%",
    color: "#202020",
  },
  text: {
    fontSize: 64,
    fontFamily: "Digital",
    margin: 0,
  },
  digit: {
    color: colors.teal,
  },
});
