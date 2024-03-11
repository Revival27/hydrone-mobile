import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Button } from '@rneui/themed';

import Warning from '../../assets/images/icons/warning.svg';
import CustomTextArea from '../../components/CustomTextArea';
import DropDownSelector from '../../components/DropDown/DropDownSelector';
import Header from '../../components/Header/Header';
import { Colors } from '../../constants/colors';
import { MapDragEvent } from '../../data/models/map';
import { AppDispatch, RootState } from '../../store/store';
import { addSurvey } from '../../store/surveysSlice';
import { Location, LOCATION_REGEX } from '../../tools/Location';
import { getRandomIndex } from '../../tools/random';
import { styles } from './styles.module';

interface OptionProps {
  label: string | null;
  value: number | null;
}
interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const AddNewSurveyPage: FC<IProps> = ({ navigation, route }) => {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState<OptionProps[] | null>([]);
  const { id }: any = route?.params;
  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentLocation = useSelector((state: RootState) => state.location.location);
  const [invalidLocFormat, setInvalidLocFormat] = useState(false);

  const [prevLocation, setPrevLocation] = useState<Location>({
    latitude: currentLocation.latitude.toFixed(10),
    longitude: currentLocation.longitude.toFixed(10),
  });
  const [tempLocation, setTempLocation] = useState<Location>({
    latitude: currentLocation.latitude.toFixed(10),
    longitude: currentLocation.longitude.toFixed(10),
  });

  const [survey, setSurvey] = useState({
    name: '',
    description: '',
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    survey_class: 'Test Survey Class',
    project_ids: id ? [id] : null,
    background_id: getRandomIndex(),
  });

  const { t } = useTranslation();

  useEffect(() => {
    const arr: Array<OptionProps> = [];
    projects.map(project => {
      const option = {
        label: project.name,
        value: project.id,
      };
      arr.push(option);
      return arr;
    });

    setItems([...arr]);
  }, [projects]);

  const hideToolTip = () => {
    setIsTooltipVisible(false);
  };

  const savePrevLocation = () => {
    setPrevLocation({ latitude: survey.latitude.toFixed(10), longitude: survey.longitude.toFixed(10) });
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const handleDragLocationChange = (e: MapDragEvent) => {
    const fixedLoc = {
      latitude: e.nativeEvent.coordinate.latitude.toFixed(10),
      longitude: e.nativeEvent.coordinate.longitude.toFixed(10),
    };
    setSurvey(prev => ({ ...prev, latitude: Number(fixedLoc.latitude), longitude: Number(fixedLoc.longitude) }));
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
  };

  const confirmInputLocation = () => {
    if (!LOCATION_REGEX.test(`${tempLocation.latitude}-${tempLocation.longitude}`)) {
      setInvalidLocFormat(true);
      return;
    }
    setSurvey(prev => ({ ...prev, latitude: Number(tempLocation.latitude), longitude: Number(tempLocation.longitude) }));
    setInvalidLocFormat(false);
  };

  const confirmModal = () => {
    setIsModalVisible(false);
  };

  const cancel = () => {
    setSurvey(prev => ({ ...prev, latitude: Number(prevLocation.latitude), longitude: Number(prevLocation.longitude) }));
    setIsModalVisible(false);
    setTempLocation(prevLocation);
  };

  const add = async () => {
    // adding survey from projectPage
    if (id !== null) {
      await dispatch(addSurvey(survey, () => navigation.goBack()));
      //adding survey from Survey page, connecting a project
    } else if (value.length !== 0) {
      const newSurvey = { ...survey, project_ids: [...value] };
      await dispatch(addSurvey(newSurvey, () => navigation.goBack()));
      // adding survey from Survey page, without project
    } else {
      await dispatch(addSurvey(survey, () => navigation.goBack()));
    }
  };

  const userLocation = {
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  return (
    <>
      <Header backButton={true} goBack={() => navigation.goBack()} title={t('survey.new_survey.header')} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid extraScrollHeight={25} nestedScrollEnabled={true} style={[styles.container]}>
        <View style={styles.contentContainer}>
          <View style={styles.mapContainer}>
            <MapView toolbarEnabled={false} initialRegion={userLocation} provider={PROVIDER_GOOGLE} showsUserLocation={true} style={styles.map}>
              <Marker
                onDragStart={hideToolTip}
                draggable
                coordinate={{ latitude: Number(survey.latitude), longitude: Number(survey.longitude) }}
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
          <View>
            <Text style={styles.inputLabel}>Survey Location</Text>
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
          </View>
          <View>
            <Text style={styles.inputLabel}>{t('survey.new_survey.title')}</Text>
            <View style={styles.inputField}>
              <TextInput
                maxLength={25}
                placeholder={t('survey.new_survey.title')}
                placeholderTextColor={Colors.grey_500}
                style={styles.inputText}
                value={survey.name}
                onChangeText={text => setSurvey({ ...survey, name: text })}
              />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabel}>{t('survey.new_survey.description')}</Text>
            <CustomTextArea
              placeholder={t('survey.new_survey.description')}
              placeholderTextColor={Colors.grey_500}
              value={survey.description}
              onChangeText={text => setSurvey({ ...survey, description: text })}
            />
          </View>

          {!id ? (
            <View style={styles.surveyProjects}>
              <Text style={styles.projectsHeader}>{t('survey.new_survey.survey_projects')}</Text>
              <DropDownSelector value={value} items={items} setValue={setValue} />
            </View>
          ) : null}

          <Button
            onPress={add}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.buttonStyle}
            loading={loading}
            loadingProps={{
              size: 'small',
              color: 'rgba(111, 202, 186, 1)',
            }}>
            {t('survey.new_survey.add_button')}
          </Button>
        </View>
      </KeyboardAwareScrollView>
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

export default AddNewSurveyPage;
