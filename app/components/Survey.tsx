import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { RFValue } from 'react-native-responsive-fontsize';

/* eslint-disable @typescript-eslint/no-use-before-define */
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenHeight } from '@rneui/base';

import BlueBg from '../assets/images/icons/BlueBg.svg';
import GreenBg from '../assets/images/icons/greenBg.svg';
import More from '../assets/images/icons/More_White.svg';
import PurpleBg from '../assets/images/icons/purpleBg.svg';
import RedBg from '../assets/images/icons/redBg.svg';
import { Backgrounds } from '../constants/Backgrounds';

interface IProps {
  id: number;
  project_id: number;
  name: string;
  projectName?: string;
  description: string;
  updated_at: string;
  latitude: number;
  longitude: number;
  background_id: number;
  navigation: NavigationProp<ParamListBase>;
  noOfVideos: number | 0;
  noOfImages: number | 0;
  noOfMeasurements: number | 0;
}

const Survey: FC<IProps> = ({ id, name, latitude, longitude, background_id, navigation, projectName, project_id, noOfVideos, noOfImages, noOfMeasurements }) => {
  const { t } = useTranslation();

  const getBackGround = () => {
    switch (background_id) {
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
        console.log('color does not exist');
    }
  };

  const currentUserLocation = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const displayedLocation = `${latitude} - ${longitude}`;

  return (
    <LinearGradient
      colors={[Backgrounds[background_id].color1, Backgrounds[background_id].color2]}
      useAngle={true}
      angle={Backgrounds[background_id].angle}
      style={styles.linearGradient}>
      {getBackGround()}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProjectSurveyScreen', {
            id: id,
            name: projectName,
            project_id: project_id,
          })
        }
        style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{name.length > 15 ? `${name.substring(0, 15)}...` : name}</Text>

          <View style={styles.iconContainer}>
            <More />
          </View>
        </View>
        <Text style={styles.latlong}> {displayedLocation.length > 20 ? `${displayedLocation.substring(20, 0)}...` : displayedLocation} </Text>

        <Text style={styles.date}>{t('components.survey.surveys', { number: noOfMeasurements, plural: 's' })}</Text>
        <Text style={styles.date}>{t('components.survey.pictures', { number: noOfImages, plural: 's' })}</Text>
        <Text style={styles.date}>{t('components.survey.videos', { number: noOfVideos, plural: 's' })}</Text>
        <View style={styles.mapStyle}>
          <MapView toolbarEnabled={false} liteMode={true} initialRegion={currentUserLocation} provider={PROVIDER_GOOGLE} showsUserLocation={true} style={styles.map}>
            <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
          </MapView>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Survey;

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },

  container: {
    alignItems: 'flex-start',
    height: 280,
  },
  date: {
    color: 'white',
    fontSize: RFValue(20, ScreenHeight),
    paddingBottom: 8,
  },
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist',
    paddingBottom: 16,
    width: '80%',
  },
  description: {
    color: 'white',
    fontSize: RFValue(16, ScreenHeight),
  },
  mapStyle: {
    height: 150,
    width: 150,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  map: {
    flex: 1,
  },
  latlong: {
    color: 'white',
    fontSize: RFValue(14, ScreenHeight),
    marginTop: -15,
    paddingBottom: 16,
  },
});
