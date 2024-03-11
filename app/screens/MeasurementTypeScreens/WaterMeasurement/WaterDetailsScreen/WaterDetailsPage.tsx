/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, MoreCircle } from 'react-native-iconly';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

import WaterImg from '../../../../assets/images/icons/waterIcon.svg';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import AdditionalNotes from '../../../../components/MeasurementBaseForms/AdditionalNotes/AdditionalNotes';
import Details from '../../../../components/MeasurementBaseForms/Details/Details';
import Images from '../../../../components/MeasurementBaseForms/Images/Images';
import Videos from '../../../../components/MeasurementBaseForms/Videos/Videos';
import WarningModal from '../../../../components/WarningModal/WarningModal';
import { Colors } from '../../../../constants/colors';
import { getWaterMeasurements } from '../../../../data/api/measurements/waterMeasurementsService';
import { WaterMeasurement } from '../../../../data/models/measurements/WaterMeasurement';
import { useBackHandler } from '../../../../hooks/useBackHandler';
import { deleteMeasurement, editMeasurement, initializeMeasurements } from '../../../../store/measurementSlice';
import { RootState } from '../../../../store/store';
import { addWater, editWater } from '../../../../store/waterSlice';
import { formatDate, formatDateFromBackend, formatTime } from '../../../../tools/dateFormatter';
import { makeSteppersV2 } from '../../../../tools/makeSteppers';
import RiverDischarge from '../Forms/RiverDischarge/RiverDischarge';
import RiverSoil from '../Forms/RiverSoil/RiverSoil';
import RiverWidth from '../Forms/RiverWidth/RiverWidth';
import WaterLevel from '../Forms/WaterLevel/WaterLevel';
import WildLife from '../Forms/WildLife/WildLife';
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

const WaterDetailsPage: FC<IProps> = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { id: measurementId, waterId, name: type_name, type_id, surveyId } = route.params;
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const measurement: any = useSelector((state: RootState) => state.measurement.measurements.find(m => m.id === measurementId));
  const properDate = formatDateFromBackend(measurement?.date);
  const [waterMeasurement, setWaterMeasurement] = useState<WaterMeasurement>();
  const [waterID, setWaterID] = useState<number>();
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

  // Water Level States

  const [waterLevelChecked, setWaterLevelChecked] = useState<any>({ label: '', value: 0 });
  const [waterLevelValue, setWaterLevelValue] = useState<number | undefined>(waterMeasurement?.water_level_id);

  // River discharge States

  const [riverDischarge, setRiverDischarge] = useState<any>();
  const [riverFlow, setRiverFlow] = useState<number | undefined>(waterMeasurement?.water_discharge_speed);
  const [selectedRiverDischarge, setSelectedRiverDischarge] = useState<string>('');

  // River width States

  const [riverWidth, setRiverWidth] = useState<string | undefined>(waterMeasurement?.river_width_length.toString());
  const [isWidthEnough, setIsWidth] = useState({ label: '', value: 0 });

  // River Soil States

  const [riverBed, setRiverBed] = useState<string | undefined>(waterMeasurement?.river_width_length.toString());
  const [riverWall, setRiverWall] = useState<string | undefined>(waterMeasurement?.river_wall);
  const [riverWallColor, setRiverWallColor] = useState<string | undefined>(waterMeasurement?.river_wall_color);

  // Wildlife States

  const [wildLife, setWildLife] = useState<number>(0);

  // AdditionalNotes

  const [additionalNotes, setAdditionalNotes] = useState<string | undefined>(waterMeasurement?.description);

  const goBack = () => navigation.goBack();
  const navigateToSummary = () => navigation.navigate('WaterDetailsSummaryScreen', { id: mesId, waterId: waterId });
  const navigateToMeasurements = () => navigation.navigate('RunningSurveyPage', { id: surveyId });

  const getWaterId = data => {
    setWaterID(data.id);
    return data;
  };

  useEffect(() => {
    const getMeasurement = async () => {
      const res = await getWaterMeasurements(measurementId);
      setWaterMeasurement(res[0]);
    };
    dispatch(initializeMeasurements());
    getMeasurement();
  }, [measurementId, dispatch]);

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
    try {
      dispatch(editMeasurement({ id: measurementId, data: measurementObj }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditWaterMeasurement = () => {
    const waterMes = {
      ...waterMeasurement,
      measurement_id: measurementId,
      water_level_id: waterLevelValue ? waterLevelValue : waterMeasurement?.water_level_id,
      water_discharge_id: riverDischarge ? riverDischarge : waterMeasurement?.water_discharge_id,
      water_discharge_speed: riverFlow ? riverFlow : waterMeasurement?.water_discharge_speed,
      river_width_enough: isWidthEnough ? isWidthEnough?.value : waterMeasurement?.river_width_enough,
      river_width_length: riverWidth ? Number(riverWidth).toFixed(0) : Number(waterMeasurement?.river_width_length).toFixed(0),
      river_bed: riverBed ? riverBed : waterMeasurement?.river_bed,
      river_wall: riverWall ? riverWall : waterMeasurement?.river_wall,
      river_wall_color: riverWallColor ? riverWallColor : waterMeasurement?.river_wall,
      wildlife: wildLife ? wildLife : waterMeasurement?.wildlife,
      description: additionalNotes ? additionalNotes : waterMeasurement?.description,
    };
    try {
      if (waterId) {
        dispatch(editWater(waterId, waterMes));
      } else {
        dispatch(addWater(waterMes, measurementId, getWaterId));
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
        return <Videos measurement_id={measurementId} videos={videos} setVideos={setVideos} setStep={setStep} step={step} />;

      case 3:
        return (
          <WaterLevel
            waterMeasurement={waterMeasurement}
            setStep={setStep}
            waterLevelChecked={waterLevelChecked}
            setWaterLevelValue={setWaterLevelValue}
            setWaterLevelChecked={setWaterLevelChecked}
          />
        );

      case 4:
        return (
          <RiverDischarge
            waterMeasurement={waterMeasurement}
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
            waterMeasurement={waterMeasurement}
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
            waterMeasurement={waterMeasurement}
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
        return <WildLife waterMeasurement={waterMeasurement} wildLife={wildLife} setWildLife={setWildLife} setStep={setStep} />;

      case 8:
        return (
          <AdditionalNotes
            additionalNotes={additionalNotes}
            setAdditionalNotes={setAdditionalNotes}
            setStep={setStep}
            step={step}
            handleAddMeasurement={handleEditWaterMeasurement}
            navigateToMeasurements={navigateToMeasurements}
            measurement={waterMeasurement}
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
              {step === 9 && <Text style={styles.backArrowText}>{t('survey_measurement.river_measurement')}</Text>}
              {step === 10 && <Text style={styles.backArrowText}>{t('survey_measurement.questionaire_results')}</Text>}
            </View>
          </TouchableOpacity>
          <ScrollView keyboardShouldPersistTaps="handled" ref={scrollRef} horizontal={false} contentContainerStyle={styles.contentContainer}>
            <View style={step >= 8 ? { ...styles.measurementContainer, marginTop: 35 } : styles.measurementContainer}>
              <WaterImg height={110} width={110} />
              <Text style={step <= 8 ? styles.measurementName : { ...styles.measurementName, paddingBottom: 0, marginTop: -15 }}>{handleMeasurementTitle()}</Text>
              {step < 9 && makeSteppersV2(step, 9)}
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

export default WaterDetailsPage;
