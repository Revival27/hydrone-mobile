import { t } from 'i18next';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Animated, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

// import { useDispatch } from 'react-redux';
import GeneralIcon from '../../assets/images/icons/generalIcon.svg';
import SoilIcon from '../../assets/images/icons/soilIcon.svg';
import VegetationIcon from '../../assets/images/icons/vegetationIcon.svg';
import WaterIcon from '../../assets/images/icons/waterIcon.svg';
import BlueButton from '../../components/BlueButton/BlueButton';
import { styles } from './style.module';

interface PanelProps {
  children?: React.ReactNode;
  survey?: any;
  setVisibleMeasurementList: Function;
  setExpanded: Function;
  expanded?: boolean;
  visibleMeasurementList?: boolean;
}

interface MeasurementProps {
  children: ReactNode;
  name: string;
  handlePress?: Function;
}

const Measurement: FC<MeasurementProps> = ({ name, children, handlePress }) => {
  return (
    <TouchableOpacity onPress={() => handlePress && handlePress()} style={styles.measurement}>
      {children}
      <Text style={styles.measurementTitle}>{name}</Text>
    </TouchableOpacity>
  );
};

const Panel: FC<PanelProps> = ({ survey, setVisibleMeasurementList, setExpanded, expanded, visibleMeasurementList }) => {
  const [height] = useState(new Animated.Value(100));
  const navigation: any = useNavigation();

  useEffect(() => {
    Animated.timing(height, {
      toValue: !expanded ? 425 : 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [expanded, height]);

  return (
    <TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.dragabblePanel,
          {
            height: height,
          },
        ]}>
        <View onTouchEndCapture={() => setExpanded(!expanded)} hitSlop={{ left: 200, top: 12, right: 200, bottom: 150 }} style={styles.swipeLine} />
        <View style={styles.panelTitleContainer}>
          <Text style={styles.panelTitle}>{survey?.name}</Text>
          <Text style={styles.coords}>
            {survey?.latitude}, {survey?.longitude}
          </Text>
          <View style={styles.dividerLine} />
        </View>
        <Text style={styles.chooseMeasurementText}>Choose Measurement</Text>
        <View style={styles.measurementContainer}>
          <Measurement handlePress={() => navigation.navigate('SoilMeasurementScreen', { id: survey.id, type_id: 1, name: 'Soil composition', surveyId: survey.id })} name="Soil">
            <SoilIcon />
          </Measurement>
          <Measurement handlePress={() => navigation.navigate('WaterMeasurementScreen', { id: survey.id, type_id: 3, name: 'River discharge', surveyId: survey.id })} name="Water">
            <WaterIcon />
          </Measurement>
          <Measurement
            handlePress={() => navigation.navigate('VegetationMeasurementScreen', { id: survey.id, type_id: 2, name: 'Vegetation', surveyId: survey.id })}
            name="Vegetation">
            <VegetationIcon />
          </Measurement>
          <Measurement
            handlePress={() => navigation.navigate('GeneralMeasurementScreen', { id: survey.id, type_id: 5, name: 'General Measurement', surveyId: survey.id })}
            name="General">
            <GeneralIcon />
          </Measurement>
        </View>
        <View style={styles.secondRow}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => setVisibleMeasurementList(value => !value)}>
            <Text style={styles.buttonText}>{visibleMeasurementList ? `${t('survey_measurement.panel.show_map')}` : `${t('survey_measurement.panel.show_history')}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('DJIGoScreen')}>
            <Text style={styles.buttonText}>Fly Drone</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <BlueButton title={'Finish Measurement'} handleClick={() => navigation.goBack()} />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Panel;
