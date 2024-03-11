import { Formik } from 'formik';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Hide, Lock, Message, Show, User } from 'react-native-iconly';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable react-native/no-inline-styles */
import CheckBox from '@react-native-community/checkbox';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

import { items } from '../../assets/ASZF';
import BlueButton from '../../components/BlueButton/BlueButton';
import BottomPopup from '../../components/BottomPopup';
import Header from '../../components/Header/Header';
import { Colors } from '../../constants/colors';
import { getDeviceInfo, handleRegister } from '../../store/authSlice';
import { RootState } from '../../store/store';
import { registerValidationSchema } from '../../tools/RegisterValidationsSchema';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const RegisterPage: FC<IProps> = ({ navigation }) => {
  const [focused, setFocused] = React.useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [hideButton, setHideButton] = useState(true);
  const canShowPassword = hidePassword ? true : false;
  const canShowConfirmPassword = hideConfirmPassword ? true : false;
  const [isVisible, setIsVisible] = useState(false);
  const deviceName = useSelector((state: RootState) => state.auth.profile.device_name);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const nameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const confirmPasswordRef = useRef<TextInput | null>(null);
  const formRef = useRef<any>(null);
  dispatch(getDeviceInfo());
  const goBackToPreviousRoute = () => {
    const routes = navigation.getState()?.routes;
    navigation.navigate(routes[routes.length - 2]?.name.toString());
  };

  const getInitialValues = () => ({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const onClose = () => {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (formRef?.current) {
        formRef.current.values = getInitialValues();
        formRef.current.setErrors({});
      }
    });
    return unsubscribe;
  }, [navigation]);

  const onAccept = () => {
    if (!toggleCheckBox) {
      setToggleCheckBox(true);
      setIsVisible(false);
    }
    setIsVisible(false);
  };

  const handleHideButtonClick = () => {
    setHidePassword(!hidePassword);
    setHideButton(!hideButton);
  };

  const navigate = () => {
    navigation.navigate('LoginScreen');
    formRef.current.resetForm();
    setToggleCheckBox(false);
  };

  const handleRegisterButton = (values: any) => {
    const user = {
      name: values.name,
      email: values.email,
      device_name: deviceName,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    dispatch(handleRegister(user, navigate));
  };

  dispatch(getDeviceInfo());

  return (
    <>
      <Header title="" backButton={true} goBack={goBackToPreviousRoute} />
      <Formik
        innerRef={formRef}
        initialValues={getInitialValues()}
        validateOnChange={true}
        validationSchema={registerValidationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm({ values: getInitialValues() });
        }}>
        {({ errors, touched, setTouched, handleChange, handleBlur, values, isValid }) => (
          <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" extraScrollHeight={25} enableOnAndroid style={{ flex: 1 }}>
            <View style={styles.container}>
              <Text style={styles.createText}>{t('register.header')}</Text>
              <View style={styles.form}>
                <View style={focused === 'email' ? styles.activeInput : styles.inputField}>
                  <Message color={focused === 'email' ? Colors.primary_500 : Colors.grey_500} set={'bold'} />
                  <TextInput
                    keyboardType="email-address"
                    style={styles.inputText}
                    onChangeText={handleChange('email')}
                    onBlur={() => {
                      handleBlur('email');
                      setFocused('');
                    }}
                    onFocus={() => setFocused('email')}
                    value={values.email}
                    placeholder={t('register.email_placeholder')}
                    placeholderTextColor={focused === 'email' ? Colors.primary_500 : Colors.grey_500}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      nameRef?.current?.focus();
                    }}
                    onEndEditing={() => setTouched({ ...touched, email: true })}
                    blurOnSubmit={false}
                  />
                </View>
                {errors.email && touched.email && (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{errors.email}</Text>
                  </Animatable.View>
                )}

                <View style={focused === 'name' ? styles.activeInput : styles.inputField}>
                  <User color={focused === 'name' ? Colors.primary_500 : Colors.grey_500} set="bold" />
                  <TextInput
                    ref={nameRef}
                    maxLength={25}
                    onFocus={() => setFocused('name')}
                    style={styles.inputText}
                    onChangeText={handleChange('name')}
                    onBlur={() => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      handleBlur('name'), setFocused('');
                    }}
                    onEndEditing={() => setTouched({ ...touched, name: true })}
                    value={values.name}
                    placeholder={t('register.name_placeholder')}
                    placeholderTextColor={focused === 'name' ? Colors.primary_500 : Colors.grey_500}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      passwordRef?.current?.focus();
                    }}
                    blurOnSubmit={false}
                  />
                </View>
                {errors.name && touched.name && (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{errors.name}</Text>
                  </Animatable.View>
                )}

                <View style={focused === 'password' ? styles.activeInput : styles.inputField}>
                  <Lock color={focused === 'password' ? Colors.primary_500 : Colors.grey_500} set="bold" />
                  <TextInput
                    ref={passwordRef}
                    style={styles.inputText}
                    secureTextEntry={canShowPassword}
                    onChangeText={handleChange('password')}
                    onBlur={() => {
                      setFocused('');
                      handleBlur('password');
                    }}
                    onFocus={() => {
                      setFocused('password');
                    }}
                    onEndEditing={() => setTouched({ ...touched, password: true })}
                    value={values.password}
                    placeholder={t('register.password_placeholder')}
                    placeholderTextColor={focused === 'password' ? Colors.primary_500 : Colors.grey_500}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      confirmPasswordRef?.current?.focus();
                    }}
                    blurOnSubmit={false}
                  />

                  {hidePassword ? (
                    <TouchableOpacity onPress={() => handleHideButtonClick()} activeOpacity={1}>
                      <Hide hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }} set="bold" color={Colors.grey_500} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => handleHideButtonClick()} activeOpacity={1}>
                      <Show hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }} set="bold" color={Colors.primary_500} />
                    </TouchableOpacity>
                  )}
                </View>
                {errors.password && touched.password && (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{errors.password}</Text>
                  </Animatable.View>
                )}

                <View style={focused === 'confirm' ? styles.activeInput : styles.inputField}>
                  <Lock color={focused === 'confirm' ? Colors.primary_500 : Colors.grey_500} set="bold" />
                  <TextInput
                    ref={confirmPasswordRef}
                    style={styles.inputText}
                    secureTextEntry={canShowConfirmPassword}
                    onChangeText={handleChange('password_confirmation')}
                    onEndEditing={() => setTouched({ ...touched, password_confirmation: true })}
                    onBlur={() => {
                      handleBlur('password_confirmation');
                      setFocused('');
                    }}
                    value={values.password_confirmation}
                    onFocus={() => setFocused('confirm')}
                    onSubmitEditing={() => handleRegisterButton(values)}
                    placeholder={t('register.password_confirm_placeholder')}
                    placeholderTextColor={focused === 'confirm' ? Colors.primary_500 : Colors.grey_500}
                  />
                  <TouchableOpacity onPress={() => setHideConfirmPassword(!hideConfirmPassword)} activeOpacity={1} />
                </View>
                {errors.password_confirmation && touched.password_confirmation && (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{errors.password_confirmation}</Text>
                  </Animatable.View>
                )}
              </View>
              <View style={styles.termsOfUseContainer}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                  boxType="circle"
                  tintColors={{ true: Colors.primary_500, false: Colors.grey_500 }}
                />
                <Text
                  style={{
                    fontFamily: 'Urbanist-Bold',
                    color: Colors.grey_900,
                  }}>
                  {t('register.accept_tos')}
                  <Text
                    onPress={() => setIsVisible(true)}
                    style={{
                      fontFamily: 'Urbanist-Bold',
                      color: Colors.primary_500,
                    }}>
                    {t('register.tos')}
                  </Text>
                </Text>
              </View>
              <BlueButton disabled={!isValid || toggleCheckBox === false} title={t('register.button_register')} handleClick={() => handleRegisterButton(values)} />

              <View style={styles.alreadyHasAccountContainer}>
                <Text style={styles.alreadyHasAccount}>{t('register.already_have_an_acc')}</Text>
                <Text onPress={() => navigation.navigate('LoginScreen')} style={styles.loginBtn}>
                  {t('register.log_in')}
                </Text>
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
      <BottomPopup
        numberedList={true}
        items={items}
        actionButtonColor={'white'}
        onClose={onClose}
        onAccept={onAccept}
        isVisible={isVisible}
        toggleCheckBox={toggleCheckBox}
        title={t('register.popupTitle')}
      />
    </>
  );
};
// visible-password
export default RegisterPage;
