import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';

import { dateFormatEnGB } from '../../../tools/dateFormatter';
import { styles } from './styles.module';

interface IProps {
  location: string;
  name: string;
  date: Date;
  time: Date;
  description: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  checkStatus: Function;
}

const Summary: FC<IProps> = ({ location, name, date, time, description, setStep, checkStatus }) => {
  const { t } = useTranslation();
  const latitude = location?.split('-')[0];
  const longitude = location?.split('-')[1];
  const navigation: any = useNavigation();

  const formattedLocation = `${Number(latitude).toFixed(2)} - ${Number(longitude).toFixed(2)}`;
  const properStatus = checkStatus() === 'Finished';

  const descriptionChecker = description.length > 10 ? `${description.substring(0, 15)}...` : description;
  const nameChecker = name.length > 10 ? `${name.substring(0, 15)}...` : name;

  const [hour, minute] = time.toLocaleTimeString().split(':');
  const formattedTime = hour.concat(':').concat(minute);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>{t('survey_measurement.location_title')}</Text>
          <Text style={styles.infoText}>{`${formattedLocation}°`}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>{t('survey_measurement.survey_name')}</Text>
          <Text style={styles.infoText}>{nameChecker}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>{t('survey_measurement.date_title')}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.infoText}>{dateFormatEnGB(date)}</Text>
            <Text style={styles.infoText}>{formattedTime}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>{t('survey_measurement.notes')}</Text>
          <Text style={styles.infoText}>{descriptionChecker}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>{t('survey_measurement.survey_status')}</Text>
          <View style={properStatus ? styles.statusFinishedContainer : styles.statusUnfinishedContainer}>
            <Text style={styles.statusText}>{checkStatus()}</Text>
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Button
          onPress={() => navigation.goBack()}
          containerStyle={styles.btnContainerStyle}
          title="Back to Measurements"
          buttonStyle={styles.backButtonStyle}
          titleStyle={styles.backButtonTitleStyle}
        />
        <Button
          onPress={() => {
            setStep(prev => prev + 1);
          }}
          containerStyle={styles.btnContainerStyle}
          title={t('survey_measurement.show_questionaire')}
          buttonStyle={styles.btnStye}
          titleStyle={styles.btnTitleStyle}
        />
      </View>
    </>
  );
};

export default Summary;
