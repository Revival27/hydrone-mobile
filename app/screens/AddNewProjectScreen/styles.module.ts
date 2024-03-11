import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    marginTop: 30,
  },
  goBackArrow: {
    top: 15,
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
    color: Colors.grey_900,
    marginLeft: 10,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingVertical: 0,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.grey_50,
    borderColor: Colors.grey_100,
    borderWidth: 1,
    color: Colors.grey_500,
    marginTop: 20,
  },
  inputLabel: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(16, ScreenHeight),
    color: Colors.grey_900,
    justifyContent: 'flex-start',
  },
  chooseBg: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 24,
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(16, ScreenHeight),
    color: Colors.grey_900,
  },
  inputText: {
    fontSize: RFValue(14, ScreenHeight),
    width: '90%',
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
  },
  btnContainer: {
    width: ScreenWidth - 40,

    height: 58,
    borderRadius: 100,
  },
  buttonStyle: {
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
    height: 58,
    width: ScreenWidth - 40,
  },
  buttonContainerStyle: {
    width: ScreenWidth - 40,

    borderRadius: 100,
    height: 58,
    marginTop: 50,
  },

  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 30,
  },
  date: {
    color: 'white',
    fontSize: RFValue(14, ScreenHeight),
    paddingBottom: 8,
  },
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist',
    paddingBottom: 16,
  },
  description: {
    color: 'white',
    fontSize: RFValue(16, ScreenHeight),
  },
  descriptionContainer: {
    marginTop: 35,
  },
  gradientContainer: {
    alignItems: 'flex-start',
  },
});
