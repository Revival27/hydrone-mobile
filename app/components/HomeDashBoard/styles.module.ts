import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
    height: 350,
    borderRadius: 40,
    padding: '5%',
    justifyContent: 'space-between',
  },
  background: {
    position: 'absolute',
    top: '5%',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    width: 175,
    flexWrap: 'wrap',
    color: 'white',
    alignItems: 'center',
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(20, ScreenHeight),
  },

  batteryDotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
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
  batteryDot: {
    backgroundColor: Colors.success,
    marginHorizontal: 2,
    width: 13,
    height: 13,
    borderRadius: 60,
  },
  droneImage: {
    alignSelf: 'center',
    maxWidth: '60%',
    resizeMode: 'contain',
    flex: 1,
  },
  removedDrone: {
    opacity: 0.5,
    alignSelf: 'center',
    maxWidth: '60%',
    resizeMode: 'contain',
    flex: 1,
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
  controllerBoard: {
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: '5%',
    marginBottom: '5%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonText: {
    color: Colors.primary_500,
  },

  buttonCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    height: 52,
    backgroundColor: '#E9F0FF',
    borderRadius: 100,
  },
});
