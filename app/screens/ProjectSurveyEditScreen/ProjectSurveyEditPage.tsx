import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, NativeSyntheticEvent, ScrollView, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Button } from '@rneui/themed';

import Warning from '../../assets/images/icons/warning.svg';
import BlueButton from '../../components/BlueButton/BlueButton';
import CustomTextArea from '../../components/CustomTextArea';
import Header from '../../components/Header/Header';
import { Colors } from '../../constants/colors';
import { MapDragEvent } from '../../data/models/map';
import { AppDispatch, RootState } from '../../store/store';
import { editSurvey } from '../../store/surveysSlice';
import { Location, LOCATION_REGEX } from '../../tools/Location';
import { failedMessage } from '../../tools/ToastMessages/Messages';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const ProjectSurveyEditPage: FC<IProps> = ({ navigation, route }) => {
  const { id, name, description } = route.params;
  const survey: any = useSelector((state: RootState) => state.surveys.surveys.find(s => s.id === id));
  const [editedSurveyName, setEditedSurveyName] = useState(name);
  const [editedSurveyDescription, setEditedSurveyDescription] = useState(description);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(true);
  const [location, setLocation] = useState<Location>({
    latitude: survey.latitude,
    longitude: survey.longitude,
  });
  const [prevLocation, setPrevLocation] = useState<Location>({
    latitude: survey.latitude,
    longitude: survey.longitude,
  });
  const [tempLocation, setTempLocation] = useState<Location>({
    latitude: survey.latitude,
    longitude: survey.longitude,
  });
  const dispatch: AppDispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [invalidLocFormat, setInvalidLocFormat] = useState(false);
  const { t } = useTranslation();

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const date = yyyy + '-' + mm + '-' + dd;

  const defaultMapView = {
    latitude: survey.latitude,
    longitude: survey.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const handleUpdateSurvey = async () => {
    if (editedSurveyName === '' || editedSurveyDescription === '') {
      failedMessage(t('toast.empty_fields'));
      return;
    }

    const updatedSurvey = {
      name: editedSurveyName,
      description: editedSurveyDescription,
      updated_at: date,
      project_ids: survey.projects,
      latitude: Number(location.latitude),
      longitude: Number(location.longitude),
    };

    await dispatch(editSurvey(id, updatedSurvey, () => navigation.goBack()));
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  const savePrevLocation = () => {
    setPrevLocation({ ...location });
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const handleDragLocationChange = (e: MapDragEvent) => {
    const fixedLoc = {
      latitude: e.nativeEvent.coordinate.latitude.toFixed(10),
      longitude: e.nativeEvent.coordinate.longitude.toFixed(10),
    };
    setLocation(fixedLoc);
    setTempLocation(fixedLoc);
    openModal();
  };

  const handleInputLocationChange = (e: NativeSyntheticEvent<TextInputChangeEventData>, type: keyof Location) => {
    e.persist();
    const { text } = e.nativeEvent;

    setTempLocation(prev => ({
      ...prev,
      [type]: text.slice(0, 13),
    }));

    if (/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/.test(text.slice(0, 13))) {
      setLocation(prev => ({
        ...prev,
        [type]: text.slice(0, 13),
      }));
      setInvalidLocFormat(false);
    }
  };

  const confirmInputLocation = () => {
    if (!LOCATION_REGEX.test(`${tempLocation.latitude}-${tempLocation.longitude}`)) {
      setInvalidLocFormat(true);
      return;
    }
    setLocation(tempLocation);
    setInvalidLocFormat(false);
  };

  const confirmModal = () => {
    setIsModalVisible(false);
  };

  const cancel = () => {
    setLocation(prevLocation);
    setIsModalVisible(false);
    setTempLocation(prevLocation);
  };

  return (
    <>
      <Header backButton={true} goBack={() => navigation.goBack()} title={t('survey.edit_survey.header')} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid extraScrollHeight={25} style={styles.content}>
          <View style={styles.mapContainer}>
            <MapView initialRegion={defaultMapView} provider={PROVIDER_GOOGLE} showsUserLocation={true} style={styles.map}>
              <Marker
                onDragStart={hideTooltip}
                draggable
                coordinate={{ latitude: Number(location.latitude), longitude: Number(location.longitude) }}
                onDrag={savePrevLocation}
                onDragEnd={handleDragLocationChange}
              />
            </MapView>
            {isTooltipVisible && (
              <View style={styles.bubble}>
                <Text style={styles.bubble__text}>Long press the marker until it becomes draggable, then drag it to the desired location</Text>
              </View>
            )}
          </View>
          <Text style={styles.inputLabel}>Location</Text>
          <View style={invalidLocFormat ? styles.errorInput : styles.inputField}>
            <TextInput
              textContentType="none"
              maxLength={13}
              style={styles.locInput}
              onFocus={savePrevLocation}
              onChange={e => handleInputLocationChange(e, 'latitude')}
              onBlur={confirmInputLocation}
              keyboardType="numeric"
              value={`${tempLocation.latitude}`}
            />
            <Text> - </Text>
            <TextInput
              maxLength={13}
              style={[styles.locInput, { width: '60%' }]}
              onFocus={savePrevLocation}
              onChange={e => handleInputLocationChange(e, 'longitude')}
              onBlur={confirmInputLocation}
              textContentType="none"
              keyboardType="numeric"
              value={`${tempLocation.longitude}`}
            />
          </View>
          <Text style={styles.inputLabel}>{t('survey.edit_survey.title')}</Text>
          <View style={styles.inputField}>
            <TextInput
              placeholderTextColor={Colors.grey_500}
              style={styles.inputText}
              defaultValue={name}
              value={editedSurveyName}
              onChangeText={text => setEditedSurveyName(text)}
            />
          </View>

          <View style={styles.inputLabel}>
            <Text style={styles.inputLabel}>{t('survey.edit_survey.description')}</Text>
            <CustomTextArea value={editedSurveyDescription} onChangeText={text => setEditedSurveyDescription(text)} />
          </View>
          <View style={styles.button}>
            <BlueButton disabled={invalidLocFormat} title={t('survey.edit_survey.button_save')} handleClick={handleUpdateSurvey} />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <Modal transparent visible={isModalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Warning width={'75%'} />
            <Text style={styles.header}>{'Change location'}</Text>
            <Text style={styles.description}>{'Are you sure you want to change the location of the survey?'}</Text>
            <TouchableOpacity activeOpacity={1}>
              <Button onPress={confirmModal} containerStyle={styles.cancelButtonContainer} title={'Yes'} buttonStyle={styles.cancelButton} titleStyle={styles.cancelButtonTitle} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Button
                loadingProps={{
                  size: 'small',
                  color: Colors.error,
                }}
                onPress={cancel}
                type="outline"
                containerStyle={styles.errorButtonContainer}
                title={t('components.popup.cancel')}
                buttonStyle={styles.errorButtonStyle}
                titleStyle={styles.errorButtonText}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProjectSurveyEditPage;
