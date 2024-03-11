/* eslint-disable @typescript-eslint/naming-convention */
import { t } from 'i18next';
import React, { FC, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Edit, MoreCircle } from 'react-native-iconly';
import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenHeight } from '@rneui/base';

import GeneralImg from '../../../assets/images/icons/General.svg';
import EditPopup from '../../../components/EditPopup/EditPopup';
import PopupRowElement from '../../../components/EditPopup/PopupRowElement';
import Details from '../../../components/MeasurementBaseForms/Details/Details';
import Images from '../../../components/MeasurementBaseForms/Images/Images';
import Summary from '../../../components/MeasurementBaseForms/Summary/Summary';
import Videos from '../../../components/MeasurementBaseForms/Videos/Videos';
import WarningModal from '../../../components/WarningModal/WarningModal';
import { Colors } from '../../../constants/colors';
import { useBackHandler } from '../../../hooks/useBackHandler';
import { add, deleteMeasurement } from '../../../store/measurementSlice';
import { AppDispatch, RootState } from '../../../store/store';
import { dateFormatEnGB, dateFormatEnGbBackend, formatDate, formatTime } from '../../../tools/dateFormatter';
import { measurementStatusChecker } from '../../../tools/measurementStatusChecker';
import GeneralResults from './GeneralResults/GeneralResults';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const GeneralMeasurementPage: FC<IProps> = ({ navigation, route }) => {
  const { id, name: type_name, type_id, surveyId } = route.params;

  const [step, setStep] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<any>();
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<any>([]);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [geoLocation, setGeoLocation] = useState<any>([]);
  const [orientation, setOrientation] = useState();
  const [videos, setVideos] = useState<any>([]);
  const openGallery = () => setIsModalOpen(true);
  const closeGallery = () => setIsModalOpen(false);
  const [mesId, setMesId] = useState<number>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);
  const [panelVisible, setIsPanelVisible] = useState<boolean>(false);

  const loading = useSelector((state: RootState) => state.loading.loading);

  const stepBack = () => {
    if (step === 0) {
      setIsExitModalVisible(true);
    } else {
      setStep(prev => prev - 1);
    }
  };

  useBackHandler(() => {
    if (true) {
      setIsExitModalVisible(true);
      return true;
    }
  });
  const navigateToEdit = () => {
    navigation.navigate('MeasurementDetailsScreen', { id: mesId, surveyId });
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

  const getId = async data => {
    setMesId(data.id);
    return data;
  };

  const handleAddMeasurement = async () => {
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

    await dispatch(add(measurementInfo, getId));
  };

  const checkStatus = () => {
    if (measurementStatusChecker(name, description, location, date, time)) {
      return 'Finished';
    }
    return 'Unfinished';
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <Details
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
            handleAddMeasurement={handleAddMeasurement}
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
        return <Summary checkStatus={checkStatus} location={location} name={name} date={date} time={time} description={description} setStep={setStep} />;

      case 4:
        return (
          <GeneralResults
            navigateToEdit={navigateToEdit}
            goBack={() => navigation.goBack()}
            location={location}
            time={time}
            name={name}
            date={dateFormatEnGB(date)}
            galleryImages={galleryImages}
            videos={videos}
            additionalNotes={description}
          />
        );

      default:
        return;
    }
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity activeOpacity={1} style={styles.goBackArrow}>
          <View style={styles.backArrowContainer}>
            <ArrowLeft onPress={() => stepBack()} color={Colors.grey_900} />
            <View style={styles.rightHeader}>{step >= 4 && <MoreCircle onPress={() => setIsPanelVisible(true)} set="light" primaryColor={Colors.grey_900} />}</View>
          </View>
        </TouchableOpacity>
        <ScrollView keyboardShouldPersistTaps="handled" horizontal={false} contentContainerStyle={styles.contentContainer}>
          <View style={styles.measurementContainer}>
            <GeneralImg />
            <Text style={styles.measurementName}>{type_name}</Text>
          </View>
          <View style={styles.lineStyle} />

          {renderCurrentStep()}
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

export default GeneralMeasurementPage;
