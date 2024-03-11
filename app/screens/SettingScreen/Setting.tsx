import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { ChevronRight, InfoSquare, Lock, Logout, User } from 'react-native-iconly';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable react-native/no-inline-styles */
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import ProfilePic from '../../assets/images/avatars/avatar_little.svg';
import BottomPopup from '../../components/BottomPopup';
import { Colors } from '../../constants/colors';
// import { useDarkMode } from '../../context/DarkModeProvider';
import { logOut } from '../../store/authSlice';
import { RootState } from '../../store/store';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const SettingScreen: FC<IProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const profile = useSelector((state: RootState) => state.auth.profile);
  const [isVisible, setIsVisible] = useState(false);
  // const { darkMode, setDarkMode }: any = useDarkMode();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const onClose = () => {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  const handleLogout = async () => {
    await dispatch(logOut());
    navigation.navigate('WelcomeLoginScreen');
    navigation.reset({
      index: 0,
      routes: [{ name: 'WelcomeLoginScreen' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <View style={styles.profileInfo}>
            <ProfilePic />
            <Text style={[styles.nameText, { color: colors.text }]}>{profile?.name}</Text>
            <Text style={[styles.emailText, { color: colors.text }]}>{profile?.email}</Text>
          </View>
        </View>
        <View style={styles.lineStyle} />
        <View style={styles.optionItems}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')}>
            <View style={styles.optionItem}>
              <User color={colors.text} />

              <Text style={[styles.optionItemText, { color: colors.text }]}>{t('settings.edit_profile')}</Text>

              <View
                style={{
                  marginLeft: 'auto',
                }}>
                <ChevronRight color={colors.text} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('TermsOfService')}>
            <View style={styles.optionItem}>
              <Lock color={colors.text} />
              <Text style={[styles.optionItemText, { color: colors.text }]}>{t('settings.tos')}</Text>
              <View
                style={{
                  marginLeft: 'auto',
                }}>
                <ChevronRight color={colors.text} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Faq')}>
            <View style={styles.optionItem}>
              <InfoSquare color={colors.text} />
              <Text style={[styles.optionItemText, { color: colors.text }]}>{t('settings.help')}</Text>
              <View
                style={{
                  marginLeft: 'auto',
                }}>
                <ChevronRight color={colors.text} />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.optionItem}>
            <Logout color={Colors.error} set="light" />
            <Text onPress={() => setIsVisible(true)} style={styles.optionLogoutText}>
              {t('settings.log_out')}
            </Text>
          </View>
        </View>
      </View>
      <BottomPopup
        items={[
          {
            title: t('settings.popup.title'),
            description: '',
          },
        ]}
        actionButtonColor={'white'}
        cancelButtonColor={Colors.primary_500}
        errorTitle={true}
        actionButtonText={t('settings.popup.button_logout')}
        elevation={40}
        onClose={onClose}
        onAccept={handleLogout}
        isVisible={isVisible}
        title={t('settings.popup.header')}
      />
    </View>
  );
};

export default SettingScreen;
