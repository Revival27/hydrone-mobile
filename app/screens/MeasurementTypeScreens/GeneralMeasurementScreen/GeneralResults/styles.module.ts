import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    width: ScreenWidth - 40,
  },
  inputLabel: {
    fontFamily: 'Urbanist-Regular',
    fontSize: RFValue(16, ScreenHeight),
    color: Colors.grey_700,
    marginHorizontal: 10,
  },
  images: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  imageButton: {
    width: ScreenWidth / 3,
    height: 100,
    backgroundColor: Colors.grey_50,
    borderRadius: 24,
    justifyContent: 'center',
    marginHorizontal: 5,
    overflow: 'hidden',
  },
  pictureContainer: {
    width: ScreenWidth - 40,
    marginTop: 15,
    marginBottom: 20,
  },
  galleryImage: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 24,
  },
  lineStyle: {
    // marginVertical: -20,
    backgroundColor: Colors.grey_200,
    height: 1,
    width: ScreenWidth - 40,
    marginVertical: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  video: {
    width: ScreenWidth - 40,
    height: ScreenHeight / 3,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 24,
    paddingHorizontal: 5,
  },
  compInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  label: {
    fontFamily: 'Urbanist-ExtraBold',
    fontSize: RFValue(24, ScreenHeight),
  },
  compInfoLabel: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(18, ScreenHeight),
    color: Colors.grey_900,
    marginHorizontal: 20,
    marginTop: 3,
  },
  compInfoValue: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(16, ScreenHeight),
    color: Colors.grey_700,
    marginHorizontal: 20,
  },
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    marginHorizontal: 20,
  },
  btnContainer: {
    alignItems: 'center',
    height: ScreenHeight / 5,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  btnGroup: {
    width: ScreenWidth - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    width: ScreenWidth - 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  infoTitle: {
    fontSize: RFValue(18, ScreenHeight),
    lineHeight: 30,
    color: Colors.grey_700,
    justifyContent: 'flex-start',
  },
  infoText: {
    marginLeft: 'auto',
    fontSize: RFValue(18, ScreenHeight),
    color: Colors.grey_900,
    fontFamily: 'Urbanist-SemiBold',
  },
  dateContainer: {
    marginLeft: 'auto',
  },
  startBtn: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
