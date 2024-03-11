import React, { FC, useEffect, useState } from 'react';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

import GeneralMarker from '../../assets/images/icons/generalMarker.svg';
import SoilMarker from '../../assets/images/icons/soilMarker.svg';
import VegetationMarker from '../../assets/images/icons/vegetationMarker.svg';
import WaterMarker from '../../assets/images/icons/waterMarker.svg';
import { Colors } from '../../constants/colors';
import { MeasurementType } from '../../constants/measurementTypes';
import { RootState } from '../../store/store';
import MeasurementList from './MeasurementList';
import Panel from './Panel';
import { styles } from './style.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const Markers: any = ({ measurements }) => {
  const iconSelector = measurement => {
    if (measurement.measurement_type_id === MeasurementType.RiverDischarge) {
      return <WaterMarker />;
    } else if (measurement.measurement_type_id === MeasurementType.Vegetation) {
      return <VegetationMarker width={40} />;
    } else if (measurement.measurement_type_id === MeasurementType.Soil) {
      return <SoilMarker />;
    } else {
      return <GeneralMarker />;
    }
  };

  return measurements.map(m => {
    return (
      <Marker
        tracksViewChanges={false}
        icon={require('../../assets/images/icons/generalIcon.svg')}
        centerOffset={{ x: 0, y: 50 }}
        identifier={m.name}
        key={m.id}
        coordinate={{ latitude: m.latitude, longitude: m.longitude }}>
        {iconSelector(m)}
      </Marker>
    );
  });
};

const RunningSurveyPage: FC<IProps> = ({ route }) => {
  const { id } = route.params;
  const survey: any = useSelector((state: RootState) => state.surveys.surveys.find(s => s.id === id));
  const [visibleMeasurementList, setVisibleMeasurementList] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const measurements = useSelector((state: RootState) => state.measurement.measurements.filter(({ survey_id }) => survey_id === survey.id));

  useEffect(() => {
    setExpanded(prev => !prev);
  }, [visibleMeasurementList]);

  const coordinates: any = measurements && measurements.map(({ latitude, longitude }) => ({ latitude, longitude }));

  return (
    <>
      {visibleMeasurementList ? (
        <MeasurementList setVisibleMeasurementList={setVisibleMeasurementList} setExpanded={setExpanded} survey_id={survey?.id} />
      ) : (
        <MapView
          initialRegion={{
            latitude: survey.latitude - 0.007,
            longitude: survey.longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.0121,
          }}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}>
          <Markers measurements={measurements} />
          {measurements.length > 0 && <Polygon strokeWidth={3} strokeColor={Colors.primary_500} coordinates={coordinates} />}
          <Marker coordinate={{ latitude: survey.latitude, longitude: survey.longitude }} />
        </MapView>
      )}
      <Panel expanded={expanded} setExpanded={setExpanded} visibleMeasurementList={visibleMeasurementList} setVisibleMeasurementList={setVisibleMeasurementList} survey={survey} />
    </>
  );
};

export default RunningSurveyPage;
