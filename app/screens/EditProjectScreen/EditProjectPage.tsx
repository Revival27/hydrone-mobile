import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable react-native/no-inline-styles */
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Button } from '@rneui/themed';

import CustomTextArea from '../../components/CustomTextArea';
import DropDownSelector from '../../components/DropDown/DropDownSelector';
import Header from '../../components/Header/Header';
import { Colors } from '../../constants/colors';
import { editProject } from '../../store/projectsSlice';
import { AppDispatch, RootState } from '../../store/store';
import { initializeSurveys } from '../../store/surveysSlice';
import { styles } from './styles.module';

interface OptionProps {
  label: string | null;
  value: number | null;
}
interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const EditProjectPage: FC<IProps> = ({ navigation, route }) => {
  const { id, name, description, projectSurveys } = route.params;
  const allSurvey = useSelector((state: RootState) => state.surveys.surveys);
  const [projectName, setProjectName] = useState(name);
  const [projectDescription, setProjectDescription] = useState(description);
  const project: any = useSelector((state: RootState) => state.projects.projects.find(p => p.id === id));
  const [value, setValue] = useState([]);
  const [items, setItems] = useState<OptionProps[] | null>([]);
  const dispatch: AppDispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.loading.loading);

  const { t } = useTranslation();

  useEffect(() => {
    const arr: Array<OptionProps> = [];
    let onlyAvailableSurveys: Array<OptionProps> = [];
    allSurvey.map(survey => {
      const option = {
        label: survey.name,
        value: survey.id,
      };
      arr.push(option);
      return arr;
    });

    const surveyIds = projectSurveys.map(survey => survey.id);
    onlyAvailableSurveys = arr.filter(survey => !surveyIds.includes(survey.value));

    setItems([...onlyAvailableSurveys]);
  }, [allSurvey, projectSurveys]);

  const getSurveyIds = () => project.surveys.map(survey => survey.id);

  const handleUpdateProject = async () => {
    const addedSurveys = value === null ? [...getSurveyIds()] : [...getSurveyIds(), ...value];

    const editedProject = {
      name: projectName,
      description: projectDescription,
      background_id: project.background_id,
      survey_ids: addedSurveys,
    };
    await dispatch(editProject(id, editedProject, () => navigation.goBack()));
    dispatch(initializeSurveys());
  };

  return (
    <>
      <Header backButton={true} goBack={() => navigation.goBack()} title={t('project.edit_project.header')} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid extraScrollHeight={25} style={styles.container}>
        <View style={styles.contentContainer}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={styles.inputLabel}>{t('project.edit_project.title')}</Text>
            <View style={styles.inputField}>
              <TextInput placeholderTextColor={Colors.grey_500} style={styles.inputText} defaultValue={name} value={projectName} onChangeText={text => setProjectName(text)} />
            </View>
          </View>

          <View
            style={{
              marginTop: 35,
              alignItems: 'center',
            }}>
            <Text style={styles.inputLabel}>{t('project.edit_project.description')}</Text>
            <CustomTextArea value={projectDescription} onChangeText={text => setProjectDescription(text)} />
          </View>
          <View style={styles.projectSurveys}>
            <Text style={styles.projectSurveysHeader}>{t('project.edit_project.surveyHeader')}</Text>
            <DropDownSelector value={value} items={items} setValue={setValue} />
          </View>
          <Button
            onPress={handleUpdateProject}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.buttonStyle}
            loading={loading}
            loadingProps={{
              size: 'small',
              color: 'rgba(111, 202, 186, 1)',
            }}>
            {t('project.edit_project.button_save')}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default EditProjectPage;
