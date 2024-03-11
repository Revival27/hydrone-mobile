/* eslint-disable react-native/no-inline-styles */
import { Text, View } from 'react-native';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../../../../constants/colors';
import GradientText from '../../../../../components/GradientText/GradientText';
import { Button } from '@rneui/themed';
import { styles } from './styles.module';
import { RFValue } from 'react-native-responsive-fontsize';
import { ScreenWidth, ScreenHeight } from '@rneui/base';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { validateProps } from '../../../../../tools/checkValidity';
import { useState } from 'react';

interface RadioProps {
  text: string;
  waterLevelChecked: { label: string; value: number };
  setWaterLevelValue?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setWaterLevelChecked: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: number;
    }>
  >;
}

interface IProps {
  waterMeasurement?: any;
  waterLevelChecked: { label: string; value: number };
  setWaterLevelValue?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setWaterLevelChecked: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: number;
    }>
  >;
  step?: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const WaterLevel: FC<IProps> = ({ waterLevelChecked, setWaterLevelChecked, setStep, waterMeasurement, setWaterLevelValue }) => {
  const { t } = useTranslation();
  const waterLevels = useSelector((state: RootState) => state.waterMeasurement.waterLevels);
  const [canGoToNext, setCanGoToNext] = useState<boolean>(false);

  const waterLevelOptions = waterLevels.map(s => {
    return {
      label: s.name,
      value: s.id,
    };
  });

  const RADIO_BUTTONS: RadioProps[] = waterLevelOptions.map(r => {
    return {
      text: r.label,
      waterLevelChecked: { label: r.label, value: r.value },
      setWaterLevelChecked: () => setWaterLevelChecked({ label: r.label, value: r.value }),
      setWaterLevelValue: () => setWaterLevelValue?.(r.value),
    };
  });

  const actualWaterLevelValue: string = waterLevelChecked.label || waterMeasurement?.water_level_name;

  useEffect(() => {
    const res = validateProps(actualWaterLevelValue);
    setCanGoToNext(res);
  }, [actualWaterLevelValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{t('survey_measurement.water_level')}</Text>
      <>
        {RADIO_BUTTONS.map((radio, index) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              radio.setWaterLevelChecked(radio.waterLevelChecked);
              setWaterLevelValue?.(radio.waterLevelChecked.value);
            }}
            key={radio.text}
            style={styles.radioContainer}>
            <View style={styles.radioTextContainer}>
              <GradientText colors={['#6F9EFF', '#246BFD']} style={styles.indexText}>
                {index + 1}
              </GradientText>

              <Text style={styles.radioText}>{radio.text}</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton
                uncheckedColor={Colors.primary_500}
                color={Colors.primary_500}
                value={radio?.waterLevelChecked?.label ? radio.waterLevelChecked.label : actualWaterLevelValue}
                status={actualWaterLevelValue === radio.waterLevelChecked.label ? 'checked' : 'unchecked'}
                onPress={() => {
                  radio.setWaterLevelChecked(radio.waterLevelChecked);
                  setWaterLevelValue?.(radio.waterLevelChecked.value);
                }}
              />
            </View>
          </TouchableOpacity>
        ))}
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

export default WaterLevel;
