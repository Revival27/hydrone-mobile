/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Hide, Lock, Show } from 'react-native-iconly';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';

/* eslint-disable @typescript-eslint/no-unused-expressions */
import { default as AsyncStorage } from '@react-native-async-storage/async-storage';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenWidth } from '@rneui/base';
import { Button } from '@rneui/themed';

import ResetPassword from '../../assets/images/illustrations/ResetPassword.svg';
import CustomLoader from '../../components/CustomLoader';
import Header from '../../components/Header/Header';
import { Colors } from '../../constants/colors';
import { resetPassword } from '../../data/api/auth/authService';
import { editPasswordValidationSchema } from '../../tools/EditPasswordValidationSchema';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const ResetPasswordPage: FC<IProps> = ({ navigation, route }) => {
  const [deviceName, setDeviceName] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [hideButton, setHideButton] = useState(true);
  const canShowPassword = hidePassword ? true : false;
  const [visible, setVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const handleHideButtonClick = () => {
    setHidePassword(!hidePassword);
    setHideButton(!hideButton);
  };
  const [activePasswordInput, setActivePasswordInput] = useState(false);
  const [activeConfirmInput, setActiveConfirmInput] = useState(false);
  const { t } = useTranslation();

  const getInitialValues = () => ({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const { userEmail } = route.params;
  const handlePasswordChange = async (values: any) => {
    setisLoading(true);
    setEmail(userEmail);
    if (values.password === '' || values.password_confirmation === '') {
      Toast.show({
        type: 'Error',
        position: 'top',
        text1: t('toast.empty_fields'),
        visibilityTime: 3000,
      });
      setisLoading(false);

      return;
    } else if (values.password_confirmation !== values.password) {
      Toast.show({
        type: 'Error',
        position: 'top',
        text1: t('toast.no_match'),
        visibilityTime: 3000,
      });
      setisLoading(false);
      return;
    }
    await resetPassword({
      email: userEmail,
      password: values.password,
      password_confirmation: values.password_confirmation,
      device_name: deviceName,
    })
      .then((res: any) => {
        navigation.navigate('LoginScreen');
        Toast.show({
          type: 'Success',
          position: 'top',
          text1: t('auth.password_reset.modal.description'),
          visibilityTime: 3000,
        });
        setisLoading(false);
      })
      .catch(err => {
        Toast.show({
          type: 'Error',
          position: 'top',
          text1: err.response.data.message.password[0],
          visibilityTime: 3000,
        });
        setisLoading(false);
      });
  };

  useEffect(() => {
    const deviceInfo = async () => {
      try {
        const data = await AsyncStorage.getItem('DEVICE_INFO');
        data && setDeviceName(data);
      } catch (e) {}
    };
    deviceInfo();
  }, []);

  return (
    <>
      <Header backButton={true} goBack={() => navigation.navigate('ForgotPasswordScreen')} title={t('auth.password_reset.header')} />
      <Formik
        initialValues={getInitialValues()}
        validateOnMount={true}
        validationSchema={editPasswordValidationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm({ values: getInitialValues() });
        }}>
        {({ errors, touched, handleChange, handleBlur, values, isValid, resetForm }) => (
          <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableOnAndroid contentContainerStyle={styles.container}>
            <CustomLoader title={t('auth.password_reset.modal.title')} description={t('auth.password_reset.modal.description')} titleColor={Colors.primary_300} visible={visible} />

            <View style={styles.image}>
              <ResetPassword width={ScreenWidth / 1.25} />
            </View>
            <View>
              <View style={activePasswordInput ? styles.activeInput : styles.inputField}>
                <Lock color={activePasswordInput ? Colors.primary_500 : Colors.grey_500} set={'bold'} />
                <TextInput
                  secureTextEntry={canShowPassword}
                  placeholderTextColor={Colors.grey_500}
                  placeholder={t('auth.password_reset.password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  style={{ width: '80%', color: 'black' }}
                  onFocus={() => setActivePasswordInput(true)}
                  onBlur={() => (setActivePasswordInput(false), handleBlur('password'))}
                />
                {hidePassword ? (
                  <TouchableOpacity onPress={() => handleHideButtonClick()} activeOpacity={1}>
                    <Hide set="bold" color={Colors.grey_500} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => handleHideButtonClick()} activeOpacity={1}>
                    <Show set="bold" color={Colors.primary_500} />
                  </TouchableOpacity>
                )}
              </View>
              {errors.password && touched.password && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>{errors.password}</Text>
                </Animatable.View>
              )}

              <View style={activeConfirmInput ? styles.activeInput : styles.inputField}>
                <Lock color={activeConfirmInput ? Colors.primary_500 : Colors.grey_500} set={'bold'} />

                <TextInput
                  placeholderTextColor={Colors.grey_500}
                  secureTextEntry
                  placeholder={t('auth.password_reset.password_confirm')}
                  onChangeText={handleChange('password_confirmation')}
                  value={values.password_confirmation}
                  style={{ width: '80%', color: 'black' }}
                  onFocus={() => setActiveConfirmInput(true)}
                  onBlur={() => (setActiveConfirmInput(false), handleBlur('password_confirmation'))}
                />
              </View>

              {errors.password_confirmation && touched.password_confirmation && (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>{errors.password_confirmation}</Text>
                </Animatable.View>
              )}
            </View>

            <View style={styles.btnContainer}>
              <Button
                onPress={() => {
                  handlePasswordChange(values);
                  resetForm();
                }}
                loading={isLoading}
                loadingProps={{
                  size: 'small',
                  color: 'rgba(111, 202, 186, 1)',
                }}
                containerStyle={styles.buttonContainerStyle}
                buttonStyle={styles.buttonStyle}>
                {t('auth.forgot_password.button_save')}
              </Button>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordPage;
