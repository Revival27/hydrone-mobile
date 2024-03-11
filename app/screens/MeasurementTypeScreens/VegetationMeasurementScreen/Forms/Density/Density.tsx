/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Text, View } from 'react-native';
import React, { FC } from 'react';
import { styles } from './styles.module';
import { useTranslation } from 'react-i18next';
import { ScreenWidth, ScreenHeight } from '@rneui/base';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../../../../constants/colors';
import { Button } from '@rneui/themed';
import { Slider } from '@miblanchard/react-native-slider';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  vegetationMeasurement?: any;
  foliage: number;
  setFoliage: React.Dispatch<React.SetStateAction<number>>;
  undergrowth: number;
  setUndergrowth: React.Dispatch<React.SetStateAction<number>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const ThumbTracker = ({ index, foliage }) => {
  const checkValue = () => {
    switch (foliage) {
      case 1:
        return 'very rare';
      case 2:
        return 'rare';
      case 3:
        return 'moderate';
      case 4:
        return 'dense';
      case 5:
        return 'very dense';
      default:
        return 'very rare';
    }
  };
  return (
    <LinearGradient colors={['#246BFD', '#6F9EFF']} style={styles.linearGradient}>
      <View style={styles.msgContainer}>
        <Text style={styles.msgText}>{checkValue()}</Text>
      </View>
    </LinearGradient>
  );
};
const ThumbTracker2 = ({ index, undergrowth }) => {
  const checkValue = () => {
    switch (undergrowth) {
      case 1:
        return 'very rare';
      case 2:
        return 'rare';
      case 3:
        return 'moderate';
      case 4:
        return 'dense';
      case 5:
        return 'very dense';
      default:
        return 'very rare';
    }
  };
  return (
    <LinearGradient colors={['#246BFD', '#6F9EFF']} style={styles.linearGradient}>
      <View style={styles.msgContainer}>
        <Text style={styles.msgText}>{checkValue()}</Text>
      </View>
    </LinearGradient>
  );
};

const Density: FC<IProps> = ({ foliage, setFoliage, undergrowth, setUndergrowth, setStep, vegetationMeasurement }) => {
  const { t } = useTranslation();
  const actualFoliageValue = foliage ? foliage : vegetationMeasurement?.foliage || 0;
  const actualUnderGrowthValue = undergrowth ? undergrowth : vegetationMeasurement?.undergrowth || 0;

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{t('survey_measurement.foliage_density')}</Text>

      <View style={styles.slides}>
        <View style={styles.sliderContainer}>
          <View style={styles.markers}>
            <Text style={styles.markerText}>1</Text>
            <Text style={styles.markerText}>5</Text>
          </View>
          <Slider
            animateTransitions={true}
            animationType="spring"
            renderAboveThumbComponent={index => <ThumbTracker foliage={actualFoliageValue} index={index} />}
            thumbStyle={styles.thumbStyle}
            minimumTrackTintColor={'#6F9EFF'}
            maximumTrackTintColor={Colors.grey_200}
            trackStyle={styles.sliderStyle}
            step={1}
            minimumValue={1}
            maximumValue={5}
            value={actualFoliageValue}
            onValueChange={value => {
              setFoliage(Math.floor(Number(value)));
            }}
          />
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.mainTitle}>{t('survey_measurement.undergrowth_density')}</Text>
          <View style={styles.markers}>
            <Text style={styles.markerText}>1</Text>
            <Text style={styles.markerText}>5</Text>
          </View>
          <Slider
            step={1}
            animateTransitions={true}
            animationType="spring"
            renderAboveThumbComponent={index => <ThumbTracker2 undergrowth={actualUnderGrowthValue} index={index} />}
            thumbStyle={styles.thumbStyle}
            minimumTrackTintColor={'#6F9EFF'}
            maximumTrackTintColor={Colors.grey_200}
            trackStyle={styles.sliderStyle}
            minimumValue={1}
            maximumValue={5}
            value={actualUnderGrowthValue}
            onValueChange={value => {
              setUndergrowth(Math.floor(Number(value)));
            }}
          />
        </View>
      </View>

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
          title={t('survey_measurement.next_btn')}
          buttonStyle={{ backgroundColor: Colors.primary_500, borderRadius: 100, height: '100%' }}
          titleStyle={{ fontSize: RFValue(16, ScreenHeight), fontFamily: 'Urbanist-Bold', color: 'white' }}
        />
      </View>
    </View>
  );
};

export default Density;
