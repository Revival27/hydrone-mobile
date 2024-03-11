/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft } from 'react-native-iconly';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

import LoadingSpinner from '../../../../components/LoadingSpinner';
import AdditionalNotes from '../../../../components/MeasurementBaseForms/AdditionalNotes/AdditionalNotes';
import Details from '../../../../components/MeasurementBaseForms/Details/Details';
import Images from '../../../../components/MeasurementBaseForms/Images/Images';
import Videos from '../../../../components/MeasurementBaseForms/Videos/Videos';
import MeasurementIconSelector from '../../../../components/MeasurementIconselector';
import WarningModal from '../../../../components/WarningModal/WarningModal';
import { Colors } from '../../../../constants/colors';
import { getSoilMeasurements } from '../../../../data/api/measurements/soilMeasurementsService';
import { SoilMeasurement } from '../../../../data/models/measurements/SoilMeasurements';
import { useBackHandler } from '../../../../hooks/useBackHandler';
import { deleteMeasurement, editMeasurement, initializeMeasurements } from '../../../../store/measurementSlice';
import { addSoil, editSoil } from '../../../../store/soilSlice';
import { RootState } from '../../../../store/store';
import { formatDate, formatDateFromBackend, formatTime } from '../../../../tools/dateFormatter';
import { makeSteppersV2 } from '../../../../tools/makeSteppers';
import GeneralQuality from '../Forms/GeneralQuality/GeneralQuality';
import SoilCompactness from '../Forms/SoilCompactness/SoilCompactness';
import SoilComposition from '../Forms/SoilComposition/SoilComposition';
import SoilType from '../Forms/SoilType/SoilType';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const SoilDetailsPage: FC<IProps> = ({ navigation, route }) => {
  const { id: measurementId, soilId, surveyId } = route.params;

  const getSoilId = data => {
    return data.id;
  };

  const loading = useSelector((state: RootState) => state.loading.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);

  useBackHandler(() => {
    if (true) {
      setIsExitModalVisible(true);
      return true;
    }
  });

  //General States

  const scrollRef = useRef(null);
  const [step, setStep] = useState<number>(0);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const measurement: any = useSelector((state: RootState) => state.measurement.measurements.find(m => m.id === measurementId));
  const properDate = formatDateFromBackend(measurement?.date);
  const [soilMeasurement, setSoilMeasurement] = useState<SoilMeasurement>();

  //Details States

  const [name, setName] = useState<string>(measurement?.name);
  const [description, setDescription] = useState<string>(measurement?.description);
  const [location, setLocation] = useState<any>(`${measurement?.latitude} - ${measurement?.longitude}`);
  const [date, setDate] = useState<any>(properDate);
  const [time, setTime] = useState<any>(new Date());
  const [openDate, setOpenDate] = useState();
  const [openTime, setOpenTime] = useState();

  //Image States

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

  // SoilComposition States

  const [openSurface, setOpenSurface] = useState(false);
  const [openHalfDeep, setOpenHalfDeep] = useState(false);
  const [openDeep, setOpenDeep] = useState(false);
  const [surfaceValue, setSurfaceValue] = useState<number | undefined>(soilMeasurement?.composition_surface_id);
  const [deepHalfValue, setDeepHalfValue] = useState<number | undefined>(soilMeasurement?.composition_half_meter_id);
  const [deepValue, setDeepValue] = useState<number | undefined>(soilMeasurement?.composition_one_meter_id);
  const [selectedSurfaceValues, setSelectedSurfaceValues] = useState({
    selectedSurface: '',
    selectedDeepHalf: '',
    selectedDeep: '',
  });

  // Soil Type states

  const [soilChecked, soilSetChecked] = useState<any>({ label: soilMeasurement?.type_name, value: soilMeasurement?.type_id });

  // Soil compactness states

  const [compactChecked, setCompactChecked] = useState<any>({ label: soilMeasurement?.compactness_name, value: soilMeasurement?.compactness_id });

  // Geneal Quality states

  const [generalQuality, setGeneralQuality] = useState(soilMeasurement?.general_quality);

  // AdditionalNotes States

  const [additionalNotes, setAdditionalNotes] = useState(soilMeasurement?.description);

  useEffect(() => {
    const getMeasurement = async () => {
      const res = await getSoilMeasurements(measurementId);
      setSoilMeasurement(res[0]);
    };
    dispatch(initializeMeasurements());
    getMeasurement();
  }, [measurementId, dispatch]);

  const handleMeasurementTitle = () => {
    switch (step) {
      case 0:
        return 'Soil measurement';

      case 1:
        return 'Photos';

      case 2:
        return 'Video';

      case 3:
        return 'Soil composition';

      case 4:
        return 'Soil type';

      case 5:
        return 'Soil compactness';

      case 6:
        return 'General quality';

      case 7:
        return 'Additional notes';

      case 8:
        return '';

      default:
        return '';
    }
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

  const handleEditSoilMeasurement = () => {
    const soilMes = {
      ...soilMeasurement,
      measurement_id: measurementId,
      composition_surface_id: surfaceValue ? surfaceValue : soilMeasurement?.composition_surface_id,
      composition_half_meter_id: deepHalfValue ? deepHalfValue : soilMeasurement?.composition_half_meter_id,
      composition_one_meter_id: deepValue ? deepValue : soilMeasurement?.composition_one_meter_id,
      type_id: soilChecked?.value ? soilChecked?.value : soilMeasurement?.type_id,
      compactness_id: compactChecked?.value ? compactChecked?.value : soilMeasurement?.compactness_id,
      general_quality: generalQuality ? generalQuality : soilMeasurement?.general_quality,
      description: additionalNotes ? additionalNotes : soilMeasurement?.description,
    };
    try {
      if (soilId) {
        dispatch(editSoil({ soilId, data: soilMes }));
      } else {
        dispatch(addSoil(soilMes, measurementId, getSoilId));
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

  const handleNavigationToSurveyMeasurements = () => navigation.navigate('RunningSurveyPage', { id: surveyId });

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
          <SoilComposition
            soilMeasurement={soilMeasurement}
            //@ts-ignore
            openSurface={openSurface}
            setOpenSurface={setOpenSurface}
            openHalfDeep={openHalfDeep}
            setOpenHalfDeep={setOpenHalfDeep}
            setStep={setStep}
            openDeep={openDeep}
            setOpenDeep={setOpenDeep}
            surfaceValue={surfaceValue}
            setSurfaceValue={setSurfaceValue}
            deepHalfValue={deepHalfValue}
            setDeepHalfValue={setDeepHalfValue}
            deepValue={deepValue}
            setDeepValue={setDeepValue}
            setSelectedSurfaceValues={setSelectedSurfaceValues}
            selectedSurfaceValues={selectedSurfaceValues}
          />
        );

      case 4:
        return <SoilType step={step} setStep={setStep} soilChecked={soilChecked} soilSetChecked={soilSetChecked} soilMeasurement={soilMeasurement} />;

      case 5:
        return <SoilCompactness setStep={setStep} compactChecked={compactChecked} setCompactChecked={setCompactChecked} soilMeasurement={soilMeasurement} />;

      case 6:
        return <GeneralQuality generalQuality={generalQuality} setGeneralQuality={setGeneralQuality} setStep={setStep} soilMeasurement={soilMeasurement} />;

      case 7:
        return (
          <AdditionalNotes
            navigateToMeasurements={handleNavigationToSurveyMeasurements}
            step={step}
            setStep={setStep}
            additionalNotes={additionalNotes}
            setAdditionalNotes={setAdditionalNotes}
            handleAddMeasurement={handleEditSoilMeasurement}
            measurement={soilMeasurement}
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
              {step === 8 && <Text style={styles.backArrowText}>{t('survey_measurement.soil_measurement')}</Text>}
              {step === 9 && <Text style={styles.backArrowText}>{t('survey_measurement.questionaire_results')}</Text>}
            </View>
          </TouchableOpacity>
          <ScrollView keyboardShouldPersistTaps="handled" ref={scrollRef} horizontal={false} contentContainerStyle={styles.contentContainer}>
            <View style={step >= 8 ? { ...styles.measurementContainer, marginTop: 35 } : styles.measurementContainer}>
              <MeasurementIconSelector measurement={measurement} height={100} width={100} />
              <Text style={step < 8 ? styles.measurementName : { ...styles.measurementName, paddingBottom: 10, marginTop: -30 }}>{handleMeasurementTitle()}</Text>
              <View style={{ paddingTop: 15 }}>{step < 8 && makeSteppersV2(step, 8)}</View>
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

export default SoilDetailsPage;
