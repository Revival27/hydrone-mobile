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

  textInput: {
    width: '80%',
    color: Colors.grey_900,
  },

  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.grey_50,
    marginTop: 20,
  },
  activeInputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary_100,
    marginTop: 20,
    borderColor: Colors.primary_500,
    borderWidth: 1,
  },
  btnContainer: {
    marginTop: '20%',
    width: ScreenWidth - 40,
  },
  buttonStyle: {
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
    height: 58,
    alignItems: 'center',
  },
  buttonContainerStyle: {
    borderRadius: 100,
    height: 58,
    width: '100%',
  },
  header: {
    justifyContent: 'center',
    flex: 1,
  },
  errorMsg: {
    color: Colors.error,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
