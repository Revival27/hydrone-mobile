import { ScreenWidth, ScreenHeight } from '@rneui/base';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    width: ScreenWidth - 40,
  },
  radioContainer: {
    marginVertical: 15,
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 16,
  },
  radioButtonContainer: {
    marginLeft: 'auto',
    width: '20%',
  },
  radioTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  radioText: {
    fontSize: RFValue(18, ScreenHeight),
    color: Colors.grey_800,
    fontFamily: 'Urbanist-Bold',
    textAlign: 'center',
  },
  mainTitle: {
    fontSize: RFValue(18, ScreenHeight),
    color: Colors.grey_800,
    fontFamily: 'Urbanist-SemiBold',
    textAlign: 'left',
    paddingBottom: 25,
  },
  btnContainer: {
    alignItems: 'center',
    height: ScreenHeight / 5,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  indexText: {
    fontSize: RFValue(36, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    paddingHorizontal: 10,
  },
});
