import React from 'react';
import { StyleSheet, View } from 'react-native';

const DarkModeButton = () => {
  return (
    <View style={styles.toggle}>
      <View style={styles.night}></View>
    </View>
  );
};

export default DarkModeButton;

const styles = StyleSheet.create({
  toggle: {
    height: 40,
    width: 80,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    position: 'relative',
    marginLeft: 'auto',
    backgroundColor: '#27173a',
  },
  linearGradient: {
    borderRadius: 30,
    marginLeft: 'auto',
  },
  night: {
    height: 30,
    width: 30,
    borderRadius: 100,
    backgroundColor: '#ffc207',
    top: 4,
    left: 5,
    shadowColor: '#ffc207',
    shadowOffset: { width: 5, height: 5 },
  },
  shape: {},
});
