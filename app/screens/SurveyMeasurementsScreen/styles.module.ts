import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  goBackArrow: {
    width: ScreenWidth - 40,
    zIndex: 999,
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
    marginLeft: 10,
  },
  container: {
    flex: 1,
    width: ScreenWidth,
    marginTop: 20,
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.grey_100,
  },
});
