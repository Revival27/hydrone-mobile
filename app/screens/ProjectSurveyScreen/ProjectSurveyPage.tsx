import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Edit, MoreCircle } from 'react-native-iconly';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenHeight } from '@rneui/base';

import BlueButton from '../../components/BlueButton/BlueButton';
import EditPopup from '../../components/EditPopup/EditPopup';
import PopupRowElement from '../../components/EditPopup/PopupRowElement';
import Header from '../../components/Header/Header';
import InfoCard from '../../components/InfoCard/InfoCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import WarningModal from '../../components/WarningModal/WarningModal';
import { Colors } from '../../constants/colors';
import { RootState } from '../../store/store';
import { deleteSurvey } from '../../store/surveysSlice';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const SurveyPage: FC<IProps> = ({ navigation, route }) => {
  const { id, name, PROJECT_ID } = route.params;
  const { t } = useTranslation();
  const survey: any = useSelector((state: RootState) => state.surveys.surveys.find(s => s.id === id));
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteSurvey = async () => {
    await dispatch(deleteSurvey(id));
    navigation.goBack();
  };

  const displayedLocation = `${survey?.latitude} - ${survey?.longitude}`;

  return (
    <>
      <Header backButton={true} goBack={() => navigation.goBack()} title={survey?.name.length > 15 ? `${survey?.name.substring(0, 15)}...` : survey?.name}>
        <MoreCircle hitSlop={{ top: 12, bottom: 12, right: 12, left: 12 }} onPress={() => setIsPanelVisible(true)} color={Colors.grey_900} />
      </Header>
      {survey ? (
        <>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.lineStyle} />
              <View>
                <View style={styles.coordinatesContainer}>
                  <Text style={styles.pageText}>{displayedLocation}</Text>
                </View>

                <View style={styles.mapContainer}>
                  <MapView
                    liteMode={true}
                    toolbarEnabled={false}
                    initialRegion={{
                      latitude: survey.latitude,
                      longitude: survey.longitude,
                      latitudeDelta: 0.015,
                      longitudeDelta: 0.0121,
                    }}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    showsUserLocation={true}>
                    <Marker coordinate={{ latitude: survey.latitude, longitude: survey.longitude }} />
                  </MapView>
                </View>
              </View>
              <View style={styles.lineStyle} />
              <InfoCard>
                <Text style={styles.descriptionHeader}>{t('survey.one_survey.description')}</Text>
                <Text style={styles.description}>{survey.description}</Text>
                <View style={styles.chipItemsContainer}>
                  {survey.projects && survey.projects.length > 0 && <Text style={styles.surveyProjectHeader}>{t('survey.one_survey.projectsChipHeader')}</Text>}
                  {survey.projects && survey.projects.length > 0
                    ? survey.projects.map(project => (
                        <TouchableOpacity
                          onPress={() => navigation.navigate('ProjectScreen', { id: project.id, name, survey_id: survey.id })}
                          style={styles.projectChipItem}
                          key={project.id}>
                          <Text style={styles.projectChipItemTitle}>{project.name}</Text>
                        </TouchableOpacity>
                      ))
                    : null}
                </View>
              </InfoCard>
              <View style={styles.blueButtonContainer}>
                <BlueButton title={'Start Measurement'} handleClick={() => navigation.navigate('RunningSurveyPage', { id: id })} />
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <LoadingSpinner visible={true} title={'Loading'} description={''} />
      )}
      <EditPopup height={ScreenHeight / 3.5} handlePress={() => setIsModalVisible(true)} title={survey?.name} isVisible={isPanelVisible} setIsVisible={setIsPanelVisible}>
        <PopupRowElement
          handlePress={() => {
            setIsPanelVisible(false);
            navigation.navigate('ProjectSurveyEditScreen', { id: id, name: survey.name, description: survey.description, PROJECT_ID: PROJECT_ID });
          }}>
          <Edit color={Colors.grey_900} />
          <Text style={styles.rowElementText}>Edit</Text>
        </PopupRowElement>
      </EditPopup>
      <WarningModal
        setIsLoading={loading}
        cancel={() => setIsModalVisible(false)}
        removeFunction={handleDeleteSurvey}
        isVisible={isModalVisible}
        header={t('survey.one_survey.popup.title')}
        description={t('survey.one_survey.popup.description')}
        buttonText={'Delete'}
      />
    </>
  );
};

export default SurveyPage;
