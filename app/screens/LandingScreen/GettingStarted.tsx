import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Stepper1 from '../../assets/images/icons/stepper1.svg';
import GettingStartedDrone from '../../assets/images/illustrations/gettingStartedDrone.svg';
import CustomButton from '../../components/Button';
import { Colors } from '../../constants/colors';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: '15%',
  },
  droneImage: {
    width: 300,
    height: 189,
  },
  starterText: {
    fontSize: 40,
    lineHeight: 44,
    fontFamily: 'Urbanist-Bold',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#212121',
    top: 50,
  },
  stepper: {
    top: 100,
  },
  skipText: {
    fontSize: 14,
    fontFamily: 'Urbanist-SemiBold',
    fontWeight: '600',
    letterSpacing: 0.2,
    color: Colors.primary_500,
    top: 135,
  },
  nextButtonContainer: {
    top: 160,
    width: 380,
    height: 58,
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
  },
});

const GettingStarted: FC<IProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <GettingStartedDrone style={styles.droneImage} />
      <Text style={styles.starterText}>A legjobb alkalmazás drónos feltérképezéshez</Text>
      <Stepper1 style={styles.stepper} />
      <Text onPress={() => navigation.navigate('GettingStartedSecondScreen')} style={styles.skipText}>
        Kihagyás
      </Text>
      <View style={styles.nextButtonContainer}>
        <CustomButton text="Tovább" paddings={[18, 16, 18, 16]} size={16} onPress={() => navigation.navigate('GettingStartedSecondScreen')} />
      </View>
    </View>
  );
};

export default GettingStarted;
