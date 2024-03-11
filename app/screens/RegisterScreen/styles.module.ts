import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
    height: ScreenHeight - 80,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginTop: 20,
  },

  createText: {
    fontSize: RFValue(38, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    color: Colors.grey_900,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.grey_50,
    marginTop: 20,
  },

  activeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.primary_100,
    marginTop: 20,
    borderColor: Colors.primary_500,
    borderWidth: 1.5,
  },

  errorInput: {
    borderColor: Colors.error,
    borderWidth: 1,
    backgroundColor: Colors.grey_50,
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingLeft: 20,
    paddingRight: 20,
    color: Colors.grey_900,
  },

  inputText: {
    fontSize: RFValue(14, ScreenHeight),
    fontFamily: 'Urbanist-Regular',
    color: Colors.grey_900,
    width: '80%',
  },
  termsOfUseContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: ScreenWidth - 40,
    height: 58,
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
  },

  loginButtonContainer: {
    flexDirection: 'row',
  },
  loginBtn: {
    color: Colors.primary_500,
    opacity: 1,
    fontFamily: 'Urbanist-Bold',
  },
  alreadyHasAccount: {
    color: Colors.grey_500,
    opacity: 0.7,
    paddingRight: 5,
  },
  alreadyHasAccountContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  errorMsg: {
    color: Colors.error,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
