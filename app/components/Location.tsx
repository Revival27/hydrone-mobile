import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScreenWidth } from '@rneui/base';

import Measurement from '../assets/images/icons/ExampleMeasurement.svg';

interface IProps {
  id: number;
  name: string;
  updated_at: string;
}

const Location: FC<IProps> = ({ id }) => {
  return (
    <View key={id} style={styles.locationContainer}>
      <Measurement width={ScreenWidth / 1.25} />
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  locationContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
