import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button, ScreenHeight, ScreenWidth } from '@rneui/base';

import PhotoIcon from '../../assets/images/illustrations/photoIcon.svg';
import { Colors } from '../../constants/colors';

const PhotoUploadModal = ({ isVisible, setIsVisible, takePhoto, chooseFromGallery }) => {
  const { t } = useTranslation();
  return (
    <Modal onRequestClose={() => setIsVisible(false)} transparent visible={isVisible}>
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)} style={{ flex: 1 }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <PhotoIcon />
            <Text style={styles.title}>Upload Photo</Text>
            <Button
              containerStyle={styles.buttonContainerStyle}
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.buttonTitleStyle}
              onPress={takePhoto}
              title={t('survey_measurement.camera')}
            />
            <Button
              containerStyle={styles.buttonContainerStyle}
              buttonStyle={styles.galleryButtonStyle}
              titleStyle={styles.galleryTitleStyle}
              onPress={chooseFromGallery}
              title={t('survey_measurement.gallery')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PhotoUploadModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: '60%',
    backgroundColor: '#fff',
    paddingVertical: '10%',
    paddingHorizontal: '10%',
    borderRadius: 30,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginVertical: 32,
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: Colors.primary_500,
  },

  buttonContainerStyle: {
    height: 58,
    width: ScreenWidth / 1.5,
    borderRadius: 100,
    marginBottom: 12,
  },
  buttonStyle: {
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
    height: '100%',
  },
  galleryButtonStyle: {
    backgroundColor: Colors.primary_100,
    borderRadius: 100,
    height: '100%',
  },
  galleryTitleStyle: {
    fontSize: RFValue(16, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    color: Colors.primary_500,
  },
  buttonTitleStyle: {
    fontSize: RFValue(16, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    color: 'white',
  },
});
