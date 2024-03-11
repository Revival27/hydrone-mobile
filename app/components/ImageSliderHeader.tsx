import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { CloseSquare } from 'react-native-iconly';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight } from '@rneui/base';

import { Colors } from '../constants/colors';

interface IProps {
  onClose?: () => void;
}

const ImageSliderHeader: FC<IProps> = ({ onClose }) => {
  return (
    <View style={styles.closeButtonContainer}>
      <CloseSquare onPress={onClose} set="bulk" primaryColor={'#fff'} secondaryColor={Colors.grey_800} stroke="bold" size="xlarge" />
    </View>
  );
};

export default ImageSliderHeader;

const styles = StyleSheet.create({
  closeButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 30,
  },
  closeTag: {
    fontSize: RFValue(24, ScreenHeight),
  },
});
