import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 0,
  },
  container: {
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    marginBottom: 24,
  },
  searchBar: {
    fontSize: RFValue(12, ScreenHeight),
    width: '100%',
    height: 40,
    margin: 0,
  },
  inputText: {
    fontSize: RFValue(14, ScreenHeight),
    width: '80%',
    fontFamily: 'Urbanist-Regular',
  },
  buttons: {
    flexDirection: 'row',
  },
  headerText: {
    fontSize: RFValue(14, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
  },
  searchIcon: {
    marginRight: 10,
  },
  backArrow: {
    zIndex: 999,
  },
  emptyProjectPage: { justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: '100%' },
  emptyProjectPageText: { color: Colors.grey_500, fontFamily: 'Urbanist', textAlign: 'center' },
});
