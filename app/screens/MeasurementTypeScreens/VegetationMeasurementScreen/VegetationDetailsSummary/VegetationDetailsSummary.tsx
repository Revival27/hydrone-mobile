import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Edit, MoreCircle } from 'react-native-iconly';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenHeight } from '@rneui/base';
import { Button } from '@rneui/themed';

import EditPopup from '../../../../components/EditPopup/EditPopup';
import PopupRowElement from '../../../../components/EditPopup/PopupRowElement';
import MeasurementIconSelector from '../../../../components/MeasurementIconselector';
import WarningModal from '../../../../components/WarningModal/WarningModal';
import { Colors } from '../../../../constants/colors';
import { getVegetationMeasurements } from '../../../../data/api/measurements/vegetationMeasurementsService';
import { VegetationMeasurement } from '../../../../data/models/measurements/VegetationMeasurements';
import { deleteMeasurement, initializeMeasurements } from '../../../../store/measurementSlice';
import { RootState } from '../../../../store/store';
import { dateFormatEnGbBackend } from '../../../../tools/dateFormatter';
import { measurementStatusChecker } from '../../../../tools/measurementStatusChecker';
import { measurementTypeGetter } from '../../../../tools/measurementTypeGetter';
import { nameChecker } from '../../../../tools/nameChecker';
import VegetationResults from '../Forms/VegetationResults/VegetationResults';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

type Status = 'Finished' | 'Unfinished';

const VegetationDetailsSummary: FC<IProps> = ({ navigation, route }) => {
  const { id, surveyId } = route.params;
  const { t } = useTranslation();
  const measurement = useSelector((state: RootState) => state.measurement.measurements.find(m => m.id === id));
  const dispatch = useDispatch();
  const [step, setStep] = useState<number>(0);
  const [status, setStatus] = useState<Status>('Unfinished');
  const [vegetationMeasurement, setVegetationMeasurement] = useState<VegetationMeasurement>();
  const formattedLocation = `${Number(measurement?.latitude).toFixed(2)} - ${Number(measurement?.longitude).toFixed(2)}`;
  const properStatus = status === 'Finished';
  const descriptionChecker = measurement && measurement?.description.length > 10 ? `${measurement?.description.substring(0, 15)}...` : measurement?.description;
  const date = measurement?.date;
  const time = measurement?.time;

  const goBack = () => navigation.goBack();
  const navigateToEdit = () => navigation.navigate('VegetationDetailsScreen', { id, surveyId, vegetationId: vegetationMeasurement?.id });

  const loading = useSelector((state: RootState) => state.loading.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [panelVisible, setIsPanelVisible] = useState<boolean>(false);

  const handleDeleteMeasurement = () => {
    try {
      //@ts-ignore
      dispatch(deleteMeasurement(measurement?.id));
      setIsModalVisible(false);
      navigation.navigate('RunningSurveyPage', { id: surveyId });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getMeasurement = async () => {
      const res = await getVegetationMeasurements(id);
      setVegetationMeasurement(res[0]);
    };
    dispatch(initializeMeasurements());
    getMeasurement();
  }, [id, dispatch]);

  useEffect(() => {
    if (vegetationMeasurement) {
      if (
        measurementStatusChecker(
          //@ts-ignore
          measurement?.name,
          measurement?.description,
          measurement?.date,
          measurement?.time,
          measurement?.latitude,
          measurement?.longitude,
          vegetationMeasurement?.description,
          vegetationMeasurement?.foliage,
          vegetationMeasurement?.replantation,
          vegetationMeasurement?.undergrowth,
          vegetationMeasurement?.wildlife,
        )
      ) {
        setStatus('Finished');
      } else {
        setStatus('Unfinished');
      }
    }
  }, [vegetationMeasurement, measurement]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>{t('survey_measurement.location_title')}</Text>
                <Text style={styles.infoText}>{`${formattedLocation}°`}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>{t('survey_measurement.survey_name')}</Text>
                <Text style={styles.infoText}>{nameChecker(measurement?.name)}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>{t('survey_measurement.date_title')}</Text>
                <View style={styles.dateContainer}>
                  <Text style={styles.infoText}>{dateFormatEnGbBackend(date)}</Text>
                  <Text style={styles.infoText}>{time}</Text>
                </View>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>{t('survey_measurement.notes')}</Text>
                <Text style={styles.infoText}>{descriptionChecker}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>{t('survey_measurement.survey_status')}</Text>
                <View style={properStatus ? styles.statusFinishedContainer : styles.statusUnfinishedContainer}>
                  <Text style={styles.statusText}>{status}</Text>
                </View>
              </View>
            </View>
            <View style={styles.btnContainer}>
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
          </View>
        );
      case 1:
        return (
          <VegetationResults
            galleryImages={measurement?.images}
            videos={measurement?.videos}
            wildlife={vegetationMeasurement?.wildlife}
            foliage={vegetationMeasurement?.foliage}
            undergrowth={vegetationMeasurement?.undergrowth}
            additionalNotes={vegetationMeasurement?.description}
            replantation={vegetationMeasurement?.replantation}
            goBack={goBack}
            navigateToEdit={navigateToEdit}
          />
        );
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity activeOpacity={1} style={styles.goBackArrow}>
          <View style={styles.backArrowContainer}>
            <ArrowLeft
              onPress={() => {
                if (step === 0) {
                  navigation.goBack();
                } else {
                  setStep(prev => prev - 1);
                }
              }}
              color={Colors.grey_900}
            />
            <Text style={styles.backArrowText}>{nameChecker(measurement?.name)}</Text>
            <View style={styles.rightHeader}>
              <MoreCircle set="light" primaryColor={Colors.grey_900} onPress={() => setIsPanelVisible(true)} />
            </View>
          </View>
        </TouchableOpacity>
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
          <View style={styles.measurementContainer}>
            <MeasurementIconSelector measurement={measurement} height={100} width={100} />
            <Text style={styles.measurementName}>{measurementTypeGetter(measurement?.measurement_type_slug)}</Text>
          </View>
          <View style={styles.lineStyle} />

          {renderStep()}
        </ScrollView>
      </View>
      <EditPopup height={ScreenHeight / 3.5} handlePress={() => setIsModalVisible(true)} title={'Edit Measurement'} isVisible={panelVisible} setIsVisible={setIsPanelVisible}>
        <PopupRowElement
          handlePress={() => {
            setIsPanelVisible(false);
            navigateToEdit();
          }}>
          <Edit color={Colors.grey_900} />
          <Text style={styles.rowElementText}>Edit</Text>
        </PopupRowElement>
      </EditPopup>
      <WarningModal
        setIsLoading={loading}
        cancel={() => setIsModalVisible(false)}
        removeFunction={handleDeleteMeasurement}
        isVisible={isModalVisible}
        header={t('survey_measurement.delete_measurement')}
        description={t('survey_measurement.delete_measurement_confirm')}
        buttonText={'Delete'}
      />
    </>
  );
};

export default VegetationDetailsSummary;
