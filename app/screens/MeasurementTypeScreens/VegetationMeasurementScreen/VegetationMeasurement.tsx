/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Edit, MoreCircle } from 'react-native-iconly';
import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable react-native/no-inline-styles */
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenHeight } from '@rneui/base';

import VegetationImg from '../../../assets/images/icons/vegetationIcon.svg';
import EditPopup from '../../../components/EditPopup/EditPopup';
import PopupRowElement from '../../../components/EditPopup/PopupRowElement';
import LoadingSpinner from '../../../components/LoadingSpinner';
import AdditionalNotes from '../../../components/MeasurementBaseForms/AdditionalNotes/AdditionalNotes';
import Details from '../../../components/MeasurementBaseForms/Details/Details';
import Images from '../../../components/MeasurementBaseForms/Images/Images';
import Summary from '../../../components/MeasurementBaseForms/Summary/Summary';
import Videos from '../../../components/MeasurementBaseForms/Videos/Videos';
import WarningModal from '../../../components/WarningModal/WarningModal';
import { Colors } from '../../../constants/colors';
import { useBackHandler } from '../../../hooks/useBackHandler';
import { add, deleteMeasurement } from '../../../store/measurementSlice';
import { RootState } from '../../../store/store';
import { addVegetation } from '../../../store/vegetationSlice';
import { formatDate, formatTime } from '../../../tools/dateFormatter';
import { makeSteppersV2 } from '../../../tools/makeSteppers';
import { measurementStatusChecker } from '../../../tools/measurementStatusChecker';
import Density from './Forms/Density/Density';
import Replantation from './Forms/Replantation/Replantation';
import VegetationResults from './Forms/VegetationResults/VegetationResults';
import VegetationWildlife from './Forms/VegetationWildlife/VegetationWildlife';
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

const VegetationMeasurement: FC<IProps> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { id, name: type_name, type_id, surveyId } = route.params;
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [panelVisible, setIsPanelVisible] = useState<boolean>(false);
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);

  useBackHandler(() => {
    if (true) {
      setIsExitModalVisible(true);
      return true;
    }
  });

  // General States

  const scrollRef = useRef(null);
  const [status, setStatus] = useState<Status>('Unfinished');
  const [step, setStep] = useState(0);
  const [measurement, setMeasurement] = useState<any>({});
  const [mesId, setMesId] = useState<number>();
  const [vegetationId, setVegetationId] = useState<number>();

  // Details States

  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<any>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  // Image States

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<any>([]);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [geoLocation, setGeoLocation] = useState<any>([]);
  const [orientation, setOrientation] = useState();
  const openGallery = () => setIsModalOpen(true);
  const closeGallery = () => setIsModalOpen(false);

  // Video States

  const [videos, setVideos] = useState<any>([]);

  // Density States

  const [foliage, setFoliage] = useState<number>(1);
  const [undergrowth, setUndergrowth] = useState<number>(1);

  // VegetationWildlife States

  const [wildlife, setWildlife] = useState<number>(1);

  // Replantation States

  const [replantation, setReplantation] = useState({ label: '', value: 0 });

  // AdditionalNotes States

  const [additionalNotes, setAdditionalNotes] = useState<string>('');

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

  const checkStatus = () => {
    //@ts-ignore
    if (measurementStatusChecker(description, String(foliage), String(undergrowth), String(wildlife), replantation)) {
      return 'Finished';
    }
    return 'Unfinished';
  };

  const getId = async data => {
    setMesId(data.id);
    return data.id;
  };

  const getVegetationId = data => {
    setVegetationId(data.id);
    return data;
  };

  const handleAddMeasurement = () => {
    const latitude = location.split('-')[0];
    const longitude = location.split('-')[1];
    const measurementInfo = {
      survey_id: id,
      name,
      description,
      measurement_type_id: type_id,
      latitude,
      longitude,
      date: formatDate(date),
      time: formatTime(time),
    };

    try {
      dispatch(add(measurementInfo, getId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMeasurement = () => {
    try {
      dispatch(deleteMeasurement(mesId, () => {}));
      setIsModalVisible(false);
      navigation.navigate('RunningSurveyPage', { id: surveyId });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddVegetationMeasurement = () => {
    const vegetationDetails = {
      measurement_id: mesId,
      foliage,
      undergrowth,
      wildlife,
      replantation: replantation ? replantation?.value : 0,
      description: additionalNotes,
    };

    try {
      dispatch(addVegetation(vegetationDetails, mesId, getVegetationId));
    } catch (err) {
      console.error(err);
    }
  };

  const goBack = () => navigation.goBack();
  const navigateToEdit = () => navigation.navigate('VegetationDetailsScreen', { id: mesId, vegetationId: vegetationId, surveyId });

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <Details
            handleAddMeasurement={handleAddMeasurement}
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
            measurement_id={mesId}
            id={id}
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
        return <Videos measurement_id={mesId} videos={videos} setVideos={setVideos} setStep={setStep} step={step} />;

      case 3:
        return <Density vegetationMeasurement={undefined} foliage={foliage} setFoliage={setFoliage} setStep={setStep} undergrowth={undergrowth} setUndergrowth={setUndergrowth} />;

      case 4:
        return <VegetationWildlife vegetationMeasurement={undefined} wildlife={wildlife} setWildlife={setWildlife} setStep={setStep} />;

      case 5:
        return <Replantation vegetationMeasurement={undefined} replantation={replantation} setReplantation={setReplantation} setStep={setStep} />;

      case 6:
        return (
          <AdditionalNotes
            additionalNotes={additionalNotes}
            setAdditionalNotes={setAdditionalNotes}
            step={step}
            setStep={setStep}
            handleAddMeasurement={handleAddVegetationMeasurement}
            navigateToMeasurements={undefined}
            measurement={undefined}
          />
        );
      case 7:
        return <Summary checkStatus={checkStatus} location={location} name={name} date={date} time={time} description={description} setStep={setStep} />;

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
            navigateToEdit={navigateToEdit}
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
      {location !== undefined ? (
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
              <View style={styles.rightHeader}>{step >= 8 && <MoreCircle onPress={() => setIsPanelVisible(true)} set="light" primaryColor={Colors.grey_900} />}</View>
            </View>
          </TouchableOpacity>
          <ScrollView keyboardShouldPersistTaps="handled" ref={scrollRef} horizontal={false} contentContainerStyle={styles.contentContainer}>
            <View style={step >= 7 ? { ...styles.measurementContainer, marginTop: 35 } : styles.measurementContainer}>
              <VegetationImg height={110} width={110} />
              <Text style={step < 8 ? styles.measurementName : { ...styles.measurementName, paddingBottom: 0, marginTop: -15 }}>{handleMeasurementTitle()}</Text>
              {step < 7 && makeSteppersV2(step, 8)}
            </View>
            {step !== 7 && <View style={styles.lineStyle} />}

            {renderCurrentStep()}
          </ScrollView>
        </View>
      ) : (
        <LoadingSpinner visible={true} title={'Loading'} description={''} />
      )}
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

export default VegetationMeasurement;
