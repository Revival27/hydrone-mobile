import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Edit, InfoSquare, Play, Plus } from 'react-native-iconly';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Bluetooth from '../../assets/images/icons/bluetooth.svg';
import Bg from '../../assets/images/icons/homeBg.svg';
import { Colors } from '../../constants/colors';
import { connectDrone } from '../../store/droneSlice';
import { RootState } from '../../store/store';
import { failedMessage } from '../../tools/ToastMessages/Messages';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}
interface ControllerProps {
  children?: React.ReactNode;
}

interface ControllerButtonProps {
  text: string;
  icon: React.ReactNode;
  handlePress?: any;
}

const ControllerBoard: FC<ControllerProps> = ({ children }) => {
  const removed = useSelector((state: RootState) => state.drone.removed);
  const dispatch = useDispatch();

  return (
    <View style={styles.controllerBoard}>{removed ? <Plus color={Colors.primary_500} size={36} set="bold" onPress={() => dispatch(connectDrone())} /> : <>{children}</>}</View>
  );
};

const ControllerButton: FC<ControllerButtonProps> = ({ text, icon, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
      <View style={styles.buttonCircle}>{icon}</View>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const HomeDashBoard: FC<IProps> = ({ navigation }) => {
  const [fullBatteryDots, setFullBatteryDots] = useState(0);
  const [emptyBatteryDots, setEmptyBatteryDots] = useState(0);
  const batteryLevel = useSelector((state: RootState) => state.drone.battery);
  const connected = useSelector((state: RootState) => state.drone.connected);
  const profile = useSelector((state: RootState) => state.auth.profile);
  const dispatch = useDispatch();
  const removed = useSelector((state: RootState) => state.drone.removed);

  const getBatteryLevel = value => {
    if (value === 0) {
      setFullBatteryDots(0);
      setEmptyBatteryDots(5);
    } else if (value > 0 && value < 20) {
      setFullBatteryDots(1);
      setEmptyBatteryDots(4);
    } else if (value >= 20 && value < 40) {
      setFullBatteryDots(2);
      setEmptyBatteryDots(3);
    } else if (value >= 40 && value < 60) {
      setFullBatteryDots(3);
      setEmptyBatteryDots(2);
    } else if (value >= 60 && value < 80) {
      setFullBatteryDots(4);
      setEmptyBatteryDots(1);
    } else if (value >= 80 && value <= 100) {
      setFullBatteryDots(5);
      setEmptyBatteryDots(0);
    }
  };

  useEffect(() => {
    getBatteryLevel(batteryLevel);
  }, [batteryLevel]);

  const { t } = useTranslation();
  const droneImage = require('../../assets/images/illustrations/home_drone.png');

  const fullDots = Array.from({ length: fullBatteryDots }, () => {
    return <View key={Math.floor(Math.random() * 1000)} style={styles.batteryDot} />;
  });

  const emptyDots = Array.from({ length: emptyBatteryDots }, () => {
    return <View key={Math.floor(Math.random() * 1000)} style={styles.emptyBatteryDot} />;
  });

  return (
    <LinearGradient colors={['#246BFD', '#6F9EFF']} useAngle style={styles.container}>
      <Bg style={styles.background} />
      <View style={styles.headerContainer}>
        {removed ? (
          <Text style={styles.title}>Connect a drone to start</Text>
        ) : (
          <>
            <Text style={styles.title}>{t('home.dashboard.header', { name: `${profile.name}` })}</Text>
            <View style={styles.batteryDotContainer}>
              {connected ? (
                <>
                  {fullDots}
                  {emptyDots}
                </>
              ) : (
                <Text style={styles.disconnected}>Disconnected</Text>
              )}
            </View>
          </>
        )}
      </View>
      <Image source={droneImage} style={removed ? styles.removedDrone : styles.droneImage} />
      <ControllerBoard>
        {connected ? (
          <ControllerButton handlePress={() => navigation.navigate('AddNewProjectScreen')} text="Start" icon={<Edit color={Colors.primary_500} set="bold" />} />
        ) : (
          <ControllerButton
            handlePress={() => {
              failedMessage("Couldn't connect to Drone.");
              dispatch(connectDrone);
            }}
            text="Connect"
            icon={<Bluetooth />}
          />
        )}
        <ControllerButton handlePress={() => navigation.navigate('DroneInfoScreen')} text="Info" icon={<InfoSquare color={Colors.primary_500} set="bold" />} />
        <ControllerButton handlePress={() => navigation.navigate('DJIGoScreen')} text="Fly drone" icon={<Play primaryColor={Colors.primary_500} set="bold" />} />
      </ControllerBoard>
    </LinearGradient>
  );
};

export default HomeDashBoard;
