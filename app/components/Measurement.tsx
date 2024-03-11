/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenHeight } from '@rneui/base';

import { Colors } from '../constants/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import MeasurementIconSelector from './MeasurementIconselector';

const MEASUREMENT_TYPES = {
  VEGETATION: 'vegetation',
  SOIL_COMPOSITION: 'soil_composition',
  RIVER_DISCHARGE: 'river_discharge',
  GENERAL: 'general',
};

interface IProps {
  id: number;
  surveyId: number;
  name: string;
  latitude: number;
  longitude: number;
  measurement_type_slug: string;
  measurementTypeId: number;
  latlong: any;
  description: string;
  navigation: NavigationProp<ParamListBase>;
}

const Measurement: FC<IProps> = ({ id, latlong, navigation, surveyId, measurement_type_slug }) => {
  //Todo make a handleNavigation here to decide what type of details page it should go to

  const whereTo = () => {
    switch (measurement_type_slug) {
      case MEASUREMENT_TYPES.GENERAL:
        return 'GeneralDetailsSummaryScreen';

      case MEASUREMENT_TYPES.SOIL_COMPOSITION:
        return 'SoilDetailsSummaryScreen';

      case MEASUREMENT_TYPES.RIVER_DISCHARGE:
        return 'WaterDetailsSummaryScreen';

      case MEASUREMENT_TYPES.VEGETATION:
        return 'VegetationDetailsSummaryScreen';

      default:
        return 'GeneralDetailsSummaryScreen';
    }
  };

  const measurement = useSelector((state: RootState) => state.measurement.measurements.find(m => m.id === id));
  return (
    // <TouchableOpacity onPress={() => navigation.navigate('MeasurementDetailsScreen', { id })} style={styles.container}>
    <TouchableOpacity onPress={() => navigation.navigate(whereTo(), { id, surveyId })} style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MeasurementIconSelector measurement={measurement} height={50} width={50} />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.textField}>{measurement?.name}</Text>
              <Text style={styles.textField}>{latlong}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={[styles.textField, { textAlign: 'center' }]}>09:14</Text>
          <Text style={styles.textField}>Manual</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Measurement;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    marginVertical: 15,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  textField: {
    textAlign: 'left',
    fontSize: RFValue(14, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
    paddingVertical: 10,
  },
});
