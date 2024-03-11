import React, { FC, useEffect, useState } from 'react';
import { Animated, Easing, Modal, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight } from '@rneui/base';

import MiniLoader from '../assets/images/icons/miniLoader.svg';
import SuccessImg from '../assets/images/icons/SuccessImg.svg';
import { Colors } from '../constants/colors';

// Todo add custom image property in the future

interface IProps {
  visible: boolean;
  title: string;
  description: string;
  titleColor?: string;
}

const CustomLoader: FC<IProps> = ({ visible, title, titleColor, description }) => {
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
  const [showModal, setShowModal] = React.useState(visible);
  return (
    <Modal transparent visible={visible}>
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer]}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <SuccessImg />
            <Text
              style={{
                color: titleColor ? titleColor : 'black',
                fontFamily: 'Urbanist-Bold',
                fontSize: RFValue(24, ScreenHeight),
                paddingVertical: 15,
                textAlign: 'center',
              }}>
              {title}
            </Text>
            <Text style={styles.descriptionText}>{description}</Text>

            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <MiniLoader />
            </Animated.View>

            {/* <AppLoader /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: ScreenHeight * 0.55,
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 20,
    justifyContent: 'space-around',
  },
  descriptionText: {
    fontFamily: 'Urbanist-Regular',
    fontSize: RFValue(16, ScreenHeight),
    color: Colors.grey_900,
    textAlign: 'center',
    paddingVertical: 15,
  },
});
