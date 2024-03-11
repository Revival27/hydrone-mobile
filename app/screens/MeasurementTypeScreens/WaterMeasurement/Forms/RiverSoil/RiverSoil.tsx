import { Text, TextInput, View } from 'react-native';
import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';

/* eslint-disable react-native/no-inline-styles */
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { Button } from '@rneui/themed';
import { useEffect } from 'react';
import { validateProps } from '../../../../../tools/checkValidity';

import { Colors } from '../../../../../constants/colors';
import { styles } from './styles.module';

interface IProps {
  waterMeasurement?: any;
  riverBed?: string;
  setRiverBed: React.Dispatch<React.SetStateAction<string | undefined>>;
  riverWall?: string;
  setRiverWall: React.Dispatch<React.SetStateAction<string | undefined>>;
  riverWallColor?: string;
  setRiverWallColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const RiverSoil: FC<IProps> = ({ riverBed, setRiverBed, riverWall, setRiverWall, riverWallColor, setRiverWallColor, setStep, waterMeasurement }) => {
  const { t } = useTranslation();
  const [canGoToNext, setCanGoToNext] = useState<boolean>(false);

  const actualRiverBedValue = useCallback(() => {
    return riverBed === undefined && waterMeasurement ? waterMeasurement?.river_bed.toString() : String(riverBed);
  }, [riverBed, waterMeasurement]);

  const actualRiverWallValue = useCallback(() => {
    return riverWall === undefined && waterMeasurement ? waterMeasurement?.river_wall.toString() : String(riverWall);
  }, [riverWall, waterMeasurement]);

  const actualRiverWallColorValue = useCallback(() => {
    return riverWallColor === undefined && waterMeasurement ? waterMeasurement?.river_wall_color.toString() : String(riverWallColor);
  }, [riverWallColor, waterMeasurement]);

  useEffect(() => {
    const res = validateProps(actualRiverBedValue(), actualRiverWallValue(), actualRiverWallColorValue());
    setCanGoToNext(res);
  }, [actualRiverBedValue, actualRiverWallValue, actualRiverWallColorValue]);

  return (
    <KeyboardAwareScrollView enableOnAndroid extraHeight={100} keyboardShouldPersistTaps="handled" style={styles.container}>
      <Text style={[styles.inputLabel, { width: ScreenWidth - 40 }]}>{t('survey_measurement.river_bed')}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={t('survey_measurement.river_bed')}
          placeholderTextColor={Colors.grey_500}
          style={styles.inputText}
          value={actualRiverBedValue()}
          onChangeText={text => setRiverBed(text)}
        />
      </View>
      <Text style={[styles.inputLabel, { width: ScreenWidth - 40 }]}>{t('survey_measurement.river_wall')}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={t('survey_measurement.river_wall')}
          placeholderTextColor={Colors.grey_500}
          style={styles.inputText}
          value={actualRiverWallValue()}
          onChangeText={text => setRiverWall(text)}
        />
      </View>
      <Text style={[styles.inputLabel, { width: ScreenWidth - 40 }]}>{t('survey_measurement.river_wall_color')}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={t('survey_measurement.river_wall_color')}
          placeholderTextColor={Colors.grey_500}
          style={styles.inputText}
          value={actualRiverWallColorValue()}
          onChangeText={text => setRiverWallColor(text)}
        />
      </View>
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
    </KeyboardAwareScrollView>
  );
};

export default RiverSoil;
