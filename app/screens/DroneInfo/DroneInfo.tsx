/* eslint-disable react-native/no-inline-styles */
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, ScrollView, Text, View } from 'react-native';
import { TimeCircle } from 'react-native-iconly';
import { useDispatch, useSelector } from 'react-redux';
import Bluetooth from '../../assets/images/icons/bluetooth.svg';
import BlueButton from '../../components/BlueButton/BlueButton';
import Header from '../../components/Header/Header';
import { Colors } from '../../constants/colors';
import { connectDrone, disconnectDrone, removeDrone } from '../../store/droneSlice';
import { RootState } from '../../store/store';
import { floating } from './droneAnimations';
import { styles } from './styles.module';

const drone = require('../../assets/images/illustrations/drone.png');
const disconnectedDrone = require('../../assets/images/illustrations/disconnected_drone.png');
interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}
interface CardProps {
  title: string;
  children: any;
}

const Card: FC<CardProps> = ({ title, children }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      {children}
    </View>
  );
};

const ConnectedButton = () => {
  return <Text style={styles.connected}>Connected</Text>;
};

const DisconnectedButton = () => {
  return <Text style={styles.disconnected}>Disconnected</Text>;
};

const DroneInfo: FC<IProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const USERNAME = useSelector((state: RootState) => state.auth.profile.name);
  const DEVICE_NAME = useSelector((state: RootState) => state.drone.device);
  const [posY] = useState(new Animated.Value(0));
  const isConnected = useSelector((state: RootState) => state.drone.connected);
  const battery = useSelector((state: RootState) => state.drone.battery);
  const flightTime = useSelector((state: RootState) => state.drone.flightTime);
  const [fullBatteryDots, setFullBatteryDots] = useState(0);
  const [emptyBatteryDots, setEmptyBatteryDots] = useState(0);
  const dispatch = useDispatch();
  const removed = useSelector((state: RootState) => state.drone.removed);

  const fullDots = Array.from({ length: fullBatteryDots }, () => {
    return <View key={Math.floor(Math.random() * 1000)} style={styles.batteryDot} />;
  });

  const emptyDots = Array.from({ length: emptyBatteryDots }, () => {
    return <View key={Math.floor(Math.random() * 1000)} style={styles.emptyBatteryDot} />;
  });

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
    getBatteryLevel(battery);
  }, [battery]);

  useEffect(() => {
    floating(posY, isConnected);
  }, [isConnected, posY]);

  const toggleDroneConnection = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isConnected ? dispatch(disconnectDrone()) : dispatch(connectDrone());
  };

  return (
    <View style={styles.container}>
      <Header title={t('drone_info.header')} backButton={true} goBack={() => navigation.goBack()} />
      <ScrollView style={{ flex: 1 }}>
        {!removed ? (
          <>
            <Animated.View style={[{ transform: [{ translateY: posY }], height: 250, alignSelf: 'center' }]}>
              {isConnected ? <Image source={drone} style={styles.drone} /> : <Image source={disconnectedDrone} style={styles.drone} />}
            </Animated.View>

            <Card title="Device">
              {isConnected && (
                <Text style={styles.value}>
                  {USERNAME}'s {DEVICE_NAME}
                </Text>
              )}
              {!isConnected && <Text style={styles.value}>-</Text>}
            </Card>
            <Card title="Connection">{isConnected ? <ConnectedButton /> : <DisconnectedButton />}</Card>
            <Card title="Battery">
              <View style={styles.batteryDotContainer}>
                {fullDots}
                {emptyDots}
                <Text style={styles.value}>{battery}%</Text>
              </View>
            </Card>
            <Card title="Flight time left">
              {isConnected ? (
                <View style={styles.time}>
                  <TimeCircle color={Colors.grey_600} style={{ marginRight: 5 }} />
                  <Text style={styles.value}>
                    {flightTime.hrs}h {flightTime.min} m
                  </Text>
                </View>
              ) : (
                <Text style={styles.value}>-</Text>
              )}
            </Card>
            <View style={{ flex: 1, width: '85%', alignSelf: 'center' }}>
              {/*
               //* will be used once we get the drone
              {isConnected ? (
                <BlueButton title={'Disconnect'} handleClick={toggleDroneConnection} />
              ) : (
                <BlueButton title={'Remove Device'} handleClick={() => dispatch(removeDrone())} />
              )} */}
            </View>
          </>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Bluetooth style={{ marginBottom: 20 }} />
            <Text> No device connected</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DroneInfo;
