import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Alert, Button } from "react-native";
import { colors } from "./constants/colors";
import Game from "./screens/Game";
import Home from "./screens/Home";
import Victory from "./screens/Victory";
import { RecordContextProvider } from "./store";
import Records from "./screens/Records";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type RootStackNavigator = {
  BottomTabScreens: undefined;
  Game: undefined;
  Victory: {
    moves: number;
    time: number;
  };
};

export type BottomTabNavigator = {
  Home: undefined;
  Records: undefined;
};

const Stack = createNativeStackNavigator<RootStackNavigator>();

const BottomTab = createBottomTabNavigator<BottomTabNavigator>();

const BottomTabScreens = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        title: "Memory",
        headerStyle: { backgroundColor: colors.blue },
        tabBarStyle: {
          backgroundColor: colors.blue,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.teal,
        headerTintColor: "white",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Play",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="gamepad-variant"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Records"
        component={Records}
        options={{
          tabBarLabel: "Records",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="trophy-award"
              size={30}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <RecordContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              contentStyle: { backgroundColor: colors.darkBlue },
              headerStyle: { backgroundColor: colors.blue },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="BottomTabScreens"
              component={BottomTabScreens}
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.darkBlue },
              }}
            />
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
                            onPress: () =>
                              navigation.replace("BottomTabScreens"),
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
      </RecordContextProvider>
    </>
  );
}
