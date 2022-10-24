import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Alert, Button } from "react-native";
import { colors } from "./constants/colors";
import Game from "./screens/Game";
import Home from "./screens/Home";
import Victory from "./screens/Victory";

export type RootStackNavigator = {
  Home: undefined;
  Game: undefined;
  Victory: undefined;
};

const Stack = createNativeStackNavigator<RootStackNavigator>();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: colors.darkBlue },
            headerStyle: { backgroundColor: colors.blue },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Game"
            component={Game}
            options={({
              navigation,
            }: NativeStackScreenProps<RootStackNavigator, "Game">) => ({
              headerRight: () => (
                <Button
                  title="Quit"
                  color={colors.red}
                  onPress={() =>
                    Alert.alert(
                      "Are you sure?",
                      "You will lose your progress",
                      [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "Yes",
                          style: "destructive",
                          onPress: () => navigation.replace("Home"),
                        },
                      ]
                    )
                  }
                />
              ),
            })}
          />
          <Stack.Screen
            name="Victory"
            component={Victory}
            options={{ title: "Victory!" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
