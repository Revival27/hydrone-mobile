import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    width: ScreenWidth - 55,
    elevation: 2,
    borderRadius: 24,
  },
  btnContainer: {
    alignItems: 'center',
    height: ScreenHeight / 5,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
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
  },
  statusFinishedContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.success,
    borderRadius: 6,
  },
  statusUnfinishedContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.warning,
    borderRadius: 6,
  },
  statusText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: RFValue(18, ScreenHeight),
    color: '#fff',
  },
  dateContainer: {
    marginLeft: 'auto',
  },
  btnContainerStyle: {
    height: 58,
    width: ScreenWidth - 40,
    borderRadius: 100,
  },
  btnStye: { backgroundColor: Colors.primary_500, borderRadius: 100, height: '100%' },
  btnTitleStyle: { fontSize: RFValue(16, ScreenHeight), fontFamily: 'Urbanist-Bold', color: 'white' },
  mainContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  goBackArrow: {
    zIndex: 999,
    width: ScreenWidth - 40,
    marginRight: 'auto',
    paddingBottom: 20,
  },
  backArrowContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 30,
    left: 30,
    marginBottom: 24,
  },
  backArrowText: {
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    color: Colors.grey_900,
    textAlign: 'left',
    width: '60%',
  },

  rightHeader: {
    flexDirection: 'row',
    marginRight: 10,
    paddingHorizontal: 10,
  },
  measurementContainer: {
    alignItems: 'center',
  },
  measurementName: {
    fontSize: RFValue(18, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
    marginTop: 15,
    paddingBottom: 25,
  },
  photoUpload: {
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
    textAlign: 'center',
  },
  measurementImagesTitle: {
    fontSize: RFValue(18, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
  },
  contentContainer: {
    alignItems: 'center',
  },
  lineStyle: {
    // marginVertical: -20,
    backgroundColor: Colors.grey_200,
    height: 1,
    width: ScreenWidth - 40,
    marginBottom: 30,
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
  images: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  pictureContainer: {
    width: ScreenWidth - 40,
    marginTop: 15,
    marginBottom: 20,
  },
  video: {
    backgroundColor: 'blue',
    width: ScreenWidth - 40,
    height: ScreenHeight / 3,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 24,
  },
  locationInput: {
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
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.grey_200,
    borderColor: Colors.grey_100,
    borderWidth: 1,
    color: Colors.grey_500,
    marginVertical: 20,
  },
  inputText: {
    fontSize: RFValue(14, ScreenHeight),
    width: '90%',
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
  },
  inputLabel: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(16, ScreenHeight),
    color: Colors.grey_900,
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    borderRadius: 24,
  },
  buttonContainerStyle: {
    height: 58,
    width: ScreenWidth - 80,
    borderRadius: 100,
  },
  buttonStyle: {
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
    height: '100%',
  },
  buttonTitleStyle: {
    fontSize: RFValue(16, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    color: 'white',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%',
  },
  rowElementText: {
    color: Colors.grey_900,
    marginLeft: 10,
  },
});
