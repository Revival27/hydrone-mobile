/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';

/* eslint-disable react-hooks/exhaustive-deps */
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { Button } from '@rneui/themed';

import DropDownSelector from '../../../../../components/DropDown/DropDownSelector';
import { Colors } from '../../../../../constants/colors';
import { RootState } from '../../../../../store/store';
import { styles } from './styles.module';
import { validateProps } from '../../../../../tools/checkValidity';

interface OptionProps {
  label: string | null;
  value: number | null;
}

const SoilComposition = ({
  setStep,
  surfaceValue,
  setSurfaceValue,
  deepHalfValue,
  setDeepHalfValue,
  deepValue,
  setDeepValue,
  setSelectedSurfaceValues,
  selectedSurfaceValues,
  soilMeasurement,
}) => {
  const { t } = useTranslation();
  const soilCompositions = useSelector((state: RootState) => state.soilMeasurement.soilCompositions);
  const [canGoToNext, setCanGoToNext] = useState<boolean>(false);

  const soilCompositionOptions = soilCompositions.map(s => {
    return {
      label: s.name,
      value: s.id,
    };
  });

  const [deepItems] = useState<OptionProps[] | null>(soilCompositionOptions);

  const getValues = () => {
    const foundSurfaceLabel = soilCompositionOptions.find(v => v.value === surfaceValue)?.label;
    const foundDeepHalfLabel = soilCompositionOptions.find(v => v.value === deepHalfValue)?.label;
    const foundDeepLabel = soilCompositionOptions.find(v => v.value === deepValue)?.label;
    setSelectedSurfaceValues({ ...selectedSurfaceValues, selectedSurface: foundSurfaceLabel, selectedDeepHalf: foundDeepHalfLabel, selectedDeep: foundDeepLabel });
  };

  const actualSurfaceValue = surfaceValue ? surfaceValue : soilMeasurement?.composition_surface_id;
  const actualDeepHalfValue = deepHalfValue ? deepHalfValue : soilMeasurement?.composition_half_meter_id;
  const actualDeepValue = deepValue ? deepValue : soilMeasurement?.composition_one_meter_id;

  useEffect(() => {
    getValues();
  }, [surfaceValue, deepValue, deepHalfValue]);

  useEffect(() => {
    const res = validateProps(actualDeepHalfValue, actualDeepValue, actualSurfaceValue);
    setCanGoToNext(res);
  }, [actualDeepHalfValue, actualDeepValue, actualSurfaceValue]);

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.inputLabel, { width: ScreenWidth - 40, paddingBottom: 20 }]}>{t('survey_measurement.surface')}</Text>
      <View style={[styles.dropdownContainer, { zIndex: 15 }]}>
        <DropDownSelector searchable={false} multiple={false} value={actualSurfaceValue} items={deepItems} setValue={setSurfaceValue} />
      </View>

      <Text style={[styles.inputLabel, { width: ScreenWidth - 40, paddingBottom: 20 }]}>{t('survey_measurement.0.5m')}</Text>
      <View style={[styles.dropdownContainer, { zIndex: 10 }]}>
        <DropDownSelector searchable={false} multiple={false} value={actualDeepHalfValue} items={deepItems} setValue={setDeepHalfValue} />
      </View>

      <Text style={[styles.inputLabel, { width: ScreenWidth - 40, paddingBottom: 20 }]}>{t('survey_measurement.1m')}</Text>
      <View style={[styles.dropdownContainer, { zIndex: 1 }]}>
        <DropDownSelector searchable={false} multiple={false} value={actualDeepValue} items={deepItems} setValue={setDeepValue} />
      </View>

      <View style={styles.btnContainer}>
        <Button
          disabled={!canGoToNext}
          containerStyle={{
            height: 58,
            width: ScreenWidth - 40,
            borderRadius: 100,
          }}
          onPress={() => setStep(prev => prev + 1)}
          title={t('survey_measurement.next_btn')}
          buttonStyle={{ backgroundColor: Colors.primary_500, borderRadius: 100, height: '100%' }}
          titleStyle={{ fontSize: RFValue(16, ScreenHeight), fontFamily: 'Urbanist-Bold', color: 'white' }}
        />
      </View>
    </View>
  );
};

export default SoilComposition;
