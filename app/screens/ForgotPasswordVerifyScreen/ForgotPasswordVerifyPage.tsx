import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenHeight } from '@rneui/base';

import CustomButton from '../../components/Button';
import Header from '../../components/Header/Header';
import { Colors } from '../../constants/colors';
import { verifyPasswordResetToken } from '../../data/api/auth/authService';
import { forgotPasswordSendEmail } from '../../store/authSlice';
import { AppDispatch } from '../../store/store';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const CELL_COUNT = 4;

const ForgotPasswordVerifyPage: FC<IProps> = ({ navigation, route }) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { userEmail } = route.params;
  const email = userEmail;

  const handleSendVerifyToken = () => {
    const userObj = {
      email: userEmail,
      token: value,
    };
    verifyPasswordResetToken(userObj)
      .then(res => {
        if (res.status === 200) {
          navigation.navigate('ResetPasswordScreen', {
            userEmail: email,
          });
        } else {
          Toast.show({
            type: 'Error',
            position: 'top',
            text1: t('auth.forgot_password.modal.error'),
            visibilityTime: 3000,
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleForgotPasswordSendCode = async () => {
    dispatch(forgotPasswordSendEmail(email, () => {}));
  };

  return (
    <>
      <Header backButton={true} goBack={() => navigation.navigate('LoginScreen')} title={t('auth.forgot_password.header')} />

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
        <Text style={styles.title}>{t('auth.forgot_password.code_sent', { email: userEmail })}</Text>
        <View>
          <CodeField
            placeholderTextColor={Colors.grey_800}
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View key={index}>
                <Text key={index} style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          {/* Hook the resend code post request on the button below */}
          <Text onPress={handleForgotPasswordSendCode} style={styles.title}>
            {t('auth.forgot_password.resend_code')}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <CustomButton paddings={[18, 14, 18, 14]} size={RFValue(16, ScreenHeight)} text={t('auth.forgot_password.button_save')} onPress={() => handleSendVerifyToken()} />
        </View>
      </ScrollView>
    </>
  );
};

export default ForgotPasswordVerifyPage;
