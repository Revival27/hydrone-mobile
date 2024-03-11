import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  dragabblePanel: {
    position: 'absolute',
    zIndex: 5,
    bottom: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'white',
    height: 'auto',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 3,
  },
  panelTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  coords: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(14, ScreenHeight),
    color: Colors.grey_900,
    marginBottom: 14,
  },
  dividerLine: {
    backgroundColor: Colors.grey_200,
    width: '75%',
    height: 2,
    marginBottom: 24,
  },
  panelTitle: {
    fontFamily: 'Urbanist-Bold',
    fontSize: RFValue(24, ScreenHeight),
    color: Colors.grey_900,
    marginVertical: 14,
  },
  measurement: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  measurementContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  measurementTitle: {
    marginTop: 10,
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
  },
  swipeLine: {
    width: 40,
    height: 3,
    alignSelf: 'center',
    backgroundColor: Colors.grey_300,
    marginTop: 10,
  },
  container: {
    height: '100%',
    marginTop: 24,
  },
  rowElementContainer: {
    alignItems: 'center',
    paddingBottom: 150,
  },
  rowElement: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: ScreenWidth - 60,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 2,
  },
  rowElementTitle: {
    fontSize: RFValue(18, ScreenHeight),
    color: Colors.grey_900,
    alignItems: 'center',
    fontFamily: 'Urbanist-Bold',
  },
  location: {
    color: Colors.grey_700,
    marginTop: 10,
    fontSize: RFValue(14, ScreenHeight),
    fontFamily: 'Urbanist-Medium',
  },
  timeText: {
    fontSize: RFValue(18, ScreenHeight),
    color: Colors.primary_500,
    fontFamily: 'Urbanist-Bold',
  },
  leftSide: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  data: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  time: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  modeContainer: {
    marginTop: 10,
    marginLeft: 16,
    flexDirection: 'row',
  },
  measurementMode: {
    color: Colors.grey_700,
    marginLeft: 5,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
  button: {
    marginTop: -30,
    width: ScreenWidth - 40,
    alignSelf: 'center',
  },
  buttonContainer: {
    width: 150,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: Colors.primary_500,
    borderWidth: 1.5,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: Colors.primary_500,
    fontFamily: 'Urbanist-SemiBold',
  },
  emptyList: {
    marginTop: '10%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '75%',
  },
  emptyListText: {
    paddingVertical: 15,
    fontSize: RFValue(18, ScreenHeight),
    color: Colors.grey_900,
    fontFamily: 'Urbanist-Regular',
    textAlign: 'center',
  },
  btnContainer: {
    height: 40,
    width: ScreenWidth / 2.5,
    borderRadius: 100,
  },

  btnStyle: {
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
    height: '100%',
  },
  btnTitle: {
    fontSize: RFValue(16, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    color: 'white',
  },
  chooseMeasurementText: {
    fontSize: RFValue(16, ScreenHeight),
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Urbanist',
    color: Colors.grey_900,
  },
});
