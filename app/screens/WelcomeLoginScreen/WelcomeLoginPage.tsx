import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenHeight, ScreenWidth } from '@rneui/base';

import WelcomeLoginImage from '../../assets/images/illustrations/login.svg';
import CustomButton from '../../components/Button';
import WarningModal from '../../components/WarningModal/WarningModal';
import { useBackHandler } from '../../hooks/useBackHandler';
import { RootState } from '../../store/store';
import { styles } from './WelcomeLoginStyles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const LoginPage: FC<IProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  useBackHandler(() => {
    if (true) {
      setIsModalVisible(true);
      return true;
    }
  });
  const loading = useSelector((state: RootState) => state.loading.loading);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            maxHeight: ScreenHeight / 1.25,
          }}>
          <View style={styles.container}>
            <WelcomeLoginImage width={ScreenWidth / 2} height={ScreenHeight / 1.5} />
            <View style={styles.loginBtn}>
              <CustomButton text={t('auth.login.button_login')} paddings={[18, 16, 18, 16]} size={RFValue(16, ScreenHeight)} onPress={() => navigation.navigate('LoginScreen')} />
            </View>
          </View>
        </View>
        <View style={styles.registerButtonContainer}>
          <Text style={styles.dontHaveAccount}>{t('auth.login.no_acc')}</Text>
          <Text onPress={() => navigation.navigate('RegisterScreen')} style={styles.registerBtn}>
            {t('auth.login.register')}
          </Text>
        </View>
      </View>
      <WarningModal
        setIsLoading={loading}
        cancel={() => setIsModalVisible(false)}
        removeFunction={() => {
          setIsModalVisible(false);
          BackHandler.exitApp();
        }}
        isVisible={isModalVisible}
        header={'Exit'}
        description={t('landing.exit_app.body')}
        buttonText={t('landing.exit_app.confirm')}
      />
    </>
  );
};

export default LoginPage;
