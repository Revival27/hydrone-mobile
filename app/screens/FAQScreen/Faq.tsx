/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ChevronDown, ChevronUp } from 'react-native-iconly';

import { NavigationProp, ParamListBase } from '@react-navigation/native';

import Header from '../../components/Header/Header';
import { Colors } from '../../constants/colors';
import { styles } from './style.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

interface QuestionProps {
  question: string;
  children: any;
}

const ExpandableView: FC<QuestionProps> = ({ question }) => {
  const [height] = useState(new Animated.Value(0));
  const [expanded, setIsExpanded] = useState(true);

  useEffect(() => {
    Animated.timing(height, {
      toValue: !expanded ? 150 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [expanded, height]);

  return (
    <View style={{ marginBottom: 25 }}>
      <TouchableWithoutFeedback onPress={() => setIsExpanded(!expanded)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: Colors.primary_500, fontFamily: 'Urbanist-SemiBold', fontSize: 18, paddingBottom: 10 }}>{question}</Text>
          {expanded ? <ChevronDown color={Colors.grey_900} set="light" /> : <ChevronUp color={Colors.grey_900} set="light" />}
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={{ height, backgroundColor: Colors.primary_100, borderRadius: 25 }}>
        <ScrollView>
          <Text style={{ color: Colors.grey_900, padding: 10 }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas incidunt tempora temporibus ipsum expedita, earum fugiat fugit ab provident illum quam minus alias id
            sapiente totam, dicta sed. Delectus, culpa.
          </Text>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const Faq: FC<IProps> = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <>
      <Header title={t('settings.help')} backButton={true} goBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.container}>
          <ExpandableView question={'1. LOREM ?'}> </ExpandableView>
          <ExpandableView question={'2. Lorem ipsum dolor sit amet?'}> </ExpandableView>
          <ExpandableView question={'3. Lorem ipsum dolor sit amet?'}> </ExpandableView>
          <ExpandableView question={'4. Lorem ipsum dolor ?'}> </ExpandableView>
        </View>
      </ScrollView>
    </>
  );
};

export default Faq;
