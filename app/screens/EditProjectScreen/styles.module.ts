import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxWidth: ScreenWidth,
  },

  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.grey_50,
    color: Colors.grey_500,
    marginTop: 20,
  },
  inputLabel: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(16, ScreenHeight),
    color: Colors.grey_900,
    width: ScreenWidth - 40,
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
    marginBottom: 50,
  },

  projectSurveys: {
    width: ScreenWidth - 40,
  },

  projectSurveysHeader: {
    color: Colors.grey_900,
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(16, ScreenHeight),
    width: ScreenWidth - 40,
    paddingVertical: 20,
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
});
