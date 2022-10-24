import { StyleSheet, Text, Pressable } from "react-native";
import type { StyleProp, TextStyle, GestureResponderEvent } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";

interface Props {
  children: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  textStyle?: StyleProp<TextStyle>;
}

export default function Button({ children, textStyle, onPress }: Props) {
  const { text, pressable, button } = styles;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [button, pressed && pressable]}
    >
      <Text style={textStyle ? [text, textStyle] : text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    backgroundColor: colors.red,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 100,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
  },
  pressable: {
    opacity: 0.7,
  },
  text: {
    color: "white",
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
