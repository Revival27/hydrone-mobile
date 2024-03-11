/* eslint-disable react-native/no-inline-styles */
import { Text, View } from 'react-native';
import React, { FC } from 'react';
import { RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Colors } from '../../../../../constants/colors';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button } from '@rneui/themed';
import { styles } from './styles.module';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { validateProps } from '../../../../../tools/checkValidity';
import GradientText from '../../../../../components/GradientText/GradientText';
interface RadioProps {
  text: string;
  soilChecked: {
    label: string;
    value: number;
  };
  soilSetChecked: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: number;
    }>
  >;
}

interface IProps {
  soilChecked: { label: string; value: number | null };
  soilSetChecked: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: number;
    }>
  >;
  step?: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  soilMeasurement?: any;
}

const SoilType: FC<IProps> = ({ soilChecked, soilSetChecked, setStep, soilMeasurement }) => {
  const { t } = useTranslation();
  const [canGoToNext, setCanGoToNext] = useState<boolean>(false);

  const soilTypes = useSelector((state: RootState) => state.soilMeasurement.soilTypes);
  const soilTypeOptions = soilTypes.map(s => {
    return {
      label: s.name,
      value: s.id,
    };
  });

  const RADIO_BUTTONS: RadioProps[] = soilTypeOptions.map(r => {
    return {
      text: r.label,
      soilChecked: { label: r.label, value: r.value },
      soilSetChecked: () => soilSetChecked({ label: r.label, value: r.value }),
    };
  });

  const actualSoilChecked: string = soilChecked.label || soilMeasurement?.type_name;

  useEffect(() => {
    const res = validateProps(actualSoilChecked);
    setCanGoToNext(res);
  }, [actualSoilChecked]);

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{t('survey_measurement.soil_type')}</Text>
      <>
        {RADIO_BUTTONS.map((radio, index) => (
          <TouchableOpacity activeOpacity={1} onPress={() => radio.soilSetChecked(radio.soilChecked)} key={radio.text} style={styles.radioContainer}>
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
                value={radio?.soilChecked?.label ? radio.soilChecked.label : actualSoilChecked}
                status={actualSoilChecked === radio.soilChecked.label ? 'checked' : 'unchecked'}
                onPress={() => radio.soilSetChecked(radio.soilChecked)}
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

export default SoilType;
