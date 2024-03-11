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
    color: Colors.grey_900,
    fontFamily: 'Urbanist-SemiBold',
    textAlign: 'left',
    paddingBottom: 25,
  },
  sliderStyle: {
    width: ScreenWidth - 40,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbStyle: {
    backgroundColor: '#FFF',
    borderWidth: 5,
    borderColor: '#6F9EFF',
  },
  qualityInput: {
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

    marginBottom: 40,
  },
  inputText: {
    fontSize: RFValue(14, ScreenHeight),
    width: '90%',
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
  },
  btnContainer: {
    alignItems: 'center',
    height: ScreenHeight / 2.2,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },

  thumbContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    width: 40,
    height: 40,
    borderRadius: 5,
    right: 11,
  },
  msgText: {
    fontFamily: 'Urbanist-SemiBold',
    color: '#fff',
    fontSize: RFValue(14, ScreenHeight),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  markerText: {
    fontSize: RFValue(14, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_700,
  },
});
