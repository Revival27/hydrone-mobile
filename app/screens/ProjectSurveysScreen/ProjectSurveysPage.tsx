/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Paper, Search } from 'react-native-iconly';

import { NavigationProp, ParamListBase, useIsFocused } from '@react-navigation/native';

import LoadingSpinner from '../../components/LoadingSpinner';
import NoItems from '../../components/NoItems/NoItems';
import Survey from '../../components/Survey';
import { projectSurveysUrl } from '../../constants/apiUrls';
import { Colors } from '../../constants/colors';
import { AxiosInstance } from '../../data/api/auth/AxiosInstance';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const ProjectSurveysPage: FC<IProps> = ({ navigation, route }) => {
  const [visible, setVisible] = useState(false);
  const [projectSurveys, setProjectSurveys] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id, name } = route.params;
  const isFocused = useIsFocused();

  const { t } = useTranslation();

  const goBackToPreviousRoute = () => {
    const routes = navigation.getState()?.routes;
    navigation.navigate(routes[routes.length - 2]?.name.toString(), { id: id });
  };

  useEffect(() => {
    const getProjectSurveys = () => {
      setIsLoading(true);
      AxiosInstance.get(`${projectSurveysUrl}${id}/get-surveys`)
        .then(function (response) {
          setProjectSurveys(response.data);
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          setIsLoading(false);
        });
    };
    isFocused && getProjectSurveys();
  }, [isFocused]);

  return (
    <>
      {isLoading === false ? (
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={1} style={styles.goBackArrow}>
            <View style={styles.backArrowContainer}>
              <ArrowLeft
                onPress={() => {
                  goBackToPreviousRoute();
                }}
                color={Colors.grey_900}
              />
              <Text style={styles.backArrowText}>{name}</Text>
              <View style={styles.searchContainer}>
                <Search color={Colors.grey_900} onPress={() => setVisible(true)} />
              </View>
            </View>
          </TouchableOpacity>
          {projectSurveys.length > 0 ? (
            <View style={styles.scrollViewContainer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                  {projectSurveys.map((survey: any) => (
                    //@ts-ignore
                    <Survey
                      project_id={id}
                      key={survey.id}
                      id={survey.id}
                      name={survey.name}
                      projectName={name}
                      description={survey.description}
                      updated_at={survey.updated_at}
                      latitude={survey.latitude}
                      longitude={survey.longitude}
                      background_id={survey.background_id}
                      navigation={navigation}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          ) : (
            <NoItems
              navigateTo={() => navigation.navigate('AddNewSurveyScreen', { id: null })}
              Icon={<Paper set="bulk" primaryColor={Colors.primary_500} size={87} />}
              title={t('survey.all_surveys.no_surveys')}
              description={t('survey.new_survey.add_button')}
            />
          )}
        </View>
      ) : (
        <LoadingSpinner visible={true} title={'Loading'} description={''} />
      )}
    </>
  );
};

export default ProjectSurveysPage;
