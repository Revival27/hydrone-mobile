/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Edit, MoreCircle } from 'react-native-iconly';
import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenHeight } from '@rneui/base';

import WaterImg from '../../../assets/images/icons/waterIcon.svg';
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
import { addWater } from '../../../store/waterSlice';
import { formatDate, formatTime } from '../../../tools/dateFormatter';
import { makeSteppersV2 } from '../../../tools/makeSteppers';
import { measurementStatusChecker } from '../../../tools/measurementStatusChecker';
import RiverDischarge from './Forms/RiverDischarge/RiverDischarge';
import RiverSoil from './Forms/RiverSoil/RiverSoil';
import RiverWidth from './Forms/RiverWidth/RiverWidth';
import WaterLevel from './Forms/WaterLevel/WaterLevel';
import WaterResults from './Forms/WaterResults/WaterResults';
import WildLife from './Forms/WildLife/WildLife';
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

const WaterMeasurement: FC<IProps> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { id, name: type_name, type_id, surveyId } = route.params;
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [panelVisible, setIsPanelVisible] = useState<boolean>(false);
  const loading = useSelector((state: RootState) => state.loading.loading);
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
  const [waterId, setWaterId] = useState<number>();

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

  // Water Level States

  const [waterLevelChecked, setWaterLevelChecked] = useState({ label: '', value: 0 });

  // River discharge States

  const [riverDischarge, setRiverDischarge] = useState<any>({ label: '', value: 0 });
  const [riverFlow, setRiverFlow] = useState<number | undefined>(0);
  const [selectedRiverDischarge, setSelectedRiverDischarge] = useState<string>('');

  // River width States

  const [riverWidth, setRiverWidth] = useState<string | undefined>('');
  const [isWidthEnough, setIsWidth] = useState({ label: '', value: 0 });

  // River Soil States

  const [riverBed, setRiverBed] = useState<string | undefined>('');
  const [riverWall, setRiverWall] = useState<string | undefined>('');
  const [riverWallColor, setRiverWallColor] = useState<string | undefined>('');

  // Wildlife States

  const [wildLife, setWildLife] = useState<number>(0);

  // AdditionalNotes

  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  const checkStatus = () => {
    if (
      measurementStatusChecker(description, riverBed, riverWall, riverWallColor, isWidthEnough?.value, riverWidth, riverDischarge, waterLevelChecked?.value, riverFlow, wildLife)
    ) {
      return 'Finished';
    }
    return 'Unfinished';
  };

  const getId = async data => {
    setMesId(data.id);
    return data.id;
  };

  const getWaterId = data => {
    setWaterId(data.id);
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

  const handleAddWaterMeasurement = () => {
    const waterDetails = {
      measurement_id: mesId,
      water_level_id: waterLevelChecked?.value,
      water_discharge_id: riverDischarge,
      water_discharge_speed: riverFlow,
      river_width_enough: isWidthEnough?.value,
      river_width_length: riverWidth,
      river_bed: riverBed,
      river_wall: riverWall,
      river_wall_color: riverWallColor,
      wildlife: wildLife,
      description: description,
    };

    try {
      dispatch(addWater(waterDetails, mesId, getWaterId));
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

  const goBack = () => navigation.goBack();
  const navigateToEdit = () => navigation.navigate('WaterDetailsScreen', { id: mesId, waterId: waterId, surveyId });

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <Details
            fromEdit={false}
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
          <WaterLevel
            setWaterLevelValue={undefined}
            waterMeasurement={undefined}
            setStep={setStep}
            waterLevelChecked={waterLevelChecked}
            setWaterLevelChecked={setWaterLevelChecked}
          />
        );

      case 4:
        return (
          <RiverDischarge
            waterMeasurement={undefined}
            riverDischarge={riverDischarge}
            setRiverDischarge={setRiverDischarge}
            setStep={setStep}
            riverFlow={riverFlow}
            setRiverFlow={setRiverFlow}
            setSelectedRiverDischarge={setSelectedRiverDischarge}
            selectedRiverDischarge={selectedRiverDischarge}
          />
        );

      case 5:
        return (
          <RiverWidth
            waterMeasurement={undefined}
            riverWidth={riverWidth}
            setRiverWidth={setRiverWidth}
            isWidthEnough={isWidthEnough}
            setIsWidthEnough={setIsWidth}
            setStep={setStep}
          />
        );

      case 6:
        return (
          <RiverSoil
            waterMeasurement={undefined}
            riverBed={riverBed}
            setRiverBed={setRiverBed}
            setStep={setStep}
            riverWallColor={riverWallColor}
            setRiverWallColor={setRiverWallColor}
            riverWall={riverWall}
            setRiverWall={setRiverWall}
          />
        );
      case 7:
        return <WildLife waterMeasurement={undefined} wildLife={wildLife} setWildLife={setWildLife} setStep={setStep} />;

      case 8:
        return (
          <AdditionalNotes
            additionalNotes={additionalNotes}
            setAdditionalNotes={setAdditionalNotes}
            setStep={setStep}
            step={step}
            handleAddMeasurement={handleAddWaterMeasurement}
            navigateToMeasurements={undefined}
            measurement={undefined}
          />
        );

      case 9:
        return <Summary checkStatus={checkStatus} location={location} name={name} date={date} time={time} description={description} setStep={setStep} />;

      case 10:
        return (
          <WaterResults
            galleryImages={galleryImages}
            videos={videos}
            additionalNotes={additionalNotes}
            waterLevelChecked={waterLevelChecked}
            riverFlow={riverFlow}
            riverDischarge={selectedRiverDischarge}
            riverWidth={riverWidth}
            riverBed={riverBed}
            riverWall={riverWall}
            riverWallColor={riverWallColor}
            wildLife={wildLife}
            selectedRiverFlow={selectedRiverDischarge}
            goBack={goBack}
            navigateToEdit={navigateToEdit}
          />
        );
    }
  };

  const handleMeasurementTitle = () => {
    switch (step) {
      case 0:
        return 'Water measurement';

      case 1:
        return 'Photos';

      case 2:
        return 'Video';

      case 3:
        return 'Water level';

      case 4:
        return 'River discharge';

      case 5:
        return 'River width';

      case 6:
        return 'River Soil';

      case 7:
        return 'Wildlife';

      case 8:
        return 'Additional notes';

      default:
        return '';
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
              {step === 9 && <Text style={styles.backArrowText}>{t('survey_measurement.river_measurement')}</Text>}
              {step === 10 && <Text style={styles.backArrowText}>{t('survey_measurement.questionaire_results')}</Text>}
              <View style={styles.rightHeader}>{step >= 10 && <MoreCircle onPress={() => setIsPanelVisible(true)} set="light" primaryColor={Colors.grey_900} />}</View>
            </View>
          </TouchableOpacity>
          <ScrollView keyboardShouldPersistTaps="handled" ref={scrollRef} horizontal={false} contentContainerStyle={styles.contentContainer}>
            <View style={step >= 8 ? { ...styles.measurementContainer, marginTop: 35 } : styles.measurementContainer}>
              <WaterImg height={110} width={110} />
              <Text style={step <= 8 ? styles.measurementName : { ...styles.measurementName, paddingBottom: 0, marginTop: -15 }}>{handleMeasurementTitle()}</Text>
              {step < 9 && makeSteppersV2(step, 9)}
            </View>
            {step !== 9 && <View style={styles.lineStyle} />}

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

export default WaterMeasurement;
