import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListRenderItem, View, VirtualizedList } from 'react-native';
import { Paper, Plus, Search } from 'react-native-iconly';
import { shallowEqual, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Header from '../../components/Header/Header';
import NoItems from '../../components/NoItems/NoItems';
import SearchBar from '../../components/SearchBar/SearchBar';
import Survey from '../../components/Survey';
import { Colors } from '../../constants/colors';
import { RootState } from '../../store/store';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}
interface SurveyInterface {
  id: number;
  project_id: number;
  name: string;
  projectName?: string;
  description: string;
  updated_at: string;
  latitude: number;
  longitude: number;
  background_id: number;
  navigation: NavigationProp<ParamListBase>;
  measurements_image_count: number | 0;
  measurements_video_count: number | 0;
  measurements: any[];
}

interface SurveyContainerProps {
  navigation: NavigationProp<ParamListBase>;
  searchTerm: string;
}

const SurveyContainer: FC<SurveyContainerProps> = ({ navigation, searchTerm }) => {
  const allSurveys = useSelector((state: RootState) => state.surveys.surveys, shallowEqual);
  const filteredSurveys = useMemo(() => allSurveys.filter(survey => survey.name.toLowerCase().includes(searchTerm.toLowerCase())), [allSurveys, searchTerm]);
  const { t } = useTranslation();

  const renderItem: ListRenderItem<SurveyInterface> = ({ item }) => (
    <Survey
      key={item.id}
      project_id={item.project_id}
      id={item.id}
      name={item.name}
      description={item.description}
      updated_at={item.updated_at}
      latitude={item.latitude}
      longitude={item.longitude}
      background_id={item.background_id}
      navigation={navigation}
      noOfVideos={item.measurements_video_count}
      noOfImages={item.measurements_image_count}
      noOfMeasurements={item.measurements.length}
    />
  );

  const getItem = (data, index) => {
    return data[index];
  };

  if (allSurveys.length === 0) {
    return (
      <NoItems
        navigateTo={() => navigation.navigate('AddNewSurveyScreen', { id: null })}
        Icon={<Paper set="bulk" primaryColor={Colors.primary_500} size={87} />}
        title={t('survey.all_surveys.no_surveys')}
        description={t('survey.new_survey.add_button')}
      />
    );
  } else if (searchTerm !== '' && filteredSurveys.length === 0) {
    return (
      <NoItems
        Icon={<Search set="bulk" primaryColor={Colors.primary_500} size={87} />}
        title={t('survey.all_surveys.no_results_title')}
        description={t('survey.all_surveys.no_results_description')}
      />
    );
  } else {
    return <VirtualizedList data={filteredSurveys} initialNumToRender={4} renderItem={renderItem} getItemCount={() => filteredSurveys.length} getItem={getItem} />;
  }
};

const AllSurveysPage: FC<IProps> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  return (
    <>
      <Header backButton={false} title={t('survey.all_surveys.header')}>
        <SearchBar callback={setSearchTerm} />
        <Plus color={Colors.grey_900} onPress={() => navigation.navigate('AddNewSurveyScreen', { id: null })} />
      </Header>
      <View style={styles.wrapper}>
        <SurveyContainer searchTerm={searchTerm} navigation={navigation} />
      </View>
    </>
  );
};

export default AllSurveysPage;
