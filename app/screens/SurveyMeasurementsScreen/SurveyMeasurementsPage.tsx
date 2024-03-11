/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft } from 'react-native-iconly';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenWidth } from '@rneui/base';

import VegetationMeasurement from '../../assets/images/icons/MeasurementPic.svg';
import SoilMeasurement from '../../assets/images/icons/SoilCompMeasurement.svg';
import WaterMeasurement from '../../assets/images/icons/WaterMeasurement.svg';
import GeneralMeasurement from '../../assets/images/icons/General.svg';
import Measurement from '../../components/Measurement';
import { Colors } from '../../constants/colors';
import { styles } from './styles.module';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const SurveyMeasurementsPage: FC<IProps> = ({ navigation, route }) => {
  const goBackToPreviousRoute = () => {
    const routes = navigation.getState()?.routes;
    navigation.navigate(routes[routes.length - 2]?.name.toString(), { id, name, project_id });
  };
  const { id, name, project_id } = route.params;
  const measurements = useSelector((state: RootState) => state.measurement.measurements.filter(mes => mes.survey_id === id));
  const formattedMeasurementLocation = measurement => measurement.latitude.toString().concat(' |').concat(' ').concat(measurement.longitude);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity activeOpacity={1} style={styles.goBackArrow}>
        <View style={styles.backArrowContainer}>
          <ArrowLeft
            onPress={() => {
              goBackToPreviousRoute();
            }}
            color={Colors.grey_900}
          />
          <View
            style={{
              marginRight: 'auto',
            }}>
            <Text style={styles.backArrowText}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.container}>
          {measurements.map(measurement => (
            <View key={measurement.id}>
              <Measurement
                navigation={navigation}
                id={measurement.id}
                latitude={measurement.latitude}
                longitude={measurement.longitude}
                surveyId={measurement.survey_id}
                name={measurement.name}
                description={measurement.description}
                latlong={formattedMeasurementLocation(measurement)}
                measurementTypeId={measurement.measurement_type_id}
                measurement_type_slug={measurement.measurement_type_slug}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 20, height: 150, alignItems: 'center', marginBottom: '10%' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('WaterMeasurementScreen', { id: id, type_id: 3, name: 'River discharge', surveyId: id })}
            activeOpacity={1}
            style={{ alignItems: 'center', width: ScreenWidth / 3 }}>
            <WaterMeasurement width={58} height={58} />
            <Text style={{ color: Colors.grey_900, textAlign: 'center' }}>River discharge</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('VegetationMeasurementScreen', { id: id, type_id: 2, name: 'Vegetation', surveyId: id })}
            style={{ alignItems: 'center', width: ScreenWidth / 3 }}>
            <VegetationMeasurement width={58} height={58} />
            <Text style={{ color: Colors.grey_900, textAlign: 'center' }}>Vegetation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SoilMeasurementScreen', { id: id, type_id: 1, name: 'Soil composition', surveyId: id })}
            style={{ alignItems: 'center', width: ScreenWidth / 3 }}>
            <SoilMeasurement width={58} height={58} />
            <Text style={{ color: Colors.grey_900, textAlign: 'center' }}>Soil composition</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('GeneralMeasurementScreen', { id: id, type_id: 5, name: 'General Measurement', surveyId: id })}
            style={{ alignItems: 'center', width: ScreenWidth / 3 }}>
            <GeneralMeasurement width={58} height={58} />
            <Text style={{ color: Colors.grey_900, textAlign: 'center' }}>General</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SurveyMeasurementsPage;
