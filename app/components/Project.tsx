import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';

/* eslint-disable @typescript-eslint/no-use-before-define */
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenHeight } from '@rneui/base';

import BlueBg from '../assets/images/icons/BlueBg.svg';
import GreenBg from '../assets/images/icons/greenBg.svg';
import PurpleBg from '../assets/images/icons/purpleBg.svg';
import RedBg from '../assets/images/icons/redBg.svg';
import { Backgrounds } from '../constants/Backgrounds';
import { RootState } from '../store/store';

interface IProject {
  id: number;
  background_id: number;
  title: string;
  description: string;
  updated_at: string;
  navigation: NavigationProp<ParamListBase>;
  surveys?: [];
}

const Project: FC<IProject> = ({ id, navigation }) => {
  const project: any = useSelector((state: RootState) => state.projects.projects.find(p => p.id === id));

  const getBackGround = () => {
    switch (project?.background_id) {
      case 0:
        return <PurpleBg style={styles.svgBg} />;
      case 1:
        return <GreenBg style={styles.svgBg} />;
      case 2:
        return <BlueBg style={styles.svgBg} />;
      case 3:
        return <RedBg style={styles.svgBg} />;
      case 4:
        return <RedBg style={styles.svgBg} />;
      default:
        console.log('color does not exist.');
    }
  };

  return (
    <LinearGradient
      colors={[Backgrounds[project.background_id].color1, Backgrounds[project.background_id].color2]}
      useAngle={true}
      angle={Backgrounds[project?.background_id].angle}
      style={styles.linearGradient}>
      {getBackGround()}
      <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 25, left: 25 }} onPress={() => navigation.navigate('ProjectScreen', { id: id })} style={styles.container}>
        <Text style={styles.date}>{project.surveys.length ? project.surveys.length + ' surveys' : '0 survey'} </Text>
        <Text style={styles.title}>{project?.name}</Text>
        <Text style={styles.description}>{project?.description?.length >= 40 ? project?.description?.substring(20, 0) + '...' : project?.description}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Project;
const styles = StyleSheet.create({
  linearGradient: {
    padding: 32,
    borderRadius: 40,
    marginBottom: 24,
    overflow: 'hidden',
  },
  svgBg: {
    position: 'absolute',
  },

  container: {
    alignItems: 'flex-start',
  },
  date: {
    color: 'white',
    fontSize: RFValue(14, ScreenHeight),
    paddingBottom: 8,
  },
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist',
    paddingBottom: 16,
  },
  description: {
    color: 'white',
    fontSize: RFValue(16, ScreenHeight),
  },
});
