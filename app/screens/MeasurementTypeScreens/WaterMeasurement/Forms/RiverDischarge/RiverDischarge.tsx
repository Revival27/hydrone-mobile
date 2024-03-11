/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';

/* eslint-disable react-native/no-inline-styles */
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { Button } from '@rneui/themed';

import DropDownSelector from '../../../../../components/DropDown/DropDownSelector';
import { Colors } from '../../../../../constants/colors';
import { RootState } from '../../../../../store/store';
import { styles } from './styles.module';
import { validateProps } from '../../../../../tools/checkValidity';

interface IProps {
  waterMeasurement?: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  riverDischarge: { label: string; value: number };
  riverFlow: number | undefined;
  setRiverFlow: React.Dispatch<React.SetStateAction<number | undefined>>;
  setRiverDischarge: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: number;
    }>
  >;
  selectedRiverDischarge: string;
  setSelectedRiverDischarge: React.Dispatch<React.SetStateAction<string>>;
}

interface OptionProps {
  label: string | null;
  value: number | null;
}

const RiverDischarge: FC<IProps> = ({
  setStep,
  riverDischarge,
  setRiverDischarge,
  riverFlow,
  setRiverFlow,
  setSelectedRiverDischarge,
  selectedRiverDischarge,
  waterMeasurement,
}) => {
  const waterDischarges = useSelector((state: RootState) => state.waterMeasurement.waterDischarges);
  const waterDischargeOptions = waterDischarges.map(s => {
    return {
      label: s.name,
      value: s.id,
    };
  });
  const [canGoToNext, setCanGoToNext] = useState<boolean>(false);
  const [optionItems] = useState<OptionProps[] | null>(waterDischargeOptions);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const { t } = useTranslation();

  const getValues = () => {
    //@ts-ignore
    const foundRiverDischarge: any = waterDischargeOptions.find(r => r.value === riverDischarge)?.label;
    setSelectedRiverDischarge(foundRiverDischarge);
  };

  const actualRiverDischarge = riverDischarge ? riverDischarge : waterMeasurement?.water_discharge_id;

  const actualRiverFlow = () => {
    return riverFlow === undefined && waterMeasurement ? waterMeasurement?.water_discharge_speed.toString() : riverFlow?.toString();
  };

  const checker = () => {
    let res;
    if (typeof actualRiverDischarge === 'object') {
      res = Object.values(actualRiverDischarge).map(el => {
        if (el !== 0 && el !== '') {
          return true;
        }
        return false;
      });
      return res[0];
    } else {
      res = validateProps(actualRiverDischarge, actualRiverFlow());
    }
    return res;
  };

  useEffect(() => {
    getValues();
  }, [riverDischarge]);

  useEffect(() => {
    const res = checker();
    setCanGoToNext(res);
  }, [actualRiverDischarge, actualRiverFlow]);

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>{t('survey_measurement.water_flowing')}</Text>

      <LinearGradient useAngle={true} angle={286.17} style={{ borderRadius: 24 }} colors={['#246BFD', '#6F9EFF']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}>
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              keyboardType="numeric"
              maxLength={3}
              placeholder={'0'}
              placeholderTextColor={'#fff'}
              style={styles.inputText}
              value={actualRiverFlow()}
              onChangeText={text => setRiverFlow(Number(text))}
            />
          </View>
          <View style={styles.superScript}>
            <Text style={styles.superText}>m³/s</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.dropdownContainer}>
        <DropDownSelector multiple={false} value={actualRiverDischarge} items={optionItems} setValue={setRiverDischarge} />
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
    </View>
  );
};

export default RiverDischarge;
