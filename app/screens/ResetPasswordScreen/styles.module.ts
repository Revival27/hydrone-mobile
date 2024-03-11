import { StyleSheet } from 'react-native';

import { ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 20,
    marginVertical: '5%',
    backgroundColor: Colors.grey_50,
  },
  image: {
    alignItems: 'center',
  },
  btnContainer: {
    width: ScreenWidth - 40,
    height: 58,
    marginTop: '20%',
  },
  header: {
    justifyContent: 'center',
  },
  errorMsg: {
    color: Colors.error,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  buttonStyle: {
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
    height: 58,
    alignItems: 'center',
  },
  buttonContainerStyle: {
    borderRadius: 100,
    paddingHorizontal: 24,
    height: 58,
    width: '100%',
  },
  activeInput: {
    borderColor: Colors.primary_500,
    borderWidth: 1,
    backgroundColor: Colors.primary_100,
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 20,
    color: Colors.grey_900,
    marginTop: 20,
  },
});
