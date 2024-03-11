import { ScreenWidth, ScreenHeight } from '@rneui/base';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    width: ScreenWidth - 40,
  },
  mainTitle: {
    fontSize: RFValue(18, ScreenHeight),
    color: Colors.grey_800,
    fontFamily: 'Urbanist-SemiBold',
    textAlign: 'left',
    paddingBottom: 25,
  },
  inputText: {
    position: 'relative',
    fontSize: RFValue(32, ScreenHeight),
    width: '100%',
    fontFamily: 'Urbanist-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
  btnContainer: {
    alignItems: 'center',
    height: ScreenHeight / 4,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  superScript: {},
  superText: {
    fontSize: RFValue(25, ScreenHeight),
    color: '#fff',
  },
  dropdownContainer: {
    paddingVertical: 35,
  },
});
