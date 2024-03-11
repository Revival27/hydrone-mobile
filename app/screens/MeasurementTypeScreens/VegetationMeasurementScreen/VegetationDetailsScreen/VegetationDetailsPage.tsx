/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, MoreCircle } from 'react-native-iconly';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

import LoadingSpinner from '../../../../components/LoadingSpinner';
import AdditionalNotes from '../../../../components/MeasurementBaseForms/AdditionalNotes/AdditionalNotes';
import Details from '../../../../components/MeasurementBaseForms/Details/Details';
import Images from '../../../../components/MeasurementBaseForms/Images/Images';
import Summary from '../../../../components/MeasurementBaseForms/Summary/Summary';
import Videos from '../../../../components/MeasurementBaseForms/Videos/Videos';
import MeasurementIconSelector from '../../../../components/MeasurementIconselector';
import WarningModal from '../../../../components/WarningModal/WarningModal';
import { Colors } from '../../../../constants/colors';
import { getVegetationMeasurements } from '../../../../data/api/measurements/vegetationMeasurementsService';
import { VegetationMeasurement } from '../../../../data/models/measurements/VegetationMeasurements';
import { useBackHandler } from '../../../../hooks/useBackHandler';
import { deleteMeasurement, editMeasurement, initializeMeasurements } from '../../../../store/measurementSlice';
import { RootState } from '../../../../store/store';
import { addVegetation, editVegetation } from '../../../../store/vegetationSlice';
import { formatDate, formatDateFromBackend, formatTime } from '../../../../tools/dateFormatter';
import { makeSteppersV2 } from '../../../../tools/makeSteppers';
import Density from '../Forms/Density/Density';
import Replantation from '../Forms/Replantation/Replantation';
import VegetationResults from '../Forms/VegetationResults/VegetationResults';
import VegetationWildlife from '../Forms/VegetationWildlife/VegetationWildlife';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

interface Location {
  latitude: string;
  longitude: string;
}

type Status = 'Finished' | 'Unfinished';

const VegetationDetailsPage: FC<IProps> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { id: measurementId, vegetationId, name: type_name, type_id, surveyId } = route.params;
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const measurement: any = useSelector((state: RootState) => state.measurement.measurements.find(m => m.id === measurementId));
  const properDate = formatDateFromBackend(measurement?.date);
  const [vegetationMeasurement, setVegetationMeasurement] = useState<VegetationMeasurement>();
  const [vegId, setVegId] = useState<number>();
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);

  useBackHandler(() => {
    if (true) {
      setIsExitModalVisible(true);
      return true;
    }
  });

  // General States

  const scrollRef = useRef(null);
  const [step, setStep] = useState(0);
  const [mesId, setMesId] = useState<number>();

  // Details States

  const [name, setName] = useState<string>(measurement?.name);
  const [location, setLocation] = useState<any>(`${measurement?.latitude} - ${measurement?.longitude}`);
  const [description, setDescription] = useState<string>(measurement?.description);
  const [date, setDate] = useState(properDate);
  const [time, setTime] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  // Image States

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<any>([...measurement?.images]);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [geoLocation, setGeoLocation] = useState<any>([]);
  const [orientation, setOrientation] = useState();
  const openGallery = () => setIsModalOpen(true);
  const closeGallery = () => setIsModalOpen(false);

  // Video States

  const [videos, setVideos] = useState<any>([]);

  // Density States

  const [foliage, setFoliage] = useState<any>(vegetationMeasurement?.foliage);
  const [undergrowth, setUndergrowth] = useState<any>(measurement?.undergrowth);

  // VegetationWildlife States

  const [wildlife, setWildlife] = useState<any>(measurement?.wildlife);

  // Replantation States

  const [replantation, setReplantation] = useState<any>({ label: '', value: 0 });

  // AdditionalNotes States

  const [additionalNotes, setAdditionalNotes] = useState<string | undefined>(vegetationMeasurement?.description);

  useEffect(() => {
    const getMeasurement = async () => {
      const res = await getVegetationMeasurements(measurementId);
      setVegetationMeasurement(res[0]);
    };
    dispatch(initializeMeasurements());
    getMeasurement();
  }, [measurementId, dispatch]);

  const handleMeasurementTitle = () => {
    switch (step) {
      case 0:
        return 'Vegetation measurement';

      case 1:
        return 'Photos';

      case 2:
        return 'Video';

      case 3:
        return 'Vegetation density';

      case 4:
        return 'Wildlife';

      case 5:
        return 'Replantation';

      case 6:
        return 'Additional notes';
    }
  };

  const goBack = () => navigation.goBack();
  const navigateToMeasurements = () => navigation.navigate('RunningSurveyPage', { id: surveyId });

  const getVegetationId = data => {
    setVegId(data.id);
    return data;
  };

  const handleEditMeasurement = () => {
    const latitude = location.split('-')[0];
    const longitude = location.split('-')[1];
    const measurementObj = {
      ...measurement,
      description,
      name,
      latitude,
      longitude,
      date: formatDate(date),
      time: formatTime(time),
    };
    dispatch(editMeasurement({ id: measurementId, data: measurementObj }));
  };

  const handleEditVegetationMeasurement = () => {
    const vegetationMes = {
      ...vegetationMeasurement,
      measurement_id: measurementId,
      foliage: foliage ? foliage : vegetationMeasurement?.foliage,
      undergrowth: undergrowth ? undergrowth : vegetationMeasurement?.undergrowth,
      wildlife: wildlife ? wildlife : vegetationMeasurement?.wildlife,
      replantation: replantation ? replantation?.value : vegetationMeasurement?.replantation,
      description: additionalNotes ? additionalNotes : vegetationMeasurement?.description,
    };
    try {
      if (vegetationId) {
        dispatch(editVegetation({ vegetationId, data: vegetationMes }));
      } else {
        dispatch(addVegetation(vegetationMes, measurementId, getVegetationId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMeasurement = () => {
    try {
      dispatch(deleteMeasurement(measurementId, () => {}));
      navigation.navigate('RunningSurveyPage', { id: surveyId });
    } catch (err) {
      console.error(err);
    }
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <Details
            fromEdit={true}
            handleAddMeasurement={handleEditMeasurement}
            name={name}
            setName={setName}
            location={location}
            setLocation={setLocation}
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
            openDate={openDate}
            setOpenDate={setOpenDate}
            openTime={openTime}
            setOpenTime={setOpenTime}
            time={time}
            setTime={setTime}
            step={step}
            setStep={setStep}
          />
        );
      case 1:
        return (
          <Images
            measurement_id={measurement?.id}
            id={measurement?.id}
            geoLocation={geoLocation}
            setGeoLocation={setGeoLocation}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            openGallery={openGallery}
            closeGallery={closeGallery}
            galleryImages={galleryImages}
            setGalleryImages={setGalleryImages}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
            setOrientation={setOrientation}
            step={step}
            setStep={setStep}
          />
        );
      case 2:
        return <Videos measurement_id={measurement?.id} videos={videos} setVideos={setVideos} setStep={setStep} step={step} />;

      case 3:
        return (
          <Density
            vegetationMeasurement={vegetationMeasurement}
            foliage={foliage}
            setFoliage={setFoliage}
            setStep={setStep}
            undergrowth={undergrowth}
            setUndergrowth={setUndergrowth}
          />
        );

      case 4:
        return <VegetationWildlife vegetationMeasurement={vegetationMeasurement} wildlife={wildlife} setWildlife={setWildlife} setStep={setStep} />;

      case 5:
        return <Replantation vegetationMeasurement={vegetationMeasurement} replantation={replantation} setReplantation={setReplantation} setStep={setStep} />;

      case 6:
        return (
          <AdditionalNotes
            additionalNotes={additionalNotes}
            setAdditionalNotes={setAdditionalNotes}
            step={step}
            setStep={setStep}
            handleAddMeasurement={handleEditVegetationMeasurement}
            navigateToMeasurements={navigateToMeasurements}
            measurement={vegetationMeasurement}
          />
        );
      case 7:
        //@ts-ignore
        return <Summary location={location} name={name} date={date} time={time} description={description} setStep={setStep} />;

      case 8:
        return (
          <VegetationResults
            galleryImages={galleryImages}
            videos={videos}
            foliage={foliage}
            undergrowth={undergrowth}
            wildlife={wildlife}
            additionalNotes={additionalNotes}
            replantation={replantation}
            goBack={goBack}
            navigateToEdit={navigateToMeasurements}
          />
        );
    }
  };

  useEffect(() => {
    //@ts-ignore
    scrollRef?.current?.scrollTo({ x: 0, y: 0 });
  }, [step]);

  return (
    <>
      {location ? (
        <View style={styles.mainContainer}>
          <TouchableOpacity activeOpacity={1} style={styles.goBackArrow}>
            <View style={styles.backArrowContainer}>
              <ArrowLeft
                onPress={() => {
                  if (step === 0 || step === 1) {
                    setIsExitModalVisible(true);
                  } else {
                    setStep(prev => prev - 1);
                  }
                }}
                color={Colors.grey_900}
              />
              {step === 7 && <Text style={styles.backArrowText}>{t('survey_measurement.river_measurement')}</Text>}
              {step === 8 && <Text style={styles.backArrowText}>{t('survey_measurement.questionaire_results')}</Text>}
            </View>
          </TouchableOpacity>
          <ScrollView keyboardShouldPersistTaps="handled" ref={scrollRef} horizontal={false} contentContainerStyle={styles.contentContainer}>
            <View style={step >= 7 ? { ...styles.measurementContainer, marginTop: 35 } : styles.measurementContainer}>
              <MeasurementIconSelector measurement={measurement} height={110} width={110} />
              <Text style={step < 8 ? styles.measurementName : { ...styles.measurementName, paddingBottom: 0, marginTop: -15 }}>{handleMeasurementTitle()}</Text>
              {step < 7 && makeSteppersV2(step, 8)}
            </View>
            <View style={styles.lineStyle} />

            {renderCurrentStep()}
          </ScrollView>
        </View>
      ) : (
        <LoadingSpinner visible={true} title={'Loading'} description={''} />
      )}
      <WarningModal
        setIsLoading={loading}
        cancel={() => setIsModalVisible(false)}
        removeFunction={handleDeleteMeasurement}
        isVisible={isModalVisible}
        header={t('survey_measurement.delete_measurement')}
        description={t('survey_measurement.delete_measurement_confirm')}
        buttonText={'Delete'}
      />
      <WarningModal
        setIsLoading={loading}
        cancel={() => setIsExitModalVisible(false)}
        removeFunction={() => navigation.goBack()}
        isVisible={isExitModalVisible}
        header={'Exit questionnaire?'}
        description={'Are you sure you want to exit this questionnaire? Unsaved changes will be lost.'}
        buttonText={'Yes'}
      />
    </>
  );
};

export default VegetationDetailsPage;
