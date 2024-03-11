import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Header from '../../components/Header/Header';
import { styles } from './style.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

interface TextBoxProps {
  header: string;
  body: string;
}

const TextBox: FC<TextBoxProps> = ({ header, body }) => {
  return (
    <View>
      <Text style={styles.header}>{header}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
};

const TermsOfServiceScreen: FC<IProps> = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <>
      <Header title={t('TOS.title')} backButton={true} goBack={() => navigation.goBack()}></Header>
      <ScrollView>
        <View style={styles.container}>
          <TextBox header={t('TOS.personal_data.header')} body={t('TOS.personal_data.body')} />
          <TextBox header={t('TOS.usage_of_data.header')} body={t('TOS.usage_of_data.body')} />
          <TextBox header={t('TOS.disclosure_of_personal_data.header')} body={t('TOS.disclosure_of_personal_data.body')} />
          <TextBox header={t('TOS.personal_data.header')} body={t('TOS.personal_data.body')} />
        </View>
      </ScrollView>
    </>
  );
};

export default TermsOfServiceScreen;
