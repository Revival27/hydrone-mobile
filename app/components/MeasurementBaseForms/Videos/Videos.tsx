/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Play, Plus } from 'react-native-iconly';
import ImagePicker from 'react-native-image-crop-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
/* eslint-disable @typescript-eslint/no-use-before-define */
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { Button } from '@rneui/themed';

import { baseUrl } from '../../../constants/apiUrls';
import { Colors } from '../../../constants/colors';
import { AxiosInstance, getBearerToken } from '../../../data/api/auth/AxiosInstance';
import { getVideos } from '../../../data/api/measurements/measurementsService';
import { toggleLoading } from '../../../store/loadingSlice';
import { deleteMeasurementVideo } from '../../../store/measurementSlice';
import { RootState } from '../../../store/store';
import { initializeSurveys } from '../../../store/surveysSlice';
import { hasAndroidPermission } from '../../../tools/PermissionRequests/Permissions';
import { failedMessage, successfulMessage } from '../../../tools/ToastMessages/Messages';
import LoadingSpinner from '../../LoadingSpinner';
import VideoUploadModal from '../../VideoUploadModal/VideoUploadModal';
import WarningModal from '../../WarningModal/WarningModal';

interface IProps {
  videos: any;
  setVideos: any;
  step?: number;
  setStep?: any;
  noButtons?: boolean;
  measurement_id?: number;
}

const Videos: FC<IProps> = ({ videos, setVideos, step, setStep, noButtons, measurement_id }) => {
  const { t } = useTranslation();
  const contentWidth = (ScreenWidth - 70) / 3;
  const measurement: any = useSelector((state: RootState) => state.measurement.measurements.find(m => m.id === measurement_id));
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [token, setToken] = useState('');
  const [currentVideoDeleteId, setCurrentVideoDeleteId] = useState();
  const dispatch = useDispatch();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigation: any = useNavigation();

  const fetchVideos = async () => {
    const bearer = await getBearerToken();
    if (bearer) setToken(bearer);

    getVideos(measurement.id)
      .then(res => {
        setVideos(res.data, { headers: { Authorization: `Bearer ${bearer}` } });
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (measurement_id) {
      fetchVideos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measurement_id, setVideos, token]);

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
      // setVideos(prevState => [...prevState, newVideo]);
      setVisible(false);
    }
    const token = await getBearerToken();
    dispatch(toggleLoading(true));
    await axios(`${baseUrl}measurements/${measurement_id}/upload-video`, {
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
      })
      .catch(async err => {
        console.log(err);
        const res = await axios(`${baseUrl}measurements/${measurement_id}/upload-video`, {
          method: 'post',
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data;',
          },
        });
        setVideos(res.data.videos);
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
      // setVideos(prevState => [...prevState, newVideo]);

      const token = await getBearerToken();
      dispatch(toggleLoading(true));
      await axios(`${baseUrl}measurements/${measurement_id}/upload-video`, {
        method: 'post',
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          res.status === 200 && successfulMessage(t('toast.success_video_upload'));
          setVideos(res.data.videos);
          dispatch(toggleLoading(false));
        })
        .catch(async err => {
          console.log(err);
          const res = await axios(`${baseUrl}measurements/${measurement_id}/upload-video`, {
            method: 'post',
            data: formData,
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data;',
            },
          });
          setVideos(res.data.videos);
          dispatch(toggleLoading(false));
          successfulMessage(t('toast.success_video_upload'));
        });
    } catch (err) {
      console.error(err);
    }
    dispatch(initializeSurveys());
  };

  const getCurrentVideoToDelete = (id: number | undefined) => {
    return id;
  };

  const handleDeleteVideo = async () => {
    const videoId: any = getCurrentVideoToDelete(currentVideoDeleteId);
    const filteredVideos = videos.filter(video => video.id !== currentVideoDeleteId);
    const updatedMeasurement = {
      ...measurement,
      videos: filteredVideos,
    };
    const payload = {
      id: measurement_id,
      fileId: videoId,
      measurement: updatedMeasurement,
    };
    dispatch(deleteMeasurementVideo(payload));
    setVideos(filteredVideos);
    setDeleteModalVisible(false);
    await AxiosInstance.get(`${baseUrl}measurements/${measurement_id}/videos`)
      .then(res => {
        setVideos(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  if (loading) {
    return <LoadingSpinner visible={true} title={''} description={''} />;
  }

  return (
    <>
      <View>
        <View style={styles.pictureContainer}>
          <Text style={styles.measurementImagesTitle}>{`${t('survey_measurement.video')} (${videos?.length}) `}</Text>
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
          <ScrollView horizontal pagingEnabled contentContainerStyle={styles.images}>
            {videos?.length > 0 ? (
              videos?.map((video, index) => {
                return (
                  <TouchableOpacity
                    onLongPress={() => {
                      getCurrentVideoToDelete(video?.id);
                      setCurrentVideoDeleteId(video?.id);
                      setDeleteModalVisible(true);
                    }}
                    onPress={() => navigation.navigate('VideoPlayerScreen', { url: video.videoUrl, thumbnail: video.videoThumb, token })}
                    activeOpacity={1}
                    key={index}
                    style={styles.video}>
                    {token ? (
                      <View style={styles.galleryImage}>
                        <Image
                          resizeMode="cover"
                          source={{ uri: video.videoThumb, headers: { Authorization: `Bearer ${token}` }, cache: 'force-cache' }}
                          style={styles.galleryImage}
                        />
                        <Play width={50} height={50} style={styles.startBtn} set="bold" primaryColor="white" />
                      </View>
                    ) : (
                      <View style={styles.galleryImage} />
                    )}
                  </TouchableOpacity>
                );
              })
            ) : (
              <View />
            )}
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
      </View>
      <VideoUploadModal
        isVisible={visible}
        setIsVisible={setVisible}
        takeVideo={() => {
          TakeVideoFromCamera();
          setVisible(false);
        }}
        chooseFromGallery={VideoSelection}
      />
      <WarningModal
        setIsLoading={loading}
        cancel={() => setDeleteModalVisible(false)}
        removeFunction={handleDeleteVideo}
        isVisible={deleteModalVisible}
        header={t('survey_measurement.delete_video')}
        description={t('survey_measurement.delete_video_confirm')}
        buttonText={'Delete'}
      />
      {loading && <LoadingSpinner visible={loading} title={''} description={''} />}
    </>
  );
};

export default Videos;

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
    marginBottom: 10,
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
  images: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  video: {
    width: ScreenWidth - 40,
    height: ScreenHeight / 3,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 24,
    paddingHorizontal: 5,
  },
  galleryImage: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 24,
  },
  btnContainer: {
    alignItems: 'center',
    height: ScreenHeight / 3,
    justifyContent: 'flex-end',
    paddingBottom: 35,
  },
  startBtn: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
