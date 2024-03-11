import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { Chart, User } from 'react-native-iconly';
import { useTheme } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenHeight } from '@rneui/base';

import Logo from '../../assets/images/icons/AppLogo.svg';
import CustomButton from '../../components/Button';
import HomeDashBoard from '../../components/HomeDashBoard/HomeDashBoard';
import NoItems from '../../components/NoItems/NoItems';
import Project from '../../components/Project';
import WarningModal from '../../components/WarningModal/WarningModal';
import { Colors } from '../../constants/colors';
import { useBackHandler } from '../../hooks/useBackHandler';
import { setLocation } from '../../store/locationSlice';
import { RootState } from '../../store/store';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: FC<IProps> = ({ navigation }) => {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { colors } = useTheme();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const { t } = useTranslation();

  useBackHandler(() => {
    if (true) {
      setIsModalVisible(true);
      return true;
    }
  });

  const latestProjects = projects.slice(0, projects.length >= 3 ? 3 : projects.length);

  const showAllProjects = () => {
    navigation.navigate('Projects');
  };

  const LatestProjects: any = () => {
    return latestProjects.map((project: any) => {
      return (
        <View key={project.id}>
          <Project
            surveys={project.surveys}
            navigation={navigation}
            background_id={project.background_id}
            key={project.id}
            id={project.id}
            title={project.name}
            description={project.description}
            updated_at={project.updated_at}
          />
        </View>
      );
    });
  };

  useEffect(() => {
    //*location tracking
    const loc = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        dispatch(setLocation({ latitude, longitude }));
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      },
    );

    //   * cleanup function for location tracking
    return () => {
      if (loc) {
        Geolocation.clearWatch(loc);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header_left}>
            <Logo style={styles.logo} />
            <View>
              <Text style={[styles.headerText, { color: colors.text }]}>{t('home.hello')}</Text>
              <Text style={[styles.nameText, { color: colors.text }]}>{profile?.name}</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.buttonCircle}>
            <User set="bold" primaryColor={Colors.primary_500} size={25} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HomeDashBoard navigation={navigation} />
          <View style={styles.allProjectsContainer}>
            <Text style={[styles.projectsText, { color: colors.text }]}>{t('home.projects')}</Text>
            <CustomButton
              paddings={[18, 14, 18, 14]}
              backgroundColor={'transparent'}
              text={t('home.show_all')}
              color={Colors.primary_500}
              size={RFValue(16, ScreenHeight)}
              onPress={showAllProjects}
            />
          </View>
          <View style={styles.project}>
            {Object.keys(projects).length > 0 ? (
              <LatestProjects />
            ) : (
              <NoItems
                navigateTo={() => navigation.navigate('AddNewProjectScreen')}
                Icon={<Chart set="bulk" primaryColor={Colors.primary_500} size={87} />}
                description={t('project.new_project.add_button')}
                title={t('project.all_projects.no_projects')}
              />
            )}
          </View>
        </ScrollView>
      </View>
      <WarningModal
        setIsLoading={loading}
        cancel={() => setIsModalVisible(false)}
        removeFunction={() => {
          setIsModalVisible(false);
          BackHandler.exitApp();
        }}
        isVisible={isModalVisible}
        header={t('landing.exit_app.confirm')}
        description={t('landing.exit_app.body')}
        buttonText={t('landing.exit_app.confirm')}
      />
    </>
  );
};

export default HomeScreen;
