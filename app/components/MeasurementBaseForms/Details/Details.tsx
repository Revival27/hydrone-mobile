/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import GetLocation from 'react-native-get-location';
import { Calendar, TimeCircle } from 'react-native-iconly';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { Button } from '@rneui/themed';

import { Colors } from '../../../constants/colors';
import { RootState } from '../../../store/store';
import { dateFormatEnGB } from '../../../tools/dateFormatter';
import { hasAndroidPermission } from '../../../tools/PermissionRequests/Permissions';
import CustomTextArea from '../../CustomTextArea';

interface IProps {
  measurement_id?: number;
  fromEdit?: boolean;
  name: string;
  description: string;
  location: string;
  setDescription: any;
  step?: number;
  setStep?: any;
  setName: any;
  setLocation: any;
  date: Date;
  setDate: any;
  openDate: any;
  setOpenDate: any;
  time: any;
  setTime: any;
  openTime: any;
  setOpenTime: any;
  handleAddMeasurement?: any;
  singleStep?: boolean;
  noButtons?: boolean;
}

const Details: FC<IProps> = ({
  name,
  description,
  location,
  setDescription,
  setName,
  setLocation,
  date,
  setDate,
  openDate,
  setOpenDate,
  time,
  setTime,
  openTime,
  setOpenTime,
  step,
  setStep,
  handleAddMeasurement,
  noButtons,
  singleStep,
  measurement_id,
  fromEdit,
}) => {
  const { t } = useTranslation();
  const [saveButtonTouched, setSaveButtonTouched] = useState(false);
  const today = new Date();

  const minDate = new Date('2000-01-01');

  const loading = useSelector((state: RootState) => state.loading.loading);

  const checkDetails = (): boolean => {
    if ((saveButtonTouched && name && description && location && date && time) || fromEdit) {
      return false;
    }
    return true;
  };

  const checkSaveButtonAvailability = (): boolean => {
    if ((name && description && location && date && time) || fromEdit) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const getCurrentLocation = async () => {
      if (!fromEdit) {
        if (await hasAndroidPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
          const { latitude, longitude }: any = await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
          });
          setLocation(String(`${latitude} - ${longitude}`));
        }
      }
    };
    getCurrentLocation();
  }, []);

  return (
    <View>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid extraScrollHeight={10} snapToStart>
        <Text style={[styles.inputLabel, { width: ScreenWidth - 40 }]}>{t('survey_measurement.survey_name')}</Text>
        <View style={styles.locationInput}>
          <TextInput
            maxLength={25}
            placeholder={t('survey_measurement.survey_name')}
            placeholderTextColor={Colors.grey_500}
            style={styles.inputText}
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <Text style={[styles.inputLabel, { width: ScreenWidth - 40 }]}>{t('survey_measurement.location_title')}</Text>
        <View style={styles.locationInput}>
          <TextInput
            placeholder={t('survey_measurement.location_title')}
            placeholderTextColor={Colors.grey_500}
            style={styles.inputText}
            value={String(location)}
            onChangeText={text => setLocation(text)}
          />
        </View>

        <View style={styles.date}>
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Text style={styles.inputLabel}>{t('survey_measurement.date_title')}</Text>
            <TouchableOpacity
              onPress={() => {
                setOpenDate(true);
              }}
              style={[styles.locationInput, { width: ScreenWidth / 2 - 30 }]}>
              <TextInput
                editable={false}
                placeholder={t('survey_measurement.date_title')}
                placeholderTextColor={Colors.grey_500}
                style={styles.inputText}
                value={dateFormatEnGB(date)}
              />
              <Calendar
                onPress={() => {
                  setOpenDate(true);
                }}
                set="bold"
                primaryColor="#9E9E9E"
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingLeft: 30, paddingRight: 10 }}>
            <Text style={styles.inputLabel}>{t('survey_measurement.date_time')}</Text>
            <TouchableOpacity
              onPress={() => {
                setOpenTime(true);
              }}
              style={[styles.locationInput, { width: ScreenWidth / 2 - 30 }]}>
              <TextInput
                editable={false}
                placeholder={t('survey_measurement.date_time')}
                placeholderTextColor={Colors.grey_500}
                style={styles.inputText}
                value={time.toString().split(' ')[4].substring(0, 5)}
              />
              <TimeCircle
                onPress={() => {
                  setOpenTime(true);
                }}
                set="bold"
                primaryColor="#9E9E9E"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <DatePicker
            modal
            open={openDate}
            date={date}
            mode="date"
            theme="light"
            minimumDate={minDate}
            maximumDate={today}
            onConfirm={date => {
              setOpenDate(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />
        </View>
        <View>
          <DatePicker
            modal
            open={openTime}
            theme="light"
            date={time}
            mode="time"
            onConfirm={time => {
              setOpenTime(false);
              setTime(time);
            }}
            onCancel={() => {
              setOpenTime(false);
            }}
          />
        </View>

        <View>
          <Text style={styles.inputLabel}>{t('survey_measurement.notes')}</Text>

          <CustomTextArea
            backgroundColor={Colors.grey_100}
            placeholder={t('survey_measurement.notes')}
            placeholderTextColor={Colors.grey_500}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
        {noButtons ? null : (
          <View style={styles.btnSeparator}>
            <View style={[styles.btnContainer, { marginRight: 10 }]}>
              <Button
                disabled={checkSaveButtonAvailability()}
                loading={loading}
                onPress={() => {
                  if (handleAddMeasurement) {
                    handleAddMeasurement();
                    setSaveButtonTouched(true);
                  }
                }}
                containerStyle={{
                  height: 45,
                  width: ScreenWidth / 2 - 60,
                  borderRadius: 100,
                }}
                title={t('survey_measurement.save_btn')}
                buttonStyle={{ backgroundColor: Colors.primary_500, borderRadius: 100, height: '100%' }}
                titleStyle={{ fontSize: RFValue(16, ScreenHeight), fontFamily: 'Urbanist-Bold', color: 'white' }}
              />
            </View>
            <View style={[styles.btnContainer, { marginLeft: 10 }]}>
              <Button
                disabled={checkDetails()}
                onPress={() => {
                  setStep(prev => prev + 1);
                }}
                containerStyle={{
                  height: 45,
                  width: ScreenWidth / 2,
                  borderRadius: 100,
                  borderColor: checkDetails() === false ? Colors.primary_500 : 'transparent',
                  borderWidth: 2,
                }}
                title={fromEdit ? t('survey_measurement.edit_questionnaire') : t('survey_measurement.start_question')}
                buttonStyle={{ backgroundColor: 'white', borderRadius: 100, height: '100%' }}
                titleStyle={{ fontSize: RFValue(16, ScreenHeight), fontFamily: 'Urbanist-Bold', color: Colors.primary_500 }}
              />
            </View>
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  inputText: {
    fontSize: RFValue(14, ScreenHeight),
    width: '90%',
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
  },
  inputLabel: {
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(16, ScreenHeight),
    color: Colors.grey_900,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: ScreenWidth - 40,
    height: 60,
    borderRadius: 12,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.grey_50,
    borderColor: Colors.grey_100,
    borderWidth: 1,
    color: Colors.grey_500,
    marginTop: 20,
    marginBottom: 20,
  },
  btnContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: ScreenWidth - 40,
  },
  btnSeparator: {
    flexDirection: 'row',
  },
});
