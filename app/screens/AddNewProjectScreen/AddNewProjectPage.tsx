import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Button } from '@rneui/themed';

import BackgroundSlider from '../../components/BackgroundSlider';
import CustomTextArea from '../../components/CustomTextArea';
import Header from '../../components/Header/Header';
import { Colors } from '../../constants/colors';
import { AddProjectModel } from '../../data/models/projects/AddProjectModel';
import { addProject } from '../../store/projectsSlice';
import { AppDispatch, RootState } from '../../store/store';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const AddNewProjectPage: FC<IProps> = ({ navigation }) => {
  const goBackToPreviousRoute = () => {
    const routes = navigation.getState()?.routes;
    navigation.navigate(routes[routes.length - 2]?.name.toString());
  };

  const { t } = useTranslation();

  const dispatch: AppDispatch = useDispatch();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [background, setBackground] = useState(0);
  const newProject: AddProjectModel = {
    name: projectName,
    description: projectDescription,
    background_id: background,
  };

  const loading = useSelector((state: RootState) => state.loading.loading);

  const handleAddNewProject = async () => {
    await dispatch(addProject(newProject)).then(res => (res === 201 ? navigation.goBack() : null));
  };

  return (
    <>
      <Header backButton={true} goBack={goBackToPreviousRoute} title={t('project.new_project.header')} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid extraScrollHeight={25}>
        <View style={styles.contentContainer}>
          <Text style={styles.chooseBg}>Choose a background:</Text>
          <BackgroundSlider changeBg={value => setBackground(value)}>
            <TouchableOpacity style={styles.gradientContainer}>
              <Text style={styles.date}>No. of surveys</Text>
              <Text style={styles.title}>{projectName ? projectName : t('project.new_project.title')}</Text>
              <Text style={styles.description}>{projectDescription ? projectDescription : t('project.new_project.title')}</Text>
            </TouchableOpacity>
          </BackgroundSlider>
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>{t('project.new_project.title')}</Text>
            <View style={styles.inputField}>
              <TextInput
                maxLength={25}
                placeholder={t('project.new_project.title')}
                placeholderTextColor={Colors.grey_500}
                style={styles.inputText}
                value={projectName}
                onChangeText={text => setProjectName(text)}
              />
            </View>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.inputLabel}>{t('project.new_project.description')}</Text>
            <CustomTextArea
              placeholder={t('project.new_project.description')}
              placeholderTextColor={Colors.grey_500}
              value={projectDescription}
              onChangeText={text => setProjectDescription(text)}
            />
          </View>
          <Button
            onPress={handleAddNewProject}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.buttonStyle}
            loading={loading}
            loadingProps={{
              size: 'small',
              color: 'rgba(111, 202, 186, 1)',
            }}>
            {t('project.new_project.add_button')}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default AddNewProjectPage;
