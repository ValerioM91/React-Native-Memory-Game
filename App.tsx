import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Alert, Button, View, Platform } from "react-native";
import { colors } from "./constants/colors";
import Game from "./screens/Game";
import Home from "./screens/Home";
import Victory from "./screens/Victory";
import { RecordContextProvider } from "./store/context";
import Records from "./screens/Records";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

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
        headerStyle: {
          backgroundColor: colors.blue,
          shadowOffset: { width: 0, height: 0 },
        },
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
  const [fontsLoaded] = useFonts({
    Digital: require("./assets/digital.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <RecordContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                contentStyle: { backgroundColor: colors.darkBlue },
                headerStyle: { backgroundColor: colors.blue },
                headerTitleAlign: "center",
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
                  headerLeft: () => (
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
                  headerRight: () => (
                    <Button
                      title="Restart"
                      color={
                        Platform.OS === "android" ? colors.sea : colors.white
                      }
                      onPress={() => navigation.replace("Game")}
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
      </View>
    </>
  );
}
