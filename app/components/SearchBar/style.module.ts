import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    color: Colors.grey_900,
  },
  searchBar: {
    borderWidth: 0,
    shadowColor: 'white',
    fontSize: RFValue(12, ScreenHeight),
    backgroundColor: Colors.grey_200,
    borderRadius: 20,
    width: 200,
    height: 'auto',
    alignItems: 'center',
    margin: 0,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  activeSearchBar: {
    borderWidth: 1,
    borderColor: Colors.primary_500,
    shadowColor: 'white',
    fontSize: RFValue(12, ScreenHeight),
    backgroundColor: Colors.primary_100,
    borderRadius: 20,
    width: 200,
    alignItems: 'center',
    margin: 0,
    marginRight: 10,
  },
  inputText: {
    fontSize: RFValue(14, ScreenHeight),
    width: '80%',
    fontFamily: 'Urbanist-Regular',
    backgroundColor: 'white',
  },
});
