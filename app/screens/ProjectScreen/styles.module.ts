import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  numberOfSurveysContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numberOfSurveysText: {
    fontSize: RFValue(18, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_800,
  },
  numberOfSurveys: {
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    color: Colors.grey_900,
  },
  mapContainer: {
    height: 300,
    width: ScreenWidth - 40,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 24,
  },
  map: {
    flex: 1,
  },
  buttons: {
    width: ScreenWidth - 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 113,
  },
  btnContainer: {
    width: ScreenWidth / 2.5,
    height: 45,
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  info: {
    fontSize: RFValue(18, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
  },
  editButton: {
    width: 150,
    height: 38,
  },
  optionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 'auto',
  },
  descriptionContainer: {
    alignItems: 'center',
  },
  description: {
    fontSize: RFValue(14, ScreenHeight),
    fontFamily: 'Urbanist-Regular',
    color: Colors.grey_900,
    textAlign: 'left',
    marginBottom: 5,
  },
  descriptionHeader: {
    fontSize: RFValue(18, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
    textAlign: 'left',
    width: ScreenWidth - 40,
    marginVertical: 10,
  },

  lineStyle: {
    backgroundColor: Colors.grey_200,
    marginVertical: 24,
    height: 1,
    width: ScreenWidth - 40,
  },
  rowText: {
    color: Colors.grey_900,
    marginLeft: 10,
    fontFamily: 'Urbanist',
  },
  surveyChips: {
    color: Colors.primary_500,
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(16, ScreenHeight),
    textAlign: 'left',
  },
  chipContainer: {
    flexDirection: 'row',
    width: ScreenWidth - 100,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  surveyChipsContainer: {
    paddingHorizontal: 20,
    height: 35,
    borderRadius: 30,
    borderColor: Colors.primary_500,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
    marginVertical: 5,
  },
});
