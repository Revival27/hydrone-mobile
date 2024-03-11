import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Message, Password, User } from 'react-native-iconly';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Button } from '@rneui/themed';

import BlueButton from '../../components/BlueButton/BlueButton';
import Header from '../../components/Header/Header';
import { Colors } from '../../constants/colors';
import { updateUser } from '../../store/authSlice';
import { RootState } from '../../store/store';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const EditProfilePage: FC<IProps> = ({ navigation }) => {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [focused, setFocused] = useState({
    name: false,
    email: false,
  });
  const emailRef = useRef<TextInput | null>(null);

  const goBack = () => {
    navigation.goBack();
  };

  const handleUserInfoChange = async () => {
    const updatedProfile = {
      id: profile.id,
      email: email,
      name: name,
    };
    dispatch(updateUser(updatedProfile, goBack));
  };

  return (
    <>
      <Header backButton={true} goBack={() => navigation.goBack()} title={t('profile.edit_profile.header')} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
        <View style={focused.name ? styles.activeInputField : styles.inputField}>
          <User color={focused.name ? Colors.primary_500 : Colors.grey_900} set="bold" />
          <TextInput
            maxLength={25}
            placeholderTextColor={Colors.grey_500}
            style={styles.inputText}
            defaultValue={profile.name !== null ? profile.name : ''}
            onChangeText={text => {
              setName(text);
            }}
            onFocus={() => setFocused({ ...focused, name: true })}
            onBlur={() => setFocused({ ...focused, name: false })}
            returnKeyType="next"
            onSubmitEditing={() => {
              emailRef?.current?.focus();
            }}
            blurOnSubmit={false}
          />
          <TouchableOpacity hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} activeOpacity={1} />
        </View>
        <View style={focused.email ? styles.activeInputField : styles.inputField}>
          <Message color={focused.email ? Colors.primary_500 : Colors.grey_900} set="bold" />
          <TextInput
            ref={emailRef}
            placeholderTextColor={Colors.grey_500}
            style={styles.inputText}
            defaultValue={profile.email !== null ? profile.email : ''}
            onChangeText={text => {
              setEmail(text);
            }}
            onFocus={() => setFocused({ ...focused, email: true })}
            onBlur={() => setFocused({ ...focused, email: false })}
          />
        </View>
        <View>
          <TouchableOpacity activeOpacity={1} style={styles.btnContainer}>
            <Button
              onPress={() => navigation.navigate('EditPasswordScreen')}
              titleStyle={{ color: Colors.primary_500 }}
              containerStyle={styles.buttonContainerStyle}
              buttonStyle={styles.changePasswordButtonContainer}>
              <Password style={styles.iconInsideButton} set="bold" color={Colors.primary_500} />
              {t('profile.edit_profile.button_change_password')}
            </Button>
          </TouchableOpacity>
          <BlueButton handleClick={handleUserInfoChange} title={t('profile.edit_profile.button_save')} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default EditProfilePage;
