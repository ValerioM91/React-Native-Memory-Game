import { Alert, StyleSheet, View } from "react-native";
import { colors } from "../constants/colors";
import useRecordContext from "../store/context";
import Results from "../components/UI/Results";
import Button from "../components/UI/Button";

export default function Records() {
  const { deleteRecords, records } = useRecordContext();

  const { movesRecord, timeRecord } = records || {};

  const deleteRecordsHandler = async () => {
    await deleteRecords();
    Alert.alert("Your records have been deleted");
  };

  return (
    <View style={styles.screen}>
      <Results title="Your Records" moves={movesRecord} time={timeRecord} />
      <Button
        onPress={() =>
          Alert.alert("Are you sure?", "This action is nonreversible", [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: deleteRecordsHandler,
            },
          ])
        }
      >
        Delete Records
      </Button>
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
