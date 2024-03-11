import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Stepper from '../../assets/images/icons/stepper3.svg';
import TouristMap from '../../assets/images/illustrations/tourist_map.svg';
import CustomButton from '../../components/Button';
import { Colors } from '../../constants/colors';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const GettingStartedFinal: FC<IProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouristMap style={styles.droneImage} />
      <Text style={styles.starterText}>
        A legjobb alkalmazás drónos feltérképezéshez
      </Text>
      <Stepper style={styles.stepper} />
      <View style={styles.nextButtonContainer}>
        <CustomButton
          text="Ugorjunk neki"
          paddings={[18, 16, 18, 16]}
          size={16}
          onPress={() => navigation.navigate('WelcomeLoginScreen')}
        />
      </View>
    </View>
  );
};

export default GettingStartedFinal;

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

  nextButtonContainer: {
    top: 160,
    width: 380,
    height: 58,
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
  },
});
