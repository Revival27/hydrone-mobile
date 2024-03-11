import { StyleSheet } from 'react-native';

import { ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  goBackArrow: {
    top: 20,
    left: 20,
    zIndex: 999,
  },

  loginBtn: {
    width: ScreenWidth - 40,
    height: 58,
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
    marginTop: 28,
  },
  registerButtonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dontHaveAccount: {
    color: Colors.grey_500,
    opacity: 0.7,
    paddingRight: 5,
  },
  registerBtn: {
    color: Colors.primary_500,
    opacity: 1,
    paddingVertical: 20,
    fontFamily: 'Urbanist-Bold',
  },
});
