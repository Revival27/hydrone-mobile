import React from 'react';
import { StatusBar } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { DJIGo } from './DJIGo';

function DjiGoScreen() {
  useFocusEffect(() => {
    StatusBar.setHidden(true);

    return () => {
      StatusBar.setHidden(false);
    };
  });

  // eslint-disable-next-line react-native/no-inline-styles
  return <DJIGo style={{ width: '100%', height: '100%' }} />;
}

export default DjiGoScreen;
