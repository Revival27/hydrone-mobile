import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    paddingBottom: 24,
  },

  inputText: {
    fontSize: RFValue(14, ScreenHeight),
    width: '80%',
    fontFamily: 'Urbanist-Regular',
    backgroundColor: 'white',
  },
  leftside: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftArrow: {
    marginRight: 10,
  },
  rightSidebuttons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    color: Colors.grey_900,
  },
  backArrow: {
    zIndex: 999,
  },
});
