import { useEffect, useRef, memo } from "react";
import {
  StyleSheet,
  Pressable,
  GestureResponderEvent,
  Image,
  Animated,
  Easing,
  View,
} from "react-native";
import { colors } from "../../constants/colors";

interface Props {
  children: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  isFaceUp?: boolean;
  pairFound?: boolean;
  onAnimationComplete?: () => void;
}

function Card({
  children,
  onPress,
  isFaceUp,
  pairFound,
  onAnimationComplete,
}: Props) {
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  console.log("card rendering");

  const RotateUpData = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const RotateDownData = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["-180deg", "0deg"],
  });

  useEffect(() => {
    if (isFaceUp) {
      Animated.timing(rotateAnimation, {
        toValue: isFaceUp ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.bezier(0.17, 0.67, 0.17, 0.92),
      }).start(() => {
        // onAnimationComplete && onAnimationComplete();
      });
    }
  }, [isFaceUp, rotateAnimation, onAnimationComplete]);

  if (pairFound) {
    return <View style={styles.card}></View>;
  }

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Animated.View
        style={[
          styles.side,
          styles.back,
          {
            transform: [{ rotateY: RotateUpData }],
          },
        ]}
      >
        <Image
          source={require("../../assets/card.jpg")}
          style={styles.background}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.side,
          styles.front,
          {
            transform: [{ rotateY: RotateDownData }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

export default memo(Card);

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    minHeight: 96,
    flex: 1,
    margin: 8,
    position: "relative",
    overflow: "hidden",
  },
  side: {
    position: "absolute",
    flex: 1,
    backfaceVisibility: "hidden",
  },
  front: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.teal,
    backgroundColor: "#222",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    height: "100%",
    left: 0,
    right: 0,
    bottom: 0,
  },
  back: {
    flex: 1,
    margin: 0,
    resizeMode: "contain",
    padding: 0,
    position: "absolute",
    top: 0,
    height: "100%",
    left: 0,
    right: 0,
    bottom: 0,
  },
  background: {
    width: "100%",
    height: "100%",
  },
});
