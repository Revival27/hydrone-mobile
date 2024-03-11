import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../../../../constants/colors';

export const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
  },
  dropdownContainer: {
    width: ScreenWidth - 40,
  },

  inputLabel: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(16, ScreenHeight),
    color: Colors.grey_900,
  },
  btnContainer: {
    justifyContent: 'flex-end',
    paddingVertical: 40,
  },
  containerStyle: {
    height: ScreenHeight / 6,
  },
  searchContainerStyle: {
    borderBottomWidth: 0,
  },
  searchTextInputStyle: {
    borderWidth: 1,
    color: Colors.primary_500,
    borderColor: Colors.primary_500,
  },
  dropDown: {
    backgroundColor: Colors.grey_50,
    borderWidth: 0,
  },

  activeDropDown: {
    backgroundColor: Colors.primary_100,
    borderWidth: 0,
  },
  activeLabel: {
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.primary_500,
  },
  inactiveLabel: {
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
  },
  badgeTextStyle: {
    color: 'white',
  },
  optionLabeText: {
    color: Colors.primary_300,
  },
});
