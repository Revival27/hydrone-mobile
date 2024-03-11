import { ScreenHeight } from '@rneui/base';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  batteryDot: {
    backgroundColor: Colors.success,
    marginHorizontal: 2,
    width: 13,
    height: 13,
    borderRadius: 60,
  },
  emptyBatteryDot: {
    backgroundColor: 'transparent',
    marginHorizontal: 2,
    width: 13,
    height: 13,
    borderRadius: 60,
    borderColor: Colors.disabled,
    borderWidth: 1.5,
  },
  batteryDotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drone: {
    // marginTop: '-10%',
    maxWidth: '75%',
    resizeMode: 'contain',
    flex: 1,
    alignSelf: 'center',
  },
  disconnectedDrone: {
    marginTop: '10%',
    maxWidth: '75%',
    resizeMode: 'contain',
    flex: 1,
    alignSelf: 'center',
  },
  card: {
    marginBottom: 14,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 1,
    width: '85%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 24,
  },
  connected: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(14, ScreenHeight),
    color: Colors.success,
    backgroundColor: 'hsl(142, 69%, 93%)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 24,
  },
  disconnected: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(14, ScreenHeight),
    color: Colors.error,
    backgroundColor: 'hsl(360, 91%, 93%)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 24,
  },

  title: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(16, ScreenHeight),
    color: Colors.grey_900,
  },
  value: {
    marginLeft: 5,
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(16, ScreenHeight),
    color: Colors.grey_600,
  },
  time: {
    flexDirection: 'row',
  },
});
