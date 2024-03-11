/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, PermissionsAndroid, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Exif from 'react-native-exif';
import { ArrowRight, Play, Plus } from 'react-native-iconly';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';

/* eslint-disable react-native/no-inline-styles */
import { NavigationProp, ParamListBase, useIsFocused } from '@react-navigation/native';
import { Button, ScreenHeight, ScreenWidth } from '@rneui/base';

import { baseUrl } from '../constants/apiUrls';
import { Colors } from '../constants/colors';
import { AxiosInstance, getBearerToken } from '../data/api/auth/AxiosInstance';
import { getVideos } from '../data/api/measurements/measurementsService';
import { styles } from '../screens/MeasurementTypeScreens/GeneralMeasurementScreen/styles.module';
import { toggleLoading } from '../store/loadingSlice';
import { deleteMeasurementImage, deleteMeasurementVideo, editMeasurement } from '../store/measurementSlice';
import { RootState } from '../store/store';
import { initializeSurveys } from '../store/surveysSlice';
import { nameChecker } from '../tools/nameChecker';
import { hasAndroidPermission } from '../tools/PermissionRequests/Permissions';
import { failedMessage, successfulMessage } from '../tools/ToastMessages/Messages';
import CustomTextArea from './CustomTextArea';
import Header from './Header/Header';
import ImageSliderFooter from './ImageSliderFooter';
import LoadingSpinner from './LoadingSpinner';
import MeasurementIconSelector from './MeasurementIconselector';
import PhotoUploadModal from './PhotoUploadModal/PhotoUploadModal';
import VideoUploadModal from './VideoUploadModal/VideoUploadModal';
import WarningModal from './WarningModal/WarningModal';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const MeasurementDetailsPage: FC<IProps> = ({ navigation, route }) => {
  const { id, surveyId } = route.params;
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const measurement: any = useSelector((state: RootState) => state.measurement.measurements.find(m => m.id === id));
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState<any>(`${measurement?.latitude} - ${measurement?.longitude}`);
  const [description, setDescription] = useState<string>(measurement?.description);
  const [galleryImages, setGalleryImages] = useState<any[]>([...measurement?.images]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [videos, setVideos] = useState<any[]>([...measurement?.videos]);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);
  const contentWidth = (ScreenWidth - 70) / 3;
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [isVideoSelectionModalVisible, setIsVideoSelectionModalVisible] = useState<boolean>(false);
  const [isPhotoSelectionModalVisible, setIsPhotoSelectionModalVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [isThirdModalVisible, setIsThirdModalVisible] = useState(false);
  const [currentImageToDeleteId, setCurrentImageToDeleteId] = useState<number>();
  const [currentVideoDeleteId, setCurrentVideoDeleteId] = useState<number>();

  const handleDeleteImage = () => {
    const filteredImages = galleryImages.filter(image => image.id !== currentImageToDeleteId);

    const updatedMeasurement = {
      ...measurement,
      images: filteredImages,
    };
    const payload = {
      id: id,
      fileId: currentImageToDeleteId,
      measurement: updatedMeasurement,
    };
    setIsSecondModalVisible(false);
    dispatch(deleteMeasurementImage(payload));
    setGalleryImages(filteredImages);
    dispatch(initializeSurveys());
    setIsModalVisible(false);
  };

  const fetchVideos = () => {
    getVideos(measurement.id)
      .then(res => {
        //@ts-ignore
        setVideos(res.data, { headers: { Authorization: `Bearer ${token}` } });
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleDeleteVideo = async () => {
    const filteredVideos = videos.filter(video => video.id !== currentVideoDeleteId);
    const updatedMeasurement = {
      ...measurement,
      videos: filteredVideos,
    };
    const payload = {
      id: id,
      fileId: currentVideoDeleteId,
      measurement: updatedMeasurement,
    };
    dispatch(deleteMeasurementVideo(payload));
    setIsThirdModalVisible(false);
    await AxiosInstance.get(`${baseUrl}measurements/${id}/videos`)
      .then(res => {
        setVideos(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    const getImages = async () => {
      const bearer = await getBearerToken();
      if (bearer) {
        setToken(bearer);
      }
      if (id) {
        AxiosInstance.get(`${baseUrl}measurements/${id}/images`)
          .then(res => {
            //@ts-ignore
            setGalleryImages(res.data, { headers: { Authorization: `Bearer ${bearer}` } });
          })
          .catch(err => {
            console.error(err);
          });
      }
    };
    getImages();
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isFocused, dispatch, token]);

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
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      setGalleryImages(prevState => [...prevState, newImage]);
    }
    dispatch(toggleLoading(true));
    await axios(`${baseUrl}measurements/${id}/upload`, {
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
        dispatch(initializeSurveys());
        setGalleryImages(res.data.images);
      })
      .catch(async err => {
        console.log(err);
        try {
          const res = await axios(`${baseUrl}measurements/${id}/upload`, {
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
            if (id) {
              AxiosInstance.get(`${baseUrl}measurements/${id}/images`)
                .then(res => {
                  //@ts-ignore
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
    dispatch(initializeSurveys());
    setIsPhotoSelectionModalVisible(false);
    setIsModalVisible(false);
  };

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
    const newImageUri = 'file:///' + img.path.split('file:/').join('');
    newImage = { uri: newImageUri, type: img.mime, name: newImageUri.split('/').pop(), imageUrl: newImageUri };
    setGalleryImages(prevState => [...prevState, newImage]);
    formData.append('files[]', newImage);

    const token = await getBearerToken();
    dispatch(toggleLoading(true));

    await axios(`${baseUrl}measurements/${id}/upload`, {
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
          const res = await axios(`${baseUrl}measurements/${id}/upload`, {
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
            if (id) {
              AxiosInstance.get(`${baseUrl}measurements/${id}/images`)
                .then(res => {
                  //@ts-ignore
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
    dispatch(initializeSurveys());
    setIsModalVisible(false);
    setIsPhotoSelectionModalVisible(false);
    return formData;
  };

  const VideoSelection = async () => {
    let newVideo: any = {};
    const formData = new FormData();

    if (Platform.OS === 'android' && !(await hasAndroidPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE))) {
      return;
    }

    const videosFromPicker = await ImagePicker.openPicker({ multiple: true, mediaType: 'video' });
    for (const video of videosFromPicker) {
      const newVideoUri = 'file:///' + video.path.split('file:/').join('');
      newVideo = { uri: newVideoUri, type: video.mime, name: 'video.mp4', videoUrl: newVideoUri };
      formData.append('files[]', newVideo);
    }

    const token = await getBearerToken();
    dispatch(toggleLoading(true));
    await axios(`${baseUrl}measurements/${id}/upload-video`, {
      method: 'post',
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data;',
      },
    })
      .then(res => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        res.status === 200 && successfulMessage(t('toast.success_video_upload'));
        dispatch(toggleLoading(false));
        dispatch(initializeSurveys());
        setVideos(res.data.videos);
        setIsVideoSelectionModalVisible(false);
      })
      .catch(async err => {
        console.log(err);
        const res = await axios(`${baseUrl}measurements/${id}/upload-video`, {
          method: 'post',
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data;',
          },
        });
        setVideos(res.data.videos);
        setIsVideoSelectionModalVisible(false);
        dispatch(toggleLoading(false));
        successfulMessage(t('toast.success_video_upload'));
      });
  };

  const TakeVideoFromCamera = async () => {
    let newVideo: any = {};
    const formData = new FormData();
    if (Platform.OS === 'android' && !(await hasAndroidPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE))) {
      return;
    }
    try {
      const video = await ImagePicker.openCamera({
        mediaType: 'video',
      });
      newVideo = { uri: video.path, type: video.mime, name: 'video.mp4', videoUrl: video.path };
      formData.append('files[]', newVideo);
      setVideos(prevState => [...prevState, newVideo]);

      const token = await getBearerToken();
      dispatch(toggleLoading(true));
      await axios(`${baseUrl}measurements/${id}/upload-video`, {
        method: 'post',
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(async res => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          res.status === 200 && successfulMessage(t('toast.success_video_upload'));
          dispatch(toggleLoading(false));
          dispatch(initializeSurveys());
          setVideos(res.data.videos);
        })
        .catch(async err => {
          console.log(err);
          const res = await axios(`${baseUrl}measurements/${id}/upload-video`, {
            method: 'post',
            data: formData,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data;',
            },
          });
          setVideos(res.data.videos);
          setIsVideoSelectionModalVisible(false);
          dispatch(toggleLoading(false));
          successfulMessage(t('toast.success_video_upload'));
        });
    } catch (err) {
      console.error(err);
    }
    dispatch(initializeSurveys());
  };
  const getSliderImages = () => {
    const images = galleryImages.map(image => ({ uri: image.imageUrl }));
    return images;
  };

  const renderFooterComponent = () => <ImageSliderFooter activeIndex={activeIndex} total={galleryImages.length} />;

  const edit = () => {
    const latitude = location.split('-')[0];
    const longitude = location.split('-')[1];
    dispatch(editMeasurement({ id, data: { ...measurement, description: description, latitude, longitude } }));
    navigation.navigate('RunningSurveyPage', { id: surveyId });
  };

  if (loading) {
    return <LoadingSpinner visible={true} title={''} description={''} />;
  }

  if (isLoading) {
    <LoadingSpinner visible={true} title={''} description={''} />;
  }

  return (
    <>
      {isOpen ? (
        <ImageView
          onImageIndexChange={index => {
            setActiveIndex(index);
          }}
          swipeToCloseEnabled
          animationType="fade"
          images={getSliderImages()}
          imageIndex={selectedImageIndex}
          visible={isOpen}
          onRequestClose={() => closeGallery()}
          FooterComponent={renderFooterComponent}
        />
      ) : (
        <>
          <View style={styles.mainContainer}>
            <TouchableOpacity activeOpacity={1} style={styles.goBackArrow}>
              <Header backButton={true} goBack={() => navigation.navigate('RunningSurveyPage', { id: surveyId })} title={undefined} />
            </TouchableOpacity>
            <KeyboardAwareScrollView extraScrollHeight={100} keyboardShouldPersistTaps="handled" enableOnAndroid style={{ flex: 1 }}>
              <ScrollView keyboardShouldPersistTaps="handled" horizontal={false} contentContainerStyle={styles.contentContainer}>
                <View style={styles.measurementContainer}>
                  {measurement && <MeasurementIconSelector measurement={measurement} height={100} width={100} />}
                  <Text style={styles.measurementName}>{nameChecker(measurement?.name)}</Text>
                </View>

                <View style={styles.lineStyle} />

                <View style={styles.pictureContainer}>
                  <View style={styles.picturesInfoContainer}>
                    <Text style={styles.measurementImagesTitle}>{`${t('survey_measurement.pictures')} (${galleryImages.length})`}</Text>
                    {galleryImages.length >= 2 && <ArrowRight set="light" color={Colors.grey_700} />}
                  </View>
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
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
                          setIsPhotoSelectionModalVisible(true);
                        }}
                      />
                    </View>

                    {galleryImages.map((image, index) => {
                      return (
                        <TouchableOpacity
                          key={image?.id}
                          activeOpacity={1}
                          onPress={() => {
                            openGallery();
                            setSelectedImageIndex(index);
                          }}
                          onLongPress={() => {
                            setIsSecondModalVisible(true); //
                            setCurrentImageToDeleteId(image?.id);
                          }}
                          style={[styles.imageButton, { width: contentWidth }]}>
                          {token ? (
                            <Image
                              source={{
                                uri: image.imageUrl,
                                headers: { Authorization: `Bearer ${token}` },
                                // cache: 'force-cache',
                              }}
                              onLoad={() => setIsLoading(false)}
                              style={styles.galleryImage}
                            />
                          ) : (
                            <View style={styles.galleryImage} />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>

                <View style={styles.pictureContainer}>
                  <Text style={styles.measurementImagesTitle}>{`${t('survey_measurement.video')} (${videos?.length}) `}</Text>
                  <View style={[styles.imageButton, { width: contentWidth }]}>
                    <Plus
                      style={{ alignSelf: 'center' }}
                      size={40}
                      set="bold"
                      color={Colors.grey_600}
                      onPress={() => {
                        setIsVideoSelectionModalVisible(true);
                      }}
                    />
                  </View>
                  <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    pagingEnabled
                    decelerationRate={0}
                    snapToInterval={ScreenWidth - 40}
                    snapToAlignment={'center'}
                    scrollEventThrottle={5000}
                    contentContainerStyle={styles.images}>
                    {videos?.map((video, index) => {
                      return (
                        <TouchableOpacity
                          onLongPress={() => {
                            setCurrentVideoDeleteId(video?.id);
                            setIsThirdModalVisible(true);
                          }}
                          onPress={() => navigation.navigate('VideoPlayerScreen', { url: video.videoUrl, thumbnail: video.videoThumb })}
                          activeOpacity={1}
                          key={index}
                          style={styles.video}>
                          {token && (
                            <View style={styles.galleryImage}>
                              <Image resizeMode="cover" source={{ uri: video.videoThumb, headers: { Authorization: `Bearer ${token}` } }} style={styles.galleryImage} />
                              <Play width={50} height={50} style={styles.startBtn} set="bold" primaryColor="white" />
                            </View>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>

                <Text style={[styles.inputLabel, { width: ScreenWidth - 40 }]}>{t('survey_measurement.location_title')}</Text>
                <View style={styles.locationInput}>
                  <TextInput
                    placeholder={t('survey_measurement.location_title')}
                    placeholderTextColor={Colors.grey_500}
                    style={styles.inputText}
                    value={location}
                    onChangeText={text => setLocation(text)}
                  />
                </View>
                <View style={{}}>
                  <Text style={styles.inputLabel}>{t('survey_measurement.notes')}</Text>

                  <CustomTextArea backgroundColor={Colors.grey_200} placeholderTextColor={Colors.grey_500} value={description} onChangeText={text => setDescription(text)} />
                </View>
                <View style={styles.btnContainer}>
                  <Button
                    onPress={edit}
                    containerStyle={{
                      height: 58,
                      width: ScreenWidth - 40,
                      borderRadius: 100,
                    }}
                    title={t('survey_measurement.save_btn')}
                    buttonStyle={{ backgroundColor: Colors.primary_500, borderRadius: 100, height: '100%' }}
                    titleStyle={{ fontSize: RFValue(16, ScreenHeight), fontFamily: 'Urbanist-Bold', color: 'white' }}
                  />
                </View>
              </ScrollView>
            </KeyboardAwareScrollView>
          </View>
        </>
      )}

      <PhotoUploadModal
        isVisible={isPhotoSelectionModalVisible}
        setIsVisible={setIsPhotoSelectionModalVisible}
        takePhoto={() => {
          takePictureFromCamera();
          setIsPhotoSelectionModalVisible(false);
        }}
        chooseFromGallery={GallerySelection}
      />

      <VideoUploadModal
        isVisible={isVideoSelectionModalVisible}
        setIsVisible={setIsVideoSelectionModalVisible}
        takeVideo={() => {
          TakeVideoFromCamera();
          setIsVideoSelectionModalVisible(false);
        }}
        chooseFromGallery={VideoSelection}
      />

      <WarningModal
        setIsLoading={loading}
        cancel={() => setIsSecondModalVisible(false)}
        removeFunction={handleDeleteImage}
        isVisible={isSecondModalVisible}
        header={t('survey_measurement.delete_image')}
        description={t('survey_measurement.delete_image_confirm')}
        buttonText={'Delete'}
      />
      <WarningModal
        setIsLoading={loading}
        cancel={() => setIsThirdModalVisible(false)}
        removeFunction={handleDeleteVideo}
        isVisible={isThirdModalVisible}
        header={t('survey_measurement.delete_video')}
        description={t('survey_measurement.delete_video_confirm')}
        buttonText={'Delete'}
      />
      {loading && <LoadingSpinner visible={loading} title={''} description={''} />}
    </>
  );
};

export default MeasurementDetailsPage;
