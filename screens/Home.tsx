import { StyleSheet, View } from "react-native";
import Button from "../components/UI/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackNavigator } from "../App";

type Props = NativeStackScreenProps<RootStackNavigator>;

export default function Home({ navigation }: Props) {
  const startGameHandler = () => {
    navigation.replace("Game");
  };

  return (
    <View style={styles.screen}>
      <Button onPress={startGameHandler}>Play</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
