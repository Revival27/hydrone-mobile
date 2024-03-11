import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.grey_50,
    color: Colors.grey_500,
    marginTop: 10,
    marginBottom: 24,
  },
  inputLabel: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(16, ScreenHeight),
    color: Colors.grey_900,
    width: ScreenWidth - 20,
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
  mapContainer: {
    height: 300,
    width: ScreenWidth - 40,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  map: {
    flex: 1,
  },
  button: {
    flex: 1,
    width: '95%',
    marginBottom: 24,
    marginTop: -10,
  },
  bubble: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
  },
  bubble__text: {
    borderRadius: 100,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    color: Colors.grey_800,
  },
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
  locInput: {
    fontSize: RFValue(14, ScreenHeight),
    width: 'auto',
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
  },
  errorInput: {
    borderColor: Colors.error,
    borderWidth: 1,

    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.grey_50,
    color: Colors.grey_500,
    marginTop: 10,
    marginBottom: 24,
  },
});
