import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Message } from 'react-native-iconly';
import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable react-native/no-inline-styles */
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ScreenWidth } from '@rneui/base';
import { Button } from '@rneui/themed';

import Frame from '../../assets/images/illustrations/Frame.svg';
import Header from '../../components/Header/Header';
import { Colors } from '../../constants/colors';
import { forgotPasswordSendEmail } from '../../store/authSlice';
import { RootState } from '../../store/store';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const ForgotPasswordPage: FC<IProps> = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const dispatch = useDispatch();
  const [activeInput, setActiveInput] = useState(false);
  const loading = useSelector((state: RootState) => state.loading.loading);

  const { t } = useTranslation();

  const navigateToVerification = () =>
    navigation.navigate('ForgotPasswordVerifyScreen', {
      userEmail: email,
    });

  const handleForgotPasswordSendCode = async () => {
    dispatch(forgotPasswordSendEmail(email, navigateToVerification));
  };

  return (
    <>
      <Header backButton={true} goBack={() => navigation.goBack()} title={t('auth.forgot_password.header')} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
        <Frame style={styles.image} width={ScreenWidth / 2} />
        <Text style={styles.description}>{t('auth.forgot_password.cta')}</Text>
        <View style={activeInput ? styles.activeInputField : styles.inputField}>
          <Message color={activeInput ? Colors.primary_500 : Colors.grey_900} set="bold" />
          <TextInput
            placeholderTextColor={Colors.grey_800}
            style={styles.inputText}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            onFocus={() => setActiveInput(true)}
            onBlur={() => setActiveInput(false)}
          />
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%' }}>
          <Button
            onPress={handleForgotPasswordSendCode}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.buttonStyle}
            loading={loading}
            loadingProps={{
              size: 'small',
              color: 'rgba(111, 202, 186, 1)',
            }}>
            {t('auth.forgot_password.button')}
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default ForgotPasswordPage;
