import { Text, View } from 'react-native';

import { InfoCircle } from 'react-native-iconly';
import React from 'react';

export const toastConfig = {
  Success: ({ text1 }) => (
    <View
      style={{
        height: 'auto',
        width: '90%',
        backgroundColor: '#DBF8E6',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}>
      <InfoCircle set="bold" color="#4AAF57" />
      <Text style={{ marginLeft: 10, color: '#4AAF57', flex: 1, flexWrap: 'wrap' }}>{text1}</Text>
    </View>
  ),

  Error: ({ text1 }) => (
    <View
      style={{
        height: 'auto',
        width: '90%',
        backgroundColor: '#FDDDDD',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}>
      <InfoCircle set="bold" color="#F75555" />
      <Text style={{ marginLeft: 10, color: '#F75555', flex: 1, flexWrap: 'wrap' }}>{text1}</Text>
    </View>
  ),
};
