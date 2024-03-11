import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  loginBtn: {
    width: ScreenWidth - 40,
    height: 58,
    justifyContent: 'center',
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
  },
  image: {
    marginTop: 28,
  },
  description: {
    fontSize: RFValue(16, ScreenHeight),
    fontFamily: 'Urbanist-Regular',
    textAlign: 'center',
    letterSpacing: 0.2,
    color: Colors.grey_900,
    width: ScreenWidth - 40,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.grey_100,
    color: Colors.grey_500,
    marginVertical: 28,
  },
  activeInputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.primary_100,
    color: Colors.grey_900,
    borderWidth: 1,
    borderColor: Colors.primary_500,
    marginVertical: 28,
  },
  inputText: {
    fontSize: RFValue(14, ScreenHeight),
    width: '80%',
    fontFamily: 'Urbanist-Regular',
    color: Colors.grey_900,
  },
  buttonStyle: {
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
    height: 58,
    alignItems: 'center',
  },
  buttonContainerStyle: {
    borderRadius: 100,
    paddingHorizontal: 24,
    height: 58,
    width: '100%',
    marginBottom: '10%',
  },
});
