import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';

export const useKeyboard = () => {
  const [isKeyboardShown, setIsKeyboardShown] = React.useState(false);
  const [isActiveSearch, setIsActiveSearch] = React.useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardShown(true);
      setIsActiveSearch(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardShown(false);
      setIsActiveSearch(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return {
    keyboardShown: isKeyboardShown,
    activeSearch: isActiveSearch,
  };
};
