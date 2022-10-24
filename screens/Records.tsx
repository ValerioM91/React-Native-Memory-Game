import { StyleSheet, View } from "react-native";
import { colors } from "../constants/colors";
import useRecordContext from "../store/context";
import Results from "../components/UI/Results";

export default function Records() {
  const { movesRecord, timeRecord } = useRecordContext().records || {};

  return (
    <View style={styles.screen}>
      <Results title="Your Records" moves={movesRecord} time={timeRecord} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
});
