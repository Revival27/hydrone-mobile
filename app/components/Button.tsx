import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { Colors } from '../constants/colors';

interface IButton {
  text: string;
  size?: number;
  font?: string;
  rounded?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  onPress?: (...args: any) => any;
  paddings?: Array<number>;
  icon?: any;
}

const CustomButton: FC<IButton> = ({
  text,
  onPress,
  paddings,
  size,
  font,
  disabled,
  rounded,
  backgroundColor = '#246BFD',
  color = 'white',
  borderColor,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        borderRadius: rounded ? 100 : 100,
        backgroundColor: disabled ? Colors.disabled : backgroundColor,
        paddingTop: paddings ? paddings[0] : 0,
        paddingRight: paddings ? paddings[1] : 0,
        paddingBottom: paddings ? paddings[2] : 0,
        paddingLeft: paddings ? paddings[3] : 0,
        borderColor: borderColor,
        borderWidth: borderColor ? 2 : 0,
      }}
      onPress={onPress}>
      <Text
        style={{
          textAlign: 'center',
          color: color,
          lineHeight: 22.4,
          fontSize: size,
          fontFamily: font ? font : 'Urbanist-Bold',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
