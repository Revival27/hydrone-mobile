import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ArrowLeft } from 'react-native-iconly';
import { RFValue } from 'react-native-responsive-fontsize';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../constants/colors';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
const MeasurementSurvey: FC<IProps> = ({ navigation }) => {
  const goBackToPreviousRoute = () => {
    const routes = navigation.getState()?.routes;
    navigation.navigate(routes[routes.length - 2]?.name.toString());
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity activeOpacity={1} style={styles.goBackArrow}>
        <View style={styles.backArrowContainer}>
          <ArrowLeft
            onPress={() => {
              goBackToPreviousRoute();
            }}
            color={Colors.grey_900}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MeasurementSurvey;

const styles = StyleSheet.create({
  goBackArrow: {
    width: ScreenWidth - 40,
    zIndex: 999,
  },
  backArrowContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 30,
    left: 30,
    marginBottom: 24,
  },
  backArrowText: {
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    color: Colors.grey_900,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    width: ScreenWidth,
    marginTop: 20,
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.grey_100,
  },
});
