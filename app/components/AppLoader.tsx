import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

const AppLoader = () => {
  const animation = useRef<LottieView>(null);
  const runAnimation = () => {
    if (animation.current != null || animation.current != undefined) {
      animation.current.play(0, 126);
    }
  };
  useEffect(() => {
    runAnimation();
  }, [runAnimation]);

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <LottieView
        style={styles.animationStyle}
        source={require('../assets/Loading.json')}
        resizeMode="cover"
        autoPlay={false}
        loop={true}
        ref={animation}
        onAnimationFinish={() => {
          runAnimation;
        }}
      />
    </View>
  );
};

export default AppLoader;

//Todo ask around why u cant center this after you change width and height
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationStyle: {
    marginTop: '70%',
    width: 5,
    height: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
