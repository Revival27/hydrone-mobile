import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../constants/colors';
import CustomButton from './Button';

type Props = {
  isVisible: boolean;
  title?: string;
  items?: Array<any>;
  children?: ReactNode;
  toggleCheckBox?: boolean;
  elevation?: number;
  cancelButtonText?: string;
  actionButtonText?: string;
  actionButtonColor?: string;
  actionButtonBackgroundColor?: string;
  actionButtonBorderColor?: string;
  cancelButtonColor?: string;
  cancelButtonBackgroundColor?: string;
  cancelButtonBorderColor?: string;
  numberedList?: boolean;
  errorTitle?: boolean;
  onClose: () => void;
  onAccept: () => void;
};
const screenHeight = Dimensions.get('window').height;

const BottomPopup: React.FC<Props> = ({
  isVisible,
  title,
  items,
  onClose,
  onAccept,
  elevation,
  children,
  cancelButtonText,
  actionButtonText,
  numberedList,
  errorTitle,
  actionButtonColor,
  actionButtonBackgroundColor,
  actionButtonBorderColor,
  cancelButtonColor,
  cancelButtonBackgroundColor,
  cancelButtonBorderColor,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      style={{
        margin: 0,
      }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      hasBackdrop={true}
      onBackdropPress={onClose}
      useNativeDriverForBackdrop={true}
      isVisible={isVisible}>
      <View style={styles.container}>
        <View style={elevation ? { ...styles.textContainer, maxHeight: `${elevation}%` } : styles.textContainer}>
          <Text
            style={
              errorTitle
                ? {
                  ...styles.title,
                  color: Colors.error,
                  textAlign: 'center',
                }
                : { ...styles.title }
            }>
            {title}
          </Text>
          {items !== null && (
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={false} scrollEventThrottle={16} style={{ height: screenHeight }}>
              {items?.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                  <Text style={[numberedList ? styles.itemTitle : { ...styles.itemTitle, textAlign: 'center' }]}>
                    {numberedList ? index + 1 : ''}
                    {numberedList ? '. ' : ''}
                    {item.title}
                  </Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-evenly',
                  paddingVertical: items ? 20 : 0,
                  width: ScreenWidth - 30,
                  maxHeight: '100%',
                }}>
                <TouchableOpacity activeOpacity={1} style={styles.btnElement}>
                  <CustomButton
                    backgroundColor={cancelButtonBackgroundColor ? cancelButtonBackgroundColor : Colors.primary_100}
                    color={cancelButtonColor ? cancelButtonColor : Colors.primary_500}
                    onPress={() => onClose()}
                    rounded={true}
                    paddings={[18, 16, 18, 16]}
                    size={16}
                    text={cancelButtonText ? cancelButtonText : t('components.popup.cancel')}
                  />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.btnElement}>
                  <CustomButton
                    color={actionButtonColor ? actionButtonColor : Colors.primary_500}
                    backgroundColor={actionButtonBackgroundColor ? actionButtonBackgroundColor : Colors.primary_500}
                    borderColor={actionButtonBorderColor ? actionButtonBorderColor : ''}
                    onPress={() => onAccept()}
                    rounded={true}
                    paddings={actionButtonBorderColor ? [18, 16, 15, 16] : [18, 16, 18, 16]}
                    size={16}
                    text={actionButtonText ? actionButtonText : t('components.popup.accept')}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default BottomPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    minWidth: '100%',
    maxHeight: '85%',
    backgroundColor: 'white',
    lineHeight: '120%',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Urbanist-Bold',
    fontSize: RFValue(24, ScreenHeight),
    color: Colors.grey_900,
    paddingVertical: 15,
  },
  itemContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemTitle: {
    width: '100%',
    textAlign: 'left',
    fontFamily: 'Urbanist-Bold',
    fontSize: RFValue(20, ScreenHeight),
    color: Colors.grey_900,
    paddingVertical: 20,
  },
  itemDescription: {
    fontFamily: 'Urbanist-Regular',
    fontSize: RFValue(14, ScreenHeight),
    color: Colors.grey_800,
    lineHeight: 25,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnElement: {
    width: ScreenWidth / 2.5,
    height: 58,
  },
  btnCancel: {
    color: '#E9F0FF',
  },
});
