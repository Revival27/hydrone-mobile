import React, { FC, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Edit, MoreCircle, Plus } from 'react-native-iconly';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

import EditPopup from '../../components/EditPopup/EditPopup';
import PopupRowElement from '../../components/EditPopup/PopupRowElement';
import Header from '../../components/Header/Header';
import InfoCard from '../../components/InfoCard/InfoCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import WarningModal from '../../components/WarningModal/WarningModal';
import { Colors } from '../../constants/colors';
import { deleteProject, editProject } from '../../store/projectsSlice';
import { RootState } from '../../store/store';
import { initializeSurveys } from '../../store/surveysSlice';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const ProjectPage: FC<IProps> = ({ navigation, route }) => {
  const { id } = route.params;

  const project: any = useSelector((state: RootState) => state.projects.projects.find(p => p.id === id));
  const [deleteModalVisible, setDeletModalVisible] = useState(false);
  const [removeSurveyModalVisible, setRemoveSurveyModalVisible] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const surveys = useSelector((state: RootState) => project && state.surveys.surveys.filter(survey => project.surveys.some(data => data.id === survey.id)));
  const mapRef: any = useRef();
  const location = useSelector((state: RootState) => state.location.location);
  const [removableSurveyID, setRemovableSurveyID] = useState(0);

  //all the coordinates to contain in View
  const coordinates: any = useMemo(() => surveys && surveys.map(({ latitude, longitude }) => ({ latitude, longitude })), [surveys]);

  //containing all the markers
  const containMarkers = () => {
    mapRef.current.fitToCoordinates(coordinates, {
      animated: false,
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    });
  };
  //rendering survey markers
  const Markers: any = () => {
    return surveys.map(survey => {
      return <Marker identifier={survey.name} key={survey.id} coordinate={{ latitude: survey.latitude, longitude: survey.longitude }} />;
    });
  };

  //user location if no surveys added
  const currentUserLocation = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDelete = () => {
    dispatch(deleteProject(id, () => (navigation.goBack(), dispatch(initializeSurveys()))));
  };

  const goToSurveyPage = surveyId =>
    navigation.navigate('ProjectSurveyScreen', {
      id: surveyId,
    });

  const navigateToAddNewSurvey = (surveyId: number) => {
    navigation.navigate('AddNewSurveyScreen', { id: surveyId });
    setIsPanelVisible(false);
  };

  const navigateToEditScreen = () => {
    setIsPanelVisible(false);
    navigation.navigate('EditProjectScreen', {
      id: id,
      name: project?.name,
      description: project?.description,
      projectSurveys: project?.surveys,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const removeSurveyFromProject = async (id: number) => {
    const filteredSurveyIDs = project.surveys.filter(survey => survey.id !== id).map(survey => survey.id);
    const newProject = {
      name: project.name,
      description: project.description,
      background_id: project.background_id,
      survey_ids: filteredSurveyIDs,
    };

    await dispatch(
      editProject(project.id, newProject, () => {
        setRemoveSurveyModalVisible(false);
      }),
    );
    dispatch(initializeSurveys());
  };

  const map = () => {
    if (surveys?.length > 1) {
      return (
        <MapView liteMode={true} ref={mapRef} minZoomLevel={5} onMapReady={containMarkers} provider={PROVIDER_GOOGLE} showsUserLocation={true} style={styles.map}>
          <Markers />
        </MapView>
      );
    } else if (surveys?.length === 1) {
      return (
        <MapView
          toolbarEnabled={false}
          liteMode={true}
          initialRegion={{
            latitude: surveys[0].latitude,
            longitude: surveys[0].longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}>
          <Marker coordinate={{ latitude: surveys[0].latitude, longitude: surveys[0].longitude }} />
        </MapView>
      );
    } else {
      return <MapView liteMode={true} region={currentUserLocation} provider={PROVIDER_GOOGLE} showsUserLocation={true} style={styles.map} />;
    }
  };

  return (
    <>
      <Header backButton={true} goBack={() => navigation.goBack()} title={project && project?.name.length > 15 ? `${project?.name.substring(0, 15)}...` : project?.name}>
        <MoreCircle hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} onPress={() => setIsPanelVisible(true)} color={Colors.grey_900} />
      </Header>
      {project !== null ? (
        <>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.numberOfSurveysContainer}>
                <Text style={styles.numberOfSurveysText}>{t('project.one_project.num_surveys')}</Text>
                <Text style={styles.numberOfSurveys}>{project?.surveys ? project.surveys?.length : 0}</Text>
              </View>

              <View style={styles.mapContainer}>{map()}</View>
              <View style={styles.lineStyle} />

              <InfoCard>
                <Text style={styles.descriptionHeader}>{t('project.one_project.description')}</Text>
                <Text style={styles.description}>{project?.description}</Text>
                {project?.surveys?.length > 0 ? <Text style={styles.descriptionHeader}>Surveys</Text> : null}
                <View style={styles.chipContainer}>
                  {project?.surveys?.length > 0
                    ? project?.surveys.map(survey => {
                        return (
                          <TouchableOpacity
                            onLongPress={() => {
                              setRemoveSurveyModalVisible(true);
                              setRemovableSurveyID(survey.id);
                            }}
                            onPress={() => goToSurveyPage(survey.id)}
                            style={styles.surveyChipsContainer}
                            key={survey.id}>
                            <Text style={styles.surveyChips}>{survey.name}</Text>
                          </TouchableOpacity>
                        );
                      })
                    : null}
                </View>
              </InfoCard>
            </View>
          </ScrollView>
          <EditPopup handlePress={() => setDeletModalVisible(true)} title={project?.name} isVisible={isPanelVisible} setIsVisible={setIsPanelVisible}>
            <PopupRowElement handlePress={navigateToEditScreen}>
              <Edit color={'black'} />
              <Text style={styles.rowText}>Edit</Text>
            </PopupRowElement>

            <PopupRowElement handlePress={() => navigateToAddNewSurvey(id)}>
              <Plus color={'black'} />
              <Text style={styles.rowText}>Add Survey</Text>
            </PopupRowElement>
          </EditPopup>
          <WarningModal
            setIsLoading={loading}
            cancel={() => setDeletModalVisible(false)}
            removeFunction={handleDelete}
            isVisible={deleteModalVisible}
            header={t('project.one_project.popup.title')}
            description={t('project.one_project.popup.delete_question')}
            buttonText={t('project.one_project.popup.button_delete')}
          />
          <WarningModal
            setIsLoading={loading}
            cancel={() => setRemoveSurveyModalVisible(false)}
            removeFunction={() => removeSurveyFromProject(removableSurveyID)}
            isVisible={removeSurveyModalVisible}
            header={'remove'}
            description={'remove survey from project?'}
            buttonText={'remove'}
          />
        </>
      ) : (
        <LoadingSpinner visible={true} title={'Loading'} description={''} />
      )}
    </>
  );
};

export default ProjectPage;
