import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 'auto',
  },
  noSurveyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSurveyText: {
    color: Colors.grey_500,
    fontFamily: 'Urbanist',
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
    paddingBottom: 0,
  },
  goBackArrow: {
    top: 20,
    left: 20,
    zIndex: 999,
    marginBottom: 20,
  },
  backArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: ScreenWidth - 60,
  },
  backArrowText: {
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    color: Colors.grey_900,
    marginLeft: 10,
    width: ScreenWidth / 1.5,
  },

  lineStyle: {
    backgroundColor: Colors.grey_200,
    height: 1,
    width: ScreenWidth - 40,
    marginTop: 30,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 24,
  },
  buttons: {
    flexDirection: 'row',
  },
  headerText: {
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    color: Colors.grey_900,
  },
});
