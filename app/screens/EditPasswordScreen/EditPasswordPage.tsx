/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-sequences */
import { Formik } from 'formik';
import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Hide, Lock, Show } from 'react-native-iconly';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenWidth } from '@rneui/base';
import { Button } from '@rneui/themed';

import ResetPassword from '../../assets/images/illustrations/ResetPassword.svg';
import Header from '../../components/Header/Header';
import { Colors } from '../../constants/colors';
import { editPassword } from '../../store/authSlice';
import { AppDispatch, RootState } from '../../store/store';
import { editPasswordValidationSchema } from '../../tools/EditPasswordValidationSchema';
import { styles } from './styles.module';
import { getDeviceInfo } from '../../store/authSlice';
import { uploadImages } from '../../data/api/measurements/measurementsService';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const EditPasswordPage: FC<IProps> = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideButton, setHideButton] = useState(true);
  const canShowPassword = hidePassword ? true : false;
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [activeInput, setActiveInput] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const confirmPasswordRef = useRef<TextInput | null>(null);

  const dispatch: AppDispatch = useDispatch();

  const handleHideButtonClick = () => {
    setHidePassword(!hidePassword);
    setHideButton(!hideButton);
  };

  const { t } = useTranslation();

  const getInitialValues = () => ({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handlePasswordChange = async (values: any) => {
    dispatch(
      editPassword(
        {
          password: values.password,
          password_confirmation: values.password_confirmation,
        },
        () => navigation.navigate('EditProfileScreen'),
      ),
    );
  };

  return (
    <>
      <Header backButton={true} goBack={() => navigation.goBack()} title={t('auth.password_reset.header')} />
      <Formik
        initialValues={getInitialValues()}
        validateOnMount={true}
        validationSchema={editPasswordValidationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm({ values: getInitialValues() });
        }}>
        {({ errors, touched, handleChange, handleBlur, values, isValid, resetForm }) => (
          <KeyboardAwareScrollView extraHeight={100} keyboardShouldPersistTaps="handled" enableOnAndroid contentContainerStyle={styles.container}>
            <ResetPassword width={ScreenWidth / 1.25} />
            <View style={activeInput.newPassword ? styles.activeInputField : styles.inputField}>
              <Lock set="bold" color={activeInput.newPassword ? Colors.primary_500 : Colors.grey_500} />
              <TextInput
                secureTextEntry={canShowPassword}
                placeholder={t('auth.password_reset.password')}
                placeholderTextColor={Colors.grey_500}
                onChangeText={handleChange('password')}
                value={values.password}
                onBlur={() => {
                  handleBlur('password'), setActiveInput({ ...activeInput, newPassword: false });
                }}
                style={styles.textInput}
                onFocus={() => setActiveInput({ ...activeInput, newPassword: true })}
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmPasswordRef?.current?.focus();
                }}
                blurOnSubmit={false}
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
            <View style={activeInput.confirmPassword ? styles.activeInputField : styles.inputField}>
              <Lock set="bold" color={activeInput.confirmPassword ? Colors.primary_500 : Colors.grey_500} />
              <TextInput
                ref={confirmPasswordRef}
                placeholderTextColor={Colors.grey_500}
                secureTextEntry
                placeholder={t('auth.password_reset.password_confirm')}
                onChangeText={handleChange('password_confirmation')}
                onBlur={() => {
                  handleBlur('password_confirmation'), setActiveInput({ ...activeInput, confirmPassword: false });
                }}
                value={values.password_confirmation}
                style={styles.textInput}
                onFocus={() => setActiveInput({ ...activeInput, confirmPassword: true })}
              />
              {/* <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} onPress={() => handleHideButtonClick()} activeOpacity={1}></TouchableOpacity> */}
            </View>
            {errors.password_confirmation && touched.password_confirmation && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{errors.password_confirmation}</Text>
              </Animatable.View>
            )}
            <View style={styles.btnContainer}>
              <Button
                onPress={() => {
                  handlePasswordChange(values);
                  resetForm();
                }}
                loading={loading}
                loadingProps={{
                  size: 'small',
                  color: 'rgba(111, 202, 186, 1)',
                }}
                containerStyle={styles.buttonContainerStyle}
                buttonStyle={styles.buttonStyle}>
                {t('auth.password_reset.button_next')}
              </Button>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </>
  );
};

export default EditPasswordPage;
