import { StyleSheet, View } from "react-native";
import React from "react";
import Button from "../components/UI/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackNavigator } from "../App";
import { colors } from "../constants/colors";

type Props = NativeStackScreenProps<RootStackNavigator>;

export default function Victory({ navigation }: Props) {
  const playAgainHandler = () => {
    navigation.replace("Game");
  };

  return (
    <View style={styles.screen}>
      <Button onPress={playAgainHandler}>Play Again</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    justifyContent: "center",
    alignItems: "center",
  },
});
