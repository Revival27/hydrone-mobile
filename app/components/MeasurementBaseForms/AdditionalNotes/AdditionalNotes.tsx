/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { t } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';

/* eslint-disable @typescript-eslint/no-use-before-define */
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { Button } from '@rneui/themed';

import { Colors } from '../../../constants/colors';
import CustomTextArea from '../../CustomTextArea';

const AdditionalNotes = ({ additionalNotes, setAdditionalNotes, step, setStep, handleAddMeasurement, navigateToMeasurements, measurement }) => {
  const { t } = useTranslation();
  const actualAdditionalNotes = () => {
    return additionalNotes === undefined && measurement ? measurement?.description : additionalNotes;
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid keyboardShouldPersistTaps="handled">
      <Text style={[styles.inputLabel, { width: ScreenWidth - 40 }]}>{t('survey_measurement.notes')}</Text>
      <View>
        <CustomTextArea
          backgroundColor={Colors.grey_100}
          placeholder={t('survey_measurement.notes')}
          placeholderTextColor={Colors.grey_500}
          value={actualAdditionalNotes()}
          onChangeText={text => setAdditionalNotes(text)}
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          onPress={() => {
            if (handleAddMeasurement) {
              handleAddMeasurement();
            }
            if (navigateToMeasurements) {
              navigateToMeasurements();
            } else {
              setStep((prev: number) => prev + 1);
            }
          }}
          containerStyle={{
            height: 58,
            width: ScreenWidth - 40,
            borderRadius: 100,
          }}
          title={t('survey_measurement.complete')}
          buttonStyle={{ backgroundColor: Colors.primary_500, borderRadius: 100, height: '100%' }}
          titleStyle={{ fontSize: RFValue(16, ScreenHeight), fontFamily: 'Urbanist-Bold', color: 'white' }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AdditionalNotes;

const styles = StyleSheet.create({
  inputLabel: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(18, ScreenHeight),
    color: Colors.grey_900,
  },
  btnContainer: {
    alignItems: 'center',
    height: ScreenHeight / 4.5,
    justifyContent: 'flex-end',
    paddingBottom: 25,
  },
});
