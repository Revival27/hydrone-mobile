import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 24,
  },
  changePasswordButtonContainer: {
    backgroundColor: Colors.primary_100,
    borderRadius: 100,
    height: 58,
  },
  iconInsideButton: {
    marginRight: 5,
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

  activeInputField: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.primary_500,
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.primary_100,
    color: Colors.grey_500,
    marginTop: 20,
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
    marginVertical: 20,
  },

  buttonStyle: {
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
    height: 58,
  },
  buttonContainerStyle: {
    borderRadius: 100,
    height: 58,
    marginTop: 25,
  },
});
