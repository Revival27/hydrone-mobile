import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    maxHeight: ScreenHeight,
  },
  goBackArrow: {
    top: 30,
    left: 20,
    zIndex: 999,
  },
  backArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrowText: {
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    // color: Colors.grey_900,
    marginLeft: 10,
  },
  nameText: {
    textAlign: 'center',
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    lineHeight: 28,
    // color: Colors.grey_900,
    paddingTop: 10,
  },
  darkModeBtnContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    textAlign: 'center',
    marginTop: 30,
    marginRight: 30,
  },
  darkModeBtn: {},
  emailText: {
    textAlign: 'center',
    fontSize: RFValue(14, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    lineHeight: 28,
    // color: Colors.grey_900,
    marginBottom: -50,
  },
  profileInfo: {
    marginTop: -60,
    flexDirection: 'column',
    alignItems: 'center',
  },

  optionItems: {
    width: '90%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: -60,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  optionItemText: {
    fontSize: RFValue(18, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    // color: Colors.grey_800,
    padding: 10,
  },
  optionLogoutText: {
    fontSize: RFValue(18, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.error,
    padding: 10,
  },
  lineStyle: {
    marginVertical: -20,
    backgroundColor: Colors.grey_200,
    height: 1,
    width: ScreenWidth - 40,
  },
});
