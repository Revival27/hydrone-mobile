import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenWidth } from '@rneui/base';

import { Colors } from '../constants/colors';

interface IProps {
  activeIndex: number;
  total: number;
}

const DOT_PER_PAGE = 5;

const ImageSliderFooter: FC<IProps> = ({ activeIndex, total }) => {
  return <View style={styles.container}>{makeSteppers(activeIndex, total)}</View>;
};

//Todo maybe we don't actually want dots cuz its impossible to see how many items we have

const makeSteppers = (activeIndex: number, total: number) => {
  const dots: JSX.Element[] = [];

  for (let i = 0; i < total; i++) {
    dots.push(
      <View
        key={i}
        style={{
          width: 10,
          height: 10,
          borderRadius: 100,
          backgroundColor: activeIndex === i ? Colors.grey_300 : Colors.grey_500,
          marginHorizontal: 4,
        }}
      />,
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: '5%',
        width: ScreenWidth - 40,
        justifyContent: 'center',
      }}>
      {dots}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    height: 52,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  text: {
    color: 'white',
  },
});

export default ImageSliderFooter;
