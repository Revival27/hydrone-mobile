import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: 'auto',
    padding: 20,
    backgroundColor: '#fff',
    paddingVertical: '10%',
    paddingHorizontal: '10%',
    borderRadius: 30,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: Colors.primary_500,
    fontFamily: 'Urbanist-Bold',
    fontSize: RFValue(24, ScreenHeight),
    marginVertical: '5%',
    textAlign: 'center',
  },
  description: {
    color: Colors.grey_900,
    fontFamily: 'Urbanist',
    fontSize: RFValue(16, ScreenHeight),
    textAlign: 'center',
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
  },

  lineStyle: {
    backgroundColor: Colors.grey_200,
    marginBottom: 12,
    height: 1,
    width: ScreenWidth - 40,
  },
  errorButtonContainer: {
    height: 45,
    width: ScreenWidth / 1.7,
    marginTop: 20,
    borderRadius: 100,
  },

  cancelButtonContainer: {
    height: 45,
    marginTop: 20,
    width: ScreenWidth / 1.7,
    borderRadius: 100,
  },
  cancelButtonTitle: {
    fontSize: RFValue(16, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    color: 'white',
  },
  cancelButton: {
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
    height: '100%',
  },
});
