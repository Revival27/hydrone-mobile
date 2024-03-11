/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Chart, Home, Paper, Setting } from 'react-native-iconly';
import { Colors } from '../constants/colors';
import { AllSurveysPage, HomeScreen, ProjectsScreen, SettingScreen } from '../screens';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarActiveTintColor: Colors.primary_500,
        tabBarInactiveTintColor: Colors.grey_500,
        tabBarStyle: {
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarItemStyle: {
          height: 50,
          alignSelf: 'center',
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabelPosition: 'below-icon',
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ size, focused }) => <Home color={focused ? Colors.primary_500 : Colors.grey_500} size={size} set={focused ? 'bold' : 'light'} />,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Projects"
        options={{
          tabBarLabel: 'Projects',
          headerShown: false,
          tabBarIcon: ({ size, focused }) => <Chart color={focused ? Colors.primary_500 : Colors.grey_500} size={size} set={focused ? 'bold' : 'light'} />,
        }}
        component={ProjectsScreen}
      />
      <Tab.Screen
        name="Surveys"
        options={{
          tabBarLabel: 'Surveys',
          headerShown: false,
          tabBarIcon: ({ size, focused }) => <Paper color={focused ? Colors.primary_500 : Colors.grey_500} size={size} set={focused ? 'bold' : 'light'} />,
        }}
        component={AllSurveysPage}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarLabel: 'Settings',
          headerShown: false,
          tabBarIcon: ({ size, focused }) => <Setting color={focused ? Colors.primary_500 : Colors.grey_500} size={size} set={focused ? 'bold' : 'light'} />,
        }}
        component={SettingScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
