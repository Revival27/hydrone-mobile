/* eslint-disable react-native/no-inline-styles */
import { Text, View } from 'react-native';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ScreenWidth, ScreenHeight } from '@rneui/base';
import { RadioButton } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { styles } from './styles.module';
import { Button } from '@rneui/themed';
import { Colors } from '../../../../../constants/colors';
import { TouchableOpacity } from 'react-native';

interface RadioProps {
  text: string;
  replantation: { label: string; value: number };
  setReplantation: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: number;
    }>
  >;
}

interface IProps {
  vegetationMeasurement?: any;
  replantation: { label: string; value: number };
  setReplantation: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: number;
    }>
  >;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Replantation: FC<IProps> = ({ replantation, setReplantation, setStep, vegetationMeasurement }) => {
  const { t } = useTranslation();

  const RADIO_BUTTONS: RadioProps[] = [
    {
      text: t('survey_measurement.water_width_yes'),
      replantation: { label: 'Yes', value: 1 },
      setReplantation: () => setReplantation({ label: 'Yes', value: 1 }),
    },
    {
      text: t('survey_measurement.water_width_no'),
      replantation: { label: 'No', value: 0 },
      setReplantation: () => setReplantation({ label: 'No', value: 0 }),
    },
  ];
  const actualReplantationValue: string = replantation.label || (vegetationMeasurement?.replantation === 1 ? 'Yes' : 'No') || 'Yes';

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{t('survey_measurement.width_construction')}</Text>
      <>
        {RADIO_BUTTONS.map(radio => (
          <TouchableOpacity activeOpacity={1} onPress={() => radio.setReplantation(radio.replantation)} key={radio.text} style={styles.radioContainer}>
            <View style={styles.radioTextContainer}>
              <Text style={styles.radioText}>{radio.text}</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton
                uncheckedColor={Colors.primary_500}
                color={Colors.primary_500}
                value={radio.replantation.label ? radio.replantation.label : actualReplantationValue}
                status={actualReplantationValue === radio.replantation.label ? 'checked' : 'unchecked'}
                onPress={() => radio.setReplantation(radio.replantation)}
              />
            </View>
          </TouchableOpacity>
        ))}
      </>
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

export default Replantation;
