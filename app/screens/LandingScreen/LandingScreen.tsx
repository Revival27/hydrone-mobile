import React, { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';

/* eslint-disable @typescript-eslint/no-use-before-define */
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Logo from '../../assets/images/icons/Logo.svg';
import AppLoader from '../../components/AppLoader';
import { getDeviceInfo, initializeAppData } from '../../store/authSlice';
import { failedMessage } from '../../tools/ToastMessages/Messages';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const LandingScreen: FC<IProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const checkForInternet = async () => {
    let status;
    await NetInfo.fetch().then(state => {
      status = state.isConnected;
    });
    return status;
  };

  const checkIfLoggedIn = async () => {
    const token = await AsyncStorage.getItem('BEARER_TOKEN');
    const isConnected = await checkForInternet();
    if (isConnected === false) {
      navigation.navigate('WelcomeLoginScreen');
      failedMessage('Check your internet connection');
    } else if (token) {
      await dispatch(initializeAppData());
      navigation.navigate('HomeScreen');
    } else {
      navigation.navigate('WelcomeLoginScreen');
    }
  };

  useEffect(() => {
    //*Minden app nyitasnal lefut
    dispatch(getDeviceInfo());
    //*ha van token proceed, ha nincs, akkor login screen
    checkIfLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.container}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#246BFD', '#6F9EFF']} useAngle={true} angle={286.17} style={styles.gradientContainer}>
          <Logo />
          <AppLoader />
        </LinearGradient>
      </View>
    </>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
