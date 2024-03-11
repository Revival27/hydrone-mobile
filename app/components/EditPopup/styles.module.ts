import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },

  titleText: {
    textAlign: 'center',
    fontFamily: 'Urbanist-Bold',
    fontSize: RFValue(24, ScreenHeight),
    color: Colors.grey_900,
    marginBottom: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorButtonText: {
    fontSize: RFValue(16, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    color: Colors.error,
  },
  errorButtonStyle: {
    backgroundColor: 'white',
    borderRadius: 100,
    borderColor: Colors.error,
    borderWidth: 2,
    height: '100%',
  },

  lineStyle: {
    backgroundColor: Colors.grey_200,
    marginBottom: 12,
    height: 1,
    width: ScreenWidth - 40,
  },
  errorButtonContainer: {
    height: 45,
    marginTop: 20,
    width: ScreenWidth / 4,
    borderRadius: 100,
  },

  cancelButtonContainer: {
    height: 45,
    marginTop: 20,
    width: ScreenWidth / 1.7,
    borderRadius: 100,
  },

  element: {
    minHeight: '12%',
    marginVertical: '3%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  elementLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  elementText: {
    color: Colors.grey_900,
    marginLeft: 10,
  },
});
