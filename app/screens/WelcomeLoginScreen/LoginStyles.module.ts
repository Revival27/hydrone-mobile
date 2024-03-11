import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 24,
  },

  createText: {
    fontSize: RFValue(38, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    textAlign: 'left',
    color: Colors.grey_900,
    textTransform: 'capitalize',
    marginTop: 100,
    marginBottom: 50,
  },
  passwdInput: {
    fontSize: RFValue(32, ScreenHeight),
    width: '80%',
    fontFamily: 'Urbanist-Regular',
    color: Colors.grey_900,
  },
  inputContainer: {
    justifyContent: 'center',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.grey_100,
    color: Colors.grey_500,
    marginTop: 20,
  },
  activeInput: {
    borderColor: Colors.primary_500,
    borderWidth: 1,
    backgroundColor: Colors.primary_100,
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 20,
    color: Colors.grey_900,
    marginTop: 20,
  },
  inputText: {
    fontSize: RFValue(14, ScreenHeight),
    width: '80%',
    fontFamily: 'Urbanist-Regular',
    color: Colors.grey_900,
  },
  termsOfUseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
    height: 58,
  },
  buttonContainerStyle: {
    borderRadius: 100,
    height: 58,
  },

  loginButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginBtn: {
    color: Colors.primary_500,
    opacity: 1,
    fontFamily: 'Urbanist-Bold',
  },
  forgotPasswordText: {
    color: Colors.primary_500,
    opacity: 1,
    marginTop: 10,
    fontFamily: 'Urbanist-Bold',
  },
  alreadyHasAccount: {
    marginTop: 80,
    justifyContent: 'center',
    color: Colors.grey_500,
    opacity: 0.7,
    paddingRight: 5,
  },
});
