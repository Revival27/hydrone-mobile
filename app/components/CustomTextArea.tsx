/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';

import { Colors } from '../constants/colors';

interface IProps {
  placeholder?: string;
  placeholderTextColor?: string;
  backgroundColor?: string;
  value?: string;
  defaultValue?: string;
  editable?: boolean;
  onChangeText?: (text: string) => void;
}

const screenWidth = Dimensions.get('window').width;

const CustomTextArea: FC<IProps> = ({ placeholderTextColor, value, editable, onChangeText, defaultValue, placeholder, backgroundColor = Colors.grey_100 }) => {
  return (
    <View style={styles.textAreaContainer}>
      <TextInput
        editable={editable === false ? false : true}
        defaultValue={defaultValue ? defaultValue : ''}
        style={backgroundColor ? [styles.textArea, { backgroundColor: backgroundColor }] : { ...styles.textArea }}
        underlineColorAndroid="transparent"
        placeholderTextColor={placeholderTextColor ? `${placeholderTextColor}` : Colors.grey_500}
        placeholder={placeholder ? `${placeholder}` : ''}
        numberOfLines={10}
        multiline={true}
        scrollEnabled={true}
        value={value ? `${value}` : ''}
        onChangeText={onChangeText ? onChangeText : () => {}}
      />
    </View>
  );
};

export default CustomTextArea;

const styles = StyleSheet.create({
  textAreaContainer: {
    textAlign: 'left',
    width: screenWidth - 40,
    marginVertical: 20,
  },
  textArea: {
    padding: '3%',
    height: 'auto',
    borderRadius: 12,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    alignItems: 'center',
    color: Colors.grey_900,
    backgroundColor: Colors.grey_100,
  },
});
