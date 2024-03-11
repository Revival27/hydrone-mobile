import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Colors } from '../constants/colors';

export const makeSteppers = (activePage: any, total: number) => {
  const dots: JSX.Element[] = [];
  const newTotal = total / 3;
  for (let i = 0; i < newTotal; i++) {
    dots.push(
      <View
        key={i}
        style={{
          width: activePage === i ? 40 : 10,
          height: 10,
          borderRadius: 100,
          backgroundColor: activePage === i ? Colors.primary_500 : Colors.grey_300,
          marginHorizontal: 4,
        }}
      />,
    );
  }
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {dots}
    </View>
  );
};

export const makeSteppersV2 = (activePage: any, total: number) => {
  const dots: JSX.Element[] = [];
  for (let i = 0; i < total; i++) {
    dots.push(
      <View
        key={i}
        style={{
          width: activePage === i ? 40 : 10,
          height: 10,
          borderRadius: 100,
          backgroundColor: activePage === i ? Colors.primary_500 : Colors.grey_300,
          marginHorizontal: 4,
        }}
      />,
    );
  }
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {dots}
    </View>
  );
};
