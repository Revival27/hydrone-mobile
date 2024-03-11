import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,

    padding: 24,
    paddingBottom: 0,
  },
  noSurveyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    padding: 24,
    paddingBottom: 0,
  },

  searchBar: {
    fontSize: RFValue(12, ScreenHeight),
    width: '100%',
    height: 40,
    margin: 0,
  },
  buttons: {
    flexDirection: 'row',
  },
  headerText: {
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
  },
});
