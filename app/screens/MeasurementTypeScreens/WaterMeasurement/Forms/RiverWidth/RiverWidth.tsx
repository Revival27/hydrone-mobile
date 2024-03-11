/* eslint-disable react-native/no-inline-styles */
import { Text, TextInput, View } from 'react-native';
import React, { FC, useCallback, useState } from 'react';
import { styles } from './styles.module';
import { useTranslation } from 'react-i18next';
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../../../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '@rneui/themed';
import { ScreenWidth, ScreenHeight } from '@rneui/base';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { validateProps } from '../../../../../tools/checkValidity';

interface IProps {
  waterMeasurement?: any;
  riverWidth: string | undefined;
  setRiverWidth: React.Dispatch<React.SetStateAction<string | undefined>>;
  isWidthEnough: { label: string; value: number };
  setIsWidthEnough: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: number;
    }>
  >;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

interface RadioProps {
  text: string;
  isWidthEnough: { label: string; value: number };
  setIsWidthEnough: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: number;
    }>
  >;
}

const RiverWidth: FC<IProps> = ({ riverWidth, setRiverWidth, setStep, isWidthEnough, setIsWidthEnough, waterMeasurement }) => {
  const { t } = useTranslation();
  const [canGoToNext, setCanGoToNext] = useState<boolean>(false);
  const RADIO_BUTTONS: RadioProps[] = [
    {
      text: t('survey_measurement.water_width_yes'),
      isWidthEnough: { label: 'Yes', value: 1 },
      setIsWidthEnough: () => setIsWidthEnough({ label: 'Yes', value: 1 }),
    },
    {
      text: t('survey_measurement.water_width_no'),
      isWidthEnough: { label: 'No', value: 0 },
      setIsWidthEnough: () => setIsWidthEnough({ label: 'No', value: 0 }),
    },
  ];

  const actualRiverWidthLabel = useCallback(() => {
    if (isWidthEnough.label === '' && waterMeasurement) {
      return waterMeasurement?.river_width_enough === 1 ? 'Yes' : 'No';
    } else {
      return isWidthEnough.label;
    }
  }, [isWidthEnough.label, waterMeasurement]);

  const actualRiverWidth = useCallback(() => {
    return riverWidth === undefined && waterMeasurement ? waterMeasurement?.river_width_length.toString() : riverWidth?.toString();
  }, [riverWidth, waterMeasurement]);

  useEffect(() => {
    const res = validateProps(actualRiverWidthLabel(), actualRiverWidth());
    setCanGoToNext(res);
  }, [actualRiverWidth, actualRiverWidthLabel]);

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{t('survey_measurement.width_construction')}</Text>
      <>
        {RADIO_BUTTONS.map(radio => (
          <TouchableOpacity activeOpacity={1} onPress={() => radio.setIsWidthEnough(radio.isWidthEnough)} key={radio.text} style={styles.radioContainer}>
            <View style={styles.radioTextContainer}>
              <Text style={styles.radioText}>{radio.text}</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton
                uncheckedColor={Colors.primary_500}
                color={Colors.primary_500}
                value={radio.isWidthEnough.label ? radio.isWidthEnough.label : actualRiverWidthLabel()}
                status={actualRiverWidthLabel() === radio.isWidthEnough.label ? 'checked' : 'unchecked'}
                onPress={() => radio.setIsWidthEnough(radio.isWidthEnough)}
              />
            </View>
          </TouchableOpacity>
        ))}
        <LinearGradient useAngle={true} angle={286.17} style={styles.gradientContainer} colors={['#246BFD', '#6F9EFF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}>
          <View style={styles.inputContainer}>
            <View>
              <TextInput
                autoCapitalize="none"
                keyboardType="decimal-pad"
                maxLength={4}
                placeholder={'0'}
                placeholderTextColor={'#fff'}
                style={styles.inputText}
                value={actualRiverWidth()}
                onChangeText={text => setRiverWidth(text)}
              />
            </View>
            <View style={styles.superScript}>
              <Text style={styles.superText}>m</Text>
            </View>
          </View>
        </LinearGradient>
      </>
      <View style={styles.btnContainer}>
        <Button
          disabled={!canGoToNext}
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

export default RiverWidth;
