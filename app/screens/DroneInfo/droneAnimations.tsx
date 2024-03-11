import { Animated } from 'react-native';

export const floating = (posY, isConnected) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(posY, {
        toValue: -20,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.timing(posY, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]),
  ).start();

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  isConnected === false && Animated.timing(posY, { toValue: -20, duration: 1500, useNativeDriver: false }).stop();
};

export const sizeChange = width => {
  Animated.timing(width, {
    toValue: 300,
    duration: 3000,
    useNativeDriver: false,
  }).start();
};

export const floatIn = startingPosY => {
  Animated.timing(startingPosY, {
    toValue: 0,
    duration: 2000,
    useNativeDriver: false,
  }).start();
};
