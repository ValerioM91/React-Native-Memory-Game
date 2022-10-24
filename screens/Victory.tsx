import { StyleSheet, View } from "react-native";
import React from "react";
import Button from "../components/UI/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackNavigator } from "../App";
import { colors } from "../constants/colors";
import useRecordContext from "../store/context";
import Results from "../components/UI/Results";

type Props = NativeStackScreenProps<RootStackNavigator, "Victory">;

export default function Victory({ navigation, route }: Props) {
  const { moves, time } = route.params;
  const { movesRecord, timeRecord } = useRecordContext().records || {};

  const playAgainHandler = () => {
    navigation.replace("Game");
  };

  const isMovesNewRecord = movesRecord ? moves <= movesRecord : false;
  const isTimeNewRecord = timeRecord ? time <= timeRecord : false;

  return (
    <View style={styles.screen}>
      <Results
        title="Your Results"
        moves={moves}
        time={time}
        isMovesNewRecord={isMovesNewRecord}
        isTimeNewRecord={isTimeNewRecord}
      />
      <Results
        title="Your Records"
        moves={movesRecord}
        time={timeRecord}
        isMovesNewRecord={isMovesNewRecord}
        isTimeNewRecord={isTimeNewRecord}
      />

      <Button onPress={playAgainHandler}>Play Again</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.darkBlue,
    justifyContent: "center",
  },
});
