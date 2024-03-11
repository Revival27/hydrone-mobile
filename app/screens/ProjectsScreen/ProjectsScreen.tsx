import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListRenderItem, View, VirtualizedList } from 'react-native';
import { Chart, Plus, Search } from 'react-native-iconly';
import { shallowEqual, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Header from '../../components/Header/Header';
import NoItems from '../../components/NoItems/NoItems';
import Project from '../../components/Project';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Colors } from '../../constants/colors';
import { RootState } from '../../store/store';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

interface ProjectContainerProps {
  navigation: NavigationProp<ParamListBase>;
  searchTerm: string;
}

const ProjectContainer: FC<ProjectContainerProps> = ({ navigation, searchTerm }) => {
  const allProjects = useSelector((state: RootState) => state.projects.projects, shallowEqual);
  const filteredProjects = useMemo(() => allProjects.filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm, allProjects]);
  const { t } = useTranslation();

  const getItem = (data, index) => {
    return data[index];
  };

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <Project
      navigation={navigation}
      background_id={item.background_id}
      key={item.id}
      id={item.id}
      title={item.name}
      description={item.description}
      updated_at={item.updated_at}
      surveys={item.surveys}
    />
  );

  if (allProjects.length === 0) {
    return (
      <NoItems
        navigateTo={() => navigation.navigate('AddNewProjectScreen')}
        Icon={<Chart set="bulk" primaryColor={Colors.primary_500} size={87} />}
        description={t('project.new_project.add_button')}
        title={t('project.all_projects.no_projects')}
      />
    );
  } else if (searchTerm !== '' && filteredProjects.length === 0) {
    return (
      <NoItems
        Icon={<Search set="bulk" primaryColor={Colors.primary_500} size={87} />}
        title={t('survey.all_surveys.no_results_title')}
        description={t('survey.all_surveys.no_results_description')}
      />
    );
  } else {
    return <VirtualizedList data={filteredProjects} initialNumToRender={4} renderItem={renderItem} getItemCount={() => filteredProjects.length} getItem={getItem} />;
  }
};

const ProjectsScreen: FC<IProps> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { t } = useTranslation();

  return (
    <>
      <Header backButton={false} title={t('project.all_projects.header')}>
        <SearchBar callback={setSearchTerm} />
        <Plus color={Colors.grey_900} onPress={() => navigation.navigate('AddNewProjectScreen')} />
      </Header>
      <View style={styles.wrapper}>
        <ProjectContainer navigation={navigation} searchTerm={searchTerm} />
      </View>
    </>
  );
};

export default ProjectsScreen;
