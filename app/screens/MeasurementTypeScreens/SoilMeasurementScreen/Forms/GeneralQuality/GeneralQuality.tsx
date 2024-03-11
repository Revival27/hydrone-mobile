/* eslint-disable @typescript-eslint/no-unused-vars */
import { t } from 'i18next';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';

/* eslint-disable react-native/no-inline-styles */
import { Slider } from '@miblanchard/react-native-slider';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { Button } from '@rneui/themed';

import { Colors } from '../../../../../constants/colors';
import { styles } from './styles.module';

const ThumbTracker = ({ index, generalQuality }) => {
  return (
    <LinearGradient colors={['#246BFD', '#6F9EFF']} style={styles.linearGradient}>
      <View style={styles.msgContainer}>
        <Text style={styles.msgText}>{`${generalQuality}%`}</Text>
      </View>
    </LinearGradient>
  );
};

const GeneralQuality = ({ generalQuality, setGeneralQuality, setStep, soilMeasurement }) => {
  const qualityChecker = (value: number) => {
    if (value > 100) {
      setGeneralQuality(100);
    } else {
      setGeneralQuality(value);
    }
  };

  const actualGeneralQuality = () => {
    return generalQuality === undefined && soilMeasurement ? soilMeasurement?.general_quality : generalQuality || 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.qualityInput}>
        <TextInput
          keyboardType="numeric"
          placeholder={t('survey_measurement.soil_quality')}
          placeholderTextColor={Colors.grey_500}
          style={styles.inputText}
          defaultValue={String(soilMeasurement?.general_quality)}
          value={String(actualGeneralQuality())}
          onChangeText={text => qualityChecker(Number(text))}
        />
      </View>

      <View style={styles.markers}>
        <Text style={styles.markerText}>0</Text>
        <Text style={styles.markerText}>100</Text>
      </View>
      <Slider
        renderAboveThumbComponent={index => <ThumbTracker generalQuality={actualGeneralQuality()} index={index} />}
        thumbStyle={styles.thumbStyle}
        minimumTrackTintColor={'#6F9EFF'}
        maximumTrackTintColor={Colors.grey_200}
        trackStyle={styles.sliderStyle}
        minimumValue={0}
        maximumValue={100}
        value={actualGeneralQuality()?.toString()}
        onValueChange={value => {
          setGeneralQuality(Math.floor(Number(value)));
        }}
      />

      <View style={styles.btnContainer}>
        <Button
          onPress={() => {
            setStep(prev => prev + 1);
          }}
          containerStyle={{
            height: 58,
            width: ScreenWidth - 40,
            borderRadius: 100,
          }}
          title={t('survey_measurement.finish_btn')}
          buttonStyle={{ backgroundColor: Colors.primary_500, borderRadius: 100, height: '100%' }}
          titleStyle={{ fontSize: RFValue(16, ScreenHeight), fontFamily: 'Urbanist-Bold', color: 'white' }}
        />
      </View>
    </View>
  );
};

export default GeneralQuality;
