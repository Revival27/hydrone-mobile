/* eslint-disable react-native/no-inline-styles */
import { Text, View } from 'react-native';
import React, { FC } from 'react';
import { ScreenWidth, ScreenHeight } from '@rneui/base';
import { RadioButton } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '../../../../../constants/colors';
import { Button } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import GradientText from '../../../../../components/GradientText/GradientText';
import { styles } from './styles.module';
import { RootState } from '../../../../../store/store';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { validateProps } from '../../../../../tools/checkValidity';
interface RadioProps {
  text: string;
  compactChecked: { label: string; value: number };
  setCompactChecked: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: number;
    }>
  >;
}

interface IProps {
  compactChecked: { label: string; value: number };
  setCompactChecked: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: number;
    }>
  >;
  step?: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  soilMeasurement?: any;
}

const SoilCompactness: FC<IProps> = ({ setStep, compactChecked, setCompactChecked, soilMeasurement }) => {
  const { t } = useTranslation();
  const soilTypes = useSelector((state: RootState) => state.soilMeasurement.soilCompactnesses);
  const [canGoToNext, setCanGoToNext] = useState<boolean>(false);

  const soilTypeOptions = soilTypes.map(s => {
    return {
      label: s.name,
      value: s.id,
    };
  });

  const RADIO_BUTTONS: RadioProps[] = soilTypeOptions.map(r => {
    return {
      text: r.label,
      compactChecked: { label: r.label, value: r.value },
      setCompactChecked: () => setCompactChecked({ label: r.label, value: r.value }),
    };
  });

  const actualCompactChecked: string = compactChecked.label || soilMeasurement?.compactness_name;

  useEffect(() => {
    const res = validateProps(actualCompactChecked);
    setCanGoToNext(res);
  }, [actualCompactChecked]);

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{t('survey_measurement.soil_compactness')}</Text>
      <>
        {RADIO_BUTTONS.map((radio, index) => (
          <TouchableOpacity activeOpacity={1} onPress={() => radio.setCompactChecked(radio.compactChecked)} key={radio.text} style={styles.radioContainer}>
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
                value={radio?.compactChecked?.label ? radio.compactChecked.label : actualCompactChecked}
                status={actualCompactChecked === radio.compactChecked.label ? 'checked' : 'unchecked'}
                onPress={() => radio.setCompactChecked(radio.compactChecked)}
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

export default SoilCompactness;
