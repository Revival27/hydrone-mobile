import Toast from 'react-native-toast-message';

export const successfulMessage = message => {
  return Toast.show({
    type: 'Success',
    position: 'top',
    text1: `${message}`,
    visibilityTime: 3000,
  });
};

export const failedMessage = message => {
  return Toast.show({
    type: 'Error',
    position: 'top',
    text1: `${message}`,
    visibilityTime: 3000,
  });
};
