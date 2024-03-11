/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
/* eslint-disable react-native/no-inline-styles */
import { Image, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Exif from 'react-native-exif';
import { ArrowRight, Plus } from 'react-native-iconly';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable @typescript-eslint/no-use-before-define */
import { Button, ScreenHeight, ScreenWidth } from '@rneui/base';

import { baseUrl } from '../../../constants/apiUrls';
import { Colors } from '../../../constants/colors';
import { AxiosInstance, getBearerToken } from '../../../data/api/auth/AxiosInstance';
import { toggleLoading } from '../../../store/loadingSlice';
import { deleteMeasurementImage } from '../../../store/measurementSlice';
import { RootState } from '../../../store/store';
import { initializeSurveys } from '../../../store/surveysSlice';
import { hasAndroidPermission } from '../../../tools/PermissionRequests/Permissions';
import { failedMessage, successfulMessage } from '../../../tools/ToastMessages/Messages';
import ImageSliderFooter from '../../ImageSliderFooter';
import LoadingSpinner from '../../LoadingSpinner';
import PhotoUploadModal from '../../PhotoUploadModal/PhotoUploadModal';
import WarningModal from '../../WarningModal/WarningModal';

interface IProps {
  measurement_id?: number;
  id?: number;
  geoLocation: any;
  setGeoLocation: any;
  galleryImages: any;
  setGalleryImages: any;
  setOrientation: any;
  activeIndex: number;
  setActiveIndex: any;
  selectedImageIndex: number;
  setSelectedImageIndex: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
  openGallery: any;
  closeGallery: any;
  step?: number;
  setStep?: any;
  noButtons?: boolean;
}

const Images: FC<IProps> = ({
  measurement_id,
  id,
  geoLocation,
  setGeoLocation,
  galleryImages,
  setGalleryImages,
  setOrientation,
  activeIndex,
  setActiveIndex,
  selectedImageIndex,
  setSelectedImageIndex,
  isModalOpen,
  setIsModalOpen,
  openGallery,
  closeGallery,
  step,
  setStep,
  noButtons,
}) => {
  const { t } = useTranslation();
  const contentWidth = (ScreenWidth - 70) / 3;
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [currentImageToDeleteId, setCurrentImageToDeleteId] = useState<number>();
  const dispatch = useDispatch();
  const measurement = useSelector((state: RootState) => state.measurement.measurements.find(m => m.id === measurement_id));

  useEffect(() => {
    const getImages = async () => {
      const bearer = await getBearerToken();
      if (bearer) {
        setToken(bearer);
      }
      if (measurement_id) {
        AxiosInstance.get(`${baseUrl}measurements/${measurement_id}/images`)
          .then(res => {
            setGalleryImages(res.data, { headers: { Authorization: `Bearer ${bearer}` } });
          })
          .catch(err => {
            console.error(err);
          });
      }
    };
    getImages();
  }, [token]);

  const handleDeleteImage = () => {
    const filteredImages = galleryImages.filter(image => image.id !== currentImageToDeleteId);

    const updatedMeasurement = {
      ...measurement,
      images: filteredImages,
    };
    const payload = {
      id: measurement_id,
      fileId: currentImageToDeleteId,
      measurement: updatedMeasurement,
    };
    dispatch(deleteMeasurementImage(payload));
    setGalleryImages(filteredImages);
    dispatch(initializeSurveys());
    setIsModalVisible(false);
  };

  //? Function to open the gallery and pick images for server upload

  const GallerySelection = async () => {
    let newImage: any = {};
    const token = await getBearerToken();
    const formData = new FormData();

    if (Platform.OS === 'android' && !(await hasAndroidPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE))) {
      return;
    }

    const images = await ImagePicker.openPicker({ multiple: true, mediaType: 'photo' });
    for (const image of images) {
      const { latitude, longitude } = await Exif.getLatLong(image.path);
      const newImageUri = 'file:///' + image.path.split('file:/').join('');
      newImage = { uri: newImageUri, type: image.mime, name: 'kep.jpg', latitude, longitude, imageUrl: newImageUri };
      formData.append('files[]', newImage);
      setGalleryImages(prevState => [...prevState, newImage]);
    }
    dispatch(toggleLoading(true));
    await axios(`${baseUrl}measurements/${measurement_id}/upload`, {
      method: 'post',
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        res.status === 200 && successfulMessage(t('toast.success_photo_upload'));
        dispatch(toggleLoading(false));

        setGalleryImages(res.data.images);
      })
      .catch(async err => {
        console.log(err);
        try {
          const res = await axios(`${baseUrl}measurements/${measurement_id}/upload`, {
            method: 'post',
            data: formData,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          setGalleryImages(res.data.images);
          successfulMessage(t('toast.success_photo_upload'));
          dispatch(toggleLoading(false));
        } catch (error) {
          dispatch(toggleLoading(false));
          failedMessage(t('toast.error_photo_upload'));
        }
      });
    dispatch(initializeSurveys());
    setIsModalVisible(false);
    setVisible(false);
  };

  //? Function to take camera picture and save it using formData that we will send to the server

  const takePictureFromCamera = async () => {
    let newImage: any = {};
    const formData = new FormData();
    if (Platform.OS === 'android' && !(await hasAndroidPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE))) {
      return;
    }
    const img = await ImagePicker.openCamera({
      width: 1920,
      height: 1080,
      mediaType: 'photo',
    });
    const newImageUri = img.path.split('file:/').join('');
    newImage = { uri: img.path, type: img.mime, name: img.path.split('/').pop(), imageUrl: img.path };
    setGalleryImages(prevState => [...prevState, newImage]);
    formData.append('files[]', newImage);

    const token = await getBearerToken();
    dispatch(toggleLoading(true));

    await axios(`${baseUrl}measurements/${measurement_id}/upload`, {
      method: 'post',
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        setGalleryImages(res.data.images);
        dispatch(toggleLoading(false));
        successfulMessage(t('toast.success_photo_upload'));
      })
      .catch(async err => {
        console.log(err);
        try {
          const res = await axios(`${baseUrl}measurements/${measurement_id}/upload`, {
            method: 'post',
            data: formData,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });

          setGalleryImages(res.data.images);
          successfulMessage(t('toast.success_photo_upload'));
          dispatch(toggleLoading(false));
        } catch (error) {
          dispatch(toggleLoading(false));
          failedMessage(t('toast.error_photo_upload'));
          const getImages = async () => {
            const bearer = await getBearerToken();
            if (bearer) {
              setToken(bearer);
            }
            if (measurement_id) {
              AxiosInstance.get(`${baseUrl}measurements/${measurement_id}/images`)
                .then(res => {
                  setGalleryImages(res.data, { headers: { Authorization: `Bearer ${bearer}` } });
                })
                .catch(err => {
                  console.error(err);
                });
            }
          };
          getImages();
        }
      });

    setIsModalVisible(false);
    setVisible(false);
    dispatch(initializeSurveys());
    return formData;
  };

  const getSliderImages = () => {
    const images = galleryImages.map(image => ({ uri: image.imageUrl }));
    return images;
  };

  const renderFooterComponent = () => <ImageSliderFooter activeIndex={activeIndex} total={galleryImages.length} />;

  if (isLoading) {
    <LoadingSpinner visible={true} title={''} description={''} />;
  }

  return (
    <View>
      {isModalOpen ? (
        <ImageView
          onImageIndexChange={index => {
            setActiveIndex(index);
          }}
          swipeToCloseEnabled
          animationType="fade"
          images={getSliderImages()}
          imageIndex={selectedImageIndex}
          visible={isModalOpen}
          onRequestClose={() => closeGallery()}
          FooterComponent={renderFooterComponent}
        />
      ) : (
        <>
          <View style={styles.pictureContainer}>
            <View style={styles.picturesInfoContainer}>
              <Text style={styles.measurementImagesTitle}>{`${t('survey_measurement.pictures')} (${galleryImages.length})`}</Text>
              {galleryImages.length >= 2 && <ArrowRight set="light" color={Colors.grey_700} />}
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              pagingEnabled
              decelerationRate={0}
              snapToInterval={ScreenWidth - 40}
              snapToAlignment={'center'}
              scrollEventThrottle={5000}
              contentContainerStyle={styles.images}>
              <View style={[styles.imageButton, { width: contentWidth }]}>
                <Plus
                  style={{ alignSelf: 'center' }}
                  size={40}
                  set="bold"
                  color={Colors.grey_600}
                  onPress={() => {
                    setVisible(true);
                  }}
                />
              </View>

              {galleryImages?.map((image, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      openGallery();
                      setSelectedImageIndex(index);
                    }}
                    onLongPress={() => {
                      setIsModalVisible(true);
                      setCurrentImageToDeleteId(image.id);
                    }}
                    key={index}
                    style={[styles.imageButton, { width: contentWidth }]}>
                    {token && (
                      <Image
                        source={{
                          uri: image.imageUrl,
                          headers: { Authorization: `Bearer ${token}` },
                          cache: 'force-cache',
                        }}
                        onLoad={() => setIsLoading(false)}
                        style={styles.galleryImage}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          {noButtons ? null : (
            <View style={styles.btnContainer}>
              <Button
                onPress={() => {
                  setStep(prev => prev + 1);
                }}
                containerStyle={{
                  height: 58,
                  width: ScreenWidth - 40,
                  borderRadius: 100,
                }}
                title={t('survey_measurement.next_btn')}
                buttonStyle={{ backgroundColor: Colors.primary_500, borderRadius: 100, height: '100%' }}
                titleStyle={{ fontSize: RFValue(16, ScreenHeight), fontFamily: 'Urbanist-Bold', color: 'white' }}
              />
            </View>
          )}
          <PhotoUploadModal isVisible={visible} setIsVisible={setVisible} takePhoto={takePictureFromCamera} chooseFromGallery={GallerySelection} />
        </>
      )}
      <WarningModal
        setIsLoading={loading}
        cancel={() => setIsModalVisible(false)}
        removeFunction={handleDeleteImage}
        isVisible={isModalVisible}
        header={t('survey_measurement.delete_image')}
        description={t('survey_measurement.delete_image_confirm')}
        buttonText={'Delete'}
      />
      {loading && <LoadingSpinner visible={loading} title={''} description={''} />}
    </View>
  );
};

export default Images;

const styles = StyleSheet.create({
  pictureContainer: {
    width: ScreenWidth - 40,
    marginTop: 15,
    marginBottom: 20,
  },
  measurementImagesTitle: {
    fontSize: RFValue(18, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
  },
  images: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  imageButton: {
    width: ScreenWidth / 3,
    height: 100,
    backgroundColor: Colors.grey_50,
    borderRadius: 24,
    justifyContent: 'center',
    marginHorizontal: 5,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    borderRadius: 24,
  },
  photoUpload: {
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
    textAlign: 'center',
  },
  buttonContainerStyle: {
    height: 58,
    width: ScreenWidth - 80,
    borderRadius: 100,
  },
  buttonStyle: {
    backgroundColor: Colors.primary_500,
    borderRadius: 100,
    height: '100%',
  },
  buttonTitleStyle: {
    fontSize: RFValue(16, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
    color: 'white',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%',
  },
  btnContainer: {
    alignItems: 'center',
    height: ScreenHeight / 3.5,
    justifyContent: 'flex-end',
  },
  picturesInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
