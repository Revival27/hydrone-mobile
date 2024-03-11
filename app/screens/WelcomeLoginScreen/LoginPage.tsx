import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Hide, Lock, Message, Show } from 'react-native-iconly';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

import BlueButton from '../../components/BlueButton/BlueButton';
import Header from '../../components/Header/Header';
import { Colors } from '../../constants/colors';
import { getDeviceInfo, handleLogin } from '../../store/authSlice';
import { RootState } from '../../store/store';
import { styles } from './LoginStyles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const LoginPage: FC<IProps> = ({ navigation }) => {
  const deviceName = useSelector((state: RootState) => state.auth.profile.device_name);
  const [hidePassword, setHidePassword] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hideButton, setHideButton] = useState(true);
  const canShowPassword = hidePassword ? true : false;
  const dispatch = useDispatch();
  const [activeEmailInput, setActiveEmailInput] = useState(false);
  const [activePasswordInput, setActivePasswordInput] = useState(false);

  const { t } = useTranslation();
  const passwordRef = useRef<TextInput | null>(null);

  const handleHideButtonClick = () => {
    setHidePassword(!hidePassword);
    setHideButton(!hideButton);
  };

  const emailValidator = (text: string) => {
    setEmail(text);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmailIsValid(false);
    } else {
      setEmailIsValid(true);
    }
  };

  const handleClick = async () => {
    const user = {
      email,
      password,
      device_name: deviceName,
    };
    await dispatch(handleLogin(user, () => navigation.navigate('HomeScreen')));
  };

  dispatch(getDeviceInfo());

  return (
    <View style={styles.container}>
      <Header title="" backButton={true} goBack={() => navigation.goBack()} />
      <KeyboardAwareScrollView extraScrollHeight={10} keyboardShouldPersistTaps="handled" enableOnAndroid style={{ flex: 1 }}>
        <View style={styles.content}>
          <Text style={styles.createText}>{t('auth.login.header')}</Text>
          <View style={activeEmailInput ? styles.activeInput : styles.inputField}>
            <Message color={activeEmailInput ? Colors.primary_500 : Colors.grey_500} set="bold" />
            <TextInput
              onFocus={() => setActiveEmailInput(true)}
              onBlur={() => setActiveEmailInput(false)}
              placeholderTextColor={Colors.grey_500}
              style={styles.inputText}
              placeholder={t('auth.login.email_placeholder')}
              onChangeText={emailValidator}
              value={email}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef?.current?.focus();
              }}
              blurOnSubmit={false}
            />
          </View>

          <View style={activePasswordInput ? styles.activeInput : styles.inputField}>
            <Lock set="bold" color={activePasswordInput ? Colors.primary_500 : Colors.grey_500} />
            <TextInput
              ref={passwordRef}
              placeholderTextColor={Colors.grey_500}
              onFocus={() => setActivePasswordInput(true)}
              onBlur={() => setActivePasswordInput(false)}
              onSubmitEditing={handleClick}
              secureTextEntry={canShowPassword}
              placeholder={t('auth.login.password_placeholder')}
              onChangeText={text => setPassword(text)}
              value={password}
              style={styles.inputText}
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

          <BlueButton title={t('auth.login.button_login')} handleClick={() => handleClick()} />
          <View style={styles.forgotPasswordContainer}>
            <Text onPress={() => navigation.navigate('ForgotPasswordScreen')} style={styles.forgotPasswordText}>
              {t('auth.login.forgot_password')}
            </Text>
          </View>
          <View style={styles.loginButtonContainer}>
            <Text style={styles.alreadyHasAccount}>{t('auth.login.no_acc')}</Text>
            <Text onPress={() => navigation.navigate('RegisterScreen')} style={styles.loginBtn}>
              {t('auth.login.register')}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default LoginPage;
