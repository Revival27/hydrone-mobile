import React, { FC, useEffect, useState } from 'react';
import { Animated, Easing, Modal, StyleSheet, View } from 'react-native';

import MiniLoader from '../assets/images/icons/miniLoader.svg';

interface IProps {
  visible: boolean;
  title: string;
  description: string;
  titleColor?: string;
}

const LoadingSpinner: FC<IProps> = ({ visible }) => {
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [visible]);

  return (
    <Modal transparent visible={visible}>
      <View style={styles.modalBackground}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <MiniLoader width="160px" height="160px" />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
