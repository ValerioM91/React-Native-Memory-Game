import { StyleSheet, View } from "react-native";
import Button from "../components/UI/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackNavigator } from "../App";
import { colors } from "../constants/colors";

type Props = NativeStackScreenProps<RootStackNavigator>;

export default function Home({ navigation }: Props) {
  const startGameHandler = () => {
    navigation.replace("Game");
  };

  return (
    <View style={styles.screen}>
      <Button onPress={startGameHandler}>Start the game</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
