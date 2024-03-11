import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: '7%',
  },

  header: {
    color: Colors.grey_900,
    fontFamily: 'Urbanist-Bold',
    fontSize: RFValue(18, ScreenHeight),
    marginBottom: '5%',
  },
  body: {
    color: Colors.grey_900,
    fontFamily: 'Urbanist',
    fontSize: RFValue(16, ScreenHeight),
    marginBottom: '5%',
  },
});
