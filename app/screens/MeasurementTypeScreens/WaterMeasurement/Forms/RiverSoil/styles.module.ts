import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    width: ScreenWidth - 40,
  },
  mainTitle: {
    width: ScreenWidth - 40,
    fontSize: RFValue(18, ScreenHeight),
    color: Colors.grey_900,
    fontFamily: 'Urbanist-SemiBold',
    textAlign: 'left',
    paddingBottom: 25,
  },
  inputLabel: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(16, ScreenHeight),
    color: Colors.grey_900,
  },
  textInputContainer: {
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
    borderColor: Colors.grey_100,
    borderWidth: 1,
    color: Colors.grey_500,
    marginTop: 20,
    marginBottom: 20,
  },
  inputText: {
    fontSize: RFValue(14, ScreenHeight),
    width: '90%',
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
  },
  btnContainer: {
    alignItems: 'center',
    height: ScreenHeight / 6.5,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
});
