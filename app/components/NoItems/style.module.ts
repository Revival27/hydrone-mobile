import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },

  noItemsText: {
    paddingVertical: 15,
    fontSize: RFValue(18, ScreenHeight),
    color: Colors.grey_900,
    fontFamily: 'Urbanist-Regular',
    textAlign: 'center',
  },

  noItemsDescripion: {
    color: Colors.grey_900,
    fontFamily: 'Urbanist',
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
});
