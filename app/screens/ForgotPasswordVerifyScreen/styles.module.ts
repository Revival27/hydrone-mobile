import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    textAlign: 'center',
    fontSize: RFValue(16, ScreenHeight),
    marginVertical: 30,
  },
  codeFieldRoot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    width: ScreenWidth / 5.5,
    height: 61,
    lineHeight: 38,
    fontSize: RFValue(24, ScreenHeight),
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    borderRadius: 12,
    marginHorizontal: 7,
    marginVertical: 31,
    padding: 10,
    color: '#212121',
  },
  focusCell: {
    borderColor: '#000',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: ScreenWidth - 40,
    height: 58,
  },
});
