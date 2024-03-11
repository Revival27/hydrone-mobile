import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 24,
  },
  btnContainer: {
    marginTop: 10,
    alignItems: 'center',
    height: ScreenHeight / 5,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  infoContainer: {
    width: ScreenWidth - 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  infoTitle: {
    fontSize: RFValue(18, ScreenHeight),
    lineHeight: 30,
    color: Colors.grey_700,
    justifyContent: 'flex-start',
  },
  infoText: {
    marginLeft: 'auto',
    fontSize: RFValue(18, ScreenHeight),
    color: Colors.grey_900,
  },
  statusFinishedContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.success,
    borderRadius: 6,
  },
  statusUnfinishedContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.warning,
    borderRadius: 6,
  },
  statusText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: RFValue(18, ScreenHeight),
    color: '#fff',
  },
  dateContainer: {
    marginLeft: 'auto',
  },
  btnContainerStyle: {
    height: 58,
    width: ScreenWidth - 40,
    borderRadius: 100,
    marginBottom: 7.5,
  },
  backButtonStyle: {
    backgroundColor: 'white',
    borderRadius: 100,
    borderColor: Colors.primary_500,
    borderWidth: 2,
    height: '100%',
  },
  backButtonTitleStyle: { fontSize: RFValue(16, ScreenHeight), fontFamily: 'Urbanist-Bold', color: Colors.primary_500 },

  btnStye: { backgroundColor: Colors.primary_500, borderRadius: 100, height: '100%' },
  btnTitleStyle: { fontSize: RFValue(16, ScreenHeight), fontFamily: 'Urbanist-Bold', color: 'white' },
});
