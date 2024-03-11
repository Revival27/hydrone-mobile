import * as React from 'react';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';

/* eslint-disable prettier/prettier */
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { DarkModeContext } from '../context/DarkModeProvider';
import {
  AddNewProjectScreen,
  AddNewSurveyScreen,
  DjiGoScreen,
  EditPasswordScreen,
  EditProfileScreen,
  EditProjectScreen,
  ForgotPasswordScreen,
  ForgotPasswordVerifyScreen,
  GeneralDetailsSummaryScreen,
  GeneralMeasurementScreen,
  GettingStartedFinalScreen,
  GettingStartedScreen,
  GettingStartedSecondScreen,
  LandingScreen,
  LoginScreen,
  MeasurementDetailsScreen,
  Project,
  ProjectScreen,
  ProjectSurveyEditScreen,
  ProjectSurveyScreen,
  ProjectSurveysScreen,
  RegisterScreen,
  ResetPasswordScreen,
  RunningSurveyPage,
  SoilDetailsScreen,
  SoilDetailsSummaryScreen,
  SoilMeasurementScreen,
  Survey,
  SurveyMeasurementsScreen,
  VegetationDetailsScreen,
  VegetationDetailsSummaryScreen,
  VegetationMeasurementScreen,
  WaterDetailsScreen,
  WaterDetailsSummaryScreen,
  WaterMeasurementScreen,
  WelcomeLoginScreen,
} from '../screens';
import DroneInfo from '../screens/DroneInfo/DroneInfo';
import Faq from '../screens/FAQScreen/Faq';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen/TermsOfServiceScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen/VideoPlayerScreen';
import TabNavigator from './TabNavigator';

// Here you always need to add the screen if you want to use it in the Stack later on as in the example [Name of the Screen]: undefined
export type MainStackParamList = {
  AddNewProjectScreen: undefined;
  AddNewSurveyScreen: undefined;
  DroneInfoScreen: undefined;
  EditPasswordScreen: undefined;
  EditProfileScreen: undefined;
  EditProjectScreen: undefined;
  Faq: undefined;
  RunningSurveyPage: undefined;
  ForgotPasswordScreen: undefined;
  ForgotPasswordVerifyScreen: undefined;
  GettingStartedFinalScreen: undefined;
  GettingStartedScreen: undefined;
  GettingStartedSecondScreen: undefined;
  HomeScreen: undefined;
  LandingScreen: undefined;
  LoginScreen: undefined;
  MeasurementDetailsScreen: undefined;
  Project: undefined;
  ProjectScreen: undefined;
  ProjectsScreen: undefined;
  ProjectSurveyEditScreen: undefined;
  ProjectSurveyScreen: undefined;
  ProjectSurveysScreen: undefined;
  RegisterScreen: undefined;
  ResetPasswordScreen: undefined;
  Survey: undefined;
  SurveyMeasurementsScreen: undefined;
  TermsOfService: undefined;
  GeneralMeasurementScreen: undefined;
  GeneralDetailsSummaryScreen: undefined;
  SoilDetailsSummaryScreen: undefined;
  WelcomeLoginScreen: undefined;
  SoilMeasurementScreen: undefined;
  SoilDetailsScreen: undefined;
  WaterMeasurementScreen: undefined;
  WaterDetailsSummaryScreen: undefined;
  WaterDetailsScreen: undefined;
  VegetationMeasurementScreen: undefined;
  DJIGoScreen: undefined;
  VegetationDetailsSummaryScreen: undefined;
  VegetationDetailsScreen: undefined;
  VideoPlayerScreen: undefined;
};

const customDefaultTheme = {
  myOwnProperty: true,
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  ...Colors,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    ...Colors,
    background: '#ffffff',
    text: Colors.grey_900,
  },
};

const customDarkTheme = {
  myOwnProperty: true,
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  ...Colors,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    ...Colors,
    background: '#333333',
    text: '#ffffff',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type themeOverride = typeof customDarkTheme | typeof customDefaultTheme;

const MainStack = createNativeStackNavigator<MainStackParamList>();
// Here you also need to specify the route parameters for each screen
const Screens = () => {
  const { darkMode }: any = React.useContext(DarkModeContext);

  const theme: any = darkMode ? customDarkTheme : customDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <MainStack.Navigator
          initialRouteName="LandingScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <MainStack.Screen name="LandingScreen" component={LandingScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="GettingStartedScreen" component={GettingStartedScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="HomeScreen" component={TabNavigator} options={{ headerShown: false, orientation: 'portrait' }} />
          <MainStack.Screen name="GettingStartedSecondScreen" component={GettingStartedSecondScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="GettingStartedFinalScreen" component={GettingStartedFinalScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="WelcomeLoginScreen" component={WelcomeLoginScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="MeasurementDetailsScreen" component={MeasurementDetailsScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="ForgotPasswordVerifyScreen" component={ForgotPasswordVerifyScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="EditPasswordScreen" component={EditPasswordScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="AddNewProjectScreen" component={AddNewProjectScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="AddNewSurveyScreen" component={AddNewSurveyScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="ProjectSurveysScreen" component={ProjectSurveysScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="ProjectSurveyScreen" component={ProjectSurveyScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="SoilMeasurementScreen" component={SoilMeasurementScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="WaterMeasurementScreen" component={WaterMeasurementScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="VegetationMeasurementScreen" component={VegetationMeasurementScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="GeneralDetailsSummaryScreen" component={GeneralDetailsSummaryScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="SoilDetailsSummaryScreen" component={SoilDetailsSummaryScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="SoilDetailsScreen" component={SoilDetailsScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="VegetationDetailsSummaryScreen" component={VegetationDetailsSummaryScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="VegetationDetailsScreen" component={VegetationDetailsScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="WaterDetailsSummaryScreen" component={WaterDetailsSummaryScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="WaterDetailsScreen" component={WaterDetailsScreen} options={{ orientation: 'portrait' }} />

          {/*@ts-ignore*/}
          <MainStack.Screen name="Survey" component={Survey} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="SurveyMeasurementsScreen" component={SurveyMeasurementsScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="GeneralMeasurementScreen" component={GeneralMeasurementScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="ProjectScreen" component={ProjectScreen} options={{ orientation: 'portrait' }} />
          {/*@ts-ignore*/}
          <MainStack.Screen name="Project" component={Project} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="ProjectSurveyEditScreen" component={ProjectSurveyEditScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="EditProjectScreen" component={EditProjectScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="LoginScreen" component={LoginScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="RegisterScreen" component={RegisterScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="ProjectsScreen" component={TabNavigator} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="TermsOfService" component={TermsOfServiceScreen} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="Faq" component={Faq} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="DroneInfoScreen" component={DroneInfo} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="RunningSurveyPage" component={RunningSurveyPage} options={{ orientation: 'portrait' }} />
          <MainStack.Screen name="DJIGoScreen" component={DjiGoScreen} options={{ orientation: 'landscape' }} />
          <MainStack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Screens;
