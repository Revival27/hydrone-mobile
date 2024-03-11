/* eslint-disable react-native/no-inline-styles */
import { Text } from 'react-native';
import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

interface GradientTextProps {
  colors: string[];
  [x: string]: any;
}

const GradientText = ({ colors, ...rest }: GradientTextProps) => {
  return (
    <MaskedView maskElement={<Text {...rest} />}>
      <LinearGradient useAngle={true} locations={[0.0, 1.0]} angle={286.17} colors={colors} start={{ x: 0.1, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text {...rest} style={[rest.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
