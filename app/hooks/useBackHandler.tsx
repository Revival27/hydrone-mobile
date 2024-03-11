import React from 'react';
import { BackHandler } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

export function useBackHandler(handler: () => boolean) {
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handler);
      return () => BackHandler.removeEventListener('hardwareBackPress', handler);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
}
