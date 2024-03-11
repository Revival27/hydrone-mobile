/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Edit, MoreCircle } from 'react-native-iconly';
import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenHeight } from '@rneui/base';

import SoilImg from '../../../assets/images/icons/SoilCompMeasurement.svg';
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
import { addMeasurement, deleteImage } from '../../../data/api/measurements/measurementsService';
import { useBackHandler } from '../../../hooks/useBackHandler';
import { add, deleteMeasurement, deleteMeasurementImage } from '../../../store/measurementSlice';
import { addSoil } from '../../../store/soilSlice';
import { RootState } from '../../../store/store';
import { formatDate, formatTime } from '../../../tools/dateFormatter';
import { getCurrentLocation } from '../../../tools/Location/getCurrentLocation';
import { makeSteppersV2 } from '../../../tools/makeSteppers';
import { measurementStatusChecker } from '../../../tools/measurementStatusChecker';
import GeneralQuality from './Forms/GeneralQuality/GeneralQuality';
import SoilResults from './Forms/Results/SoilResults';
import SoilCompactness from './Forms/SoilCompactness/SoilCompactness';
import SoilComposition from './Forms/SoilComposition/SoilComposition';
import SoilType from './Forms/SoilType/SoilType';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

interface Location {
  latitude: string;
  longitude: string;
}

interface Measurement {
  status: string;
  name: string;
  location: Location;
  date: Date;
  time: Date;
  galleryImages: any[];
  videos: any[];
  soilChecked: string;
  compactChecked: string;
  generalQuality: number;
  additionalNotes: string;
}

type Status = 'Finished' | 'Unfinished';

const SoilMeasurementPage: FC<IProps> = ({ navigation, route }) => {
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

  const scrollRef = React.useRef(null);
  const [mesId, setMesId] = useState<number>();
  const [soilId, setSoilId] = useState<number>();
  const [status, setStatus] = useState<Status>('Unfinished');
  const [step, setStep] = useState(0);

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

  // SoilComposition States

  const [openSurface, setOpenSurface] = useState(false);
  const [openHalfDeep, setOpenHalfDeep] = useState(false);
  const [openDeep, setOpenDeep] = useState(false);
  const [surfaceValue, setSurfaceValue] = useState<number>();
  const [deepHalfValue, setDeepHalfValue] = useState<number>();
  const [deepValue, setDeepValue] = useState<number>();
  const [selectedSurfaceValues, setSelectedSurfaceValues] = useState({
    selectedSurface: '',
    selectedDeepHalf: '',
    selectedDeep: '',
  });

  // Soil Type states

  const [soilChecked, soilSetChecked] = useState({ label: '', value: 0 });

  // Soil compactness states

  const [compactChecked, setCompactChecked] = useState({ label: '', value: 0 });

  // Geneal Quality states

  const [generalQuality, setGeneralQuality] = useState<number>(0);

  // AdditionalNotes States

  const [additionalNotes, setAdditionalNotes] = useState('');

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

  const checkStatus = () => {
    //@ts-ignore
    if (measurementStatusChecker(description, surfaceValue, deepHalfValue, deepValue, soilChecked?.value, compactChecked?.value, generalQuality)) {
      return 'Finished';
    }
    return 'Unfinished';
  };

  const getId = async data => {
    setMesId(data.id);
    return data.id;
  };

  const getSoilId = data => {
    setSoilId(data.id);
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

    dispatch(add(measurementInfo, getId));
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

  const handleAddSoilMeasurement = () => {
    const soilDetails = {
      measurement_id: mesId,
      composition_surface_id: surfaceValue,
      composition_half_meter_id: deepHalfValue,
      composition_one_meter_id: deepValue,
      type_id: soilChecked.value,
      compactness_id: compactChecked.value,
      general_quality: generalQuality,
      description: additionalNotes,
    };
    dispatch(addSoil(soilDetails, mesId, getSoilId));
  };

  const goBack = () => navigation.goBack();
  const navigateToEdit = () => navigation.navigate('SoilDetailsScreen', { id: mesId, soilId: soilId, surveyId });

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
        return (
          <SoilComposition //@ts-ignore
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
            soilMeasurement={undefined}
          />
        );

      case 4:
        return <SoilType step={step} setStep={setStep} soilChecked={soilChecked} soilSetChecked={soilSetChecked} />;

      case 5:
        return <SoilCompactness setStep={setStep} compactChecked={compactChecked} setCompactChecked={setCompactChecked} />;

      case 6:
        return <GeneralQuality generalQuality={generalQuality} setGeneralQuality={setGeneralQuality} setStep={setStep} soilMeasurement={undefined} />;

      case 7:
        return (
          <AdditionalNotes
            step={step}
            setStep={setStep}
            additionalNotes={additionalNotes}
            setAdditionalNotes={setAdditionalNotes}
            handleAddMeasurement={handleAddSoilMeasurement}
            navigateToMeasurements={undefined}
            measurement={undefined}
          />
        );

      case 8:
        return <Summary location={location} name={name} date={date} time={time} description={description} setStep={setStep} checkStatus={checkStatus} />;

      case 9:
        return (
          <SoilResults
            soilChecked={soilChecked}
            compactChecked={compactChecked}
            galleryImages={galleryImages}
            videos={videos}
            generalQuality={generalQuality}
            selectedSurfaceValues={selectedSurfaceValues}
            additionalNotes={additionalNotes}
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
              {step === 8 && <Text style={styles.backArrowText}>{t('survey_measurement.soil_measurement')}</Text>}
              {step === 9 && <Text style={styles.backArrowText}>{t('survey_measurement.questionaire_results')}</Text>}
              <View style={styles.rightHeader}>{step >= 9 && <MoreCircle onPress={() => setIsPanelVisible(true)} set="light" primaryColor={Colors.grey_900} />}</View>
            </View>
          </TouchableOpacity>
          <ScrollView keyboardShouldPersistTaps="handled" ref={scrollRef} horizontal={false} contentContainerStyle={styles.contentContainer}>
            <View style={step >= 8 ? { ...styles.measurementContainer, marginTop: 35 } : styles.measurementContainer}>
              <SoilImg />
              <Text style={step < 8 ? styles.measurementName : { ...styles.measurementName, paddingBottom: 10, marginTop: 15 }}>{handleMeasurementTitle()}</Text>
              {step < 8 && makeSteppersV2(step, 8)}
            </View>
            {step !== 8 && <View style={styles.lineStyle} />}

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

export default SoilMeasurementPage;
