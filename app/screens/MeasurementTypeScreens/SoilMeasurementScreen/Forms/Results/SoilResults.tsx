import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowRight, Play } from 'react-native-iconly';
import ImageView from 'react-native-image-viewing';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
/* eslint-disable react-native/no-inline-styles */
import { ScreenWidth } from '@rneui/base';

import GradientText from '../../../../../components/GradientText/GradientText';
import ImageSliderFooter from '../../../../../components/ImageSliderFooter';
import { Colors } from '../../../../../constants/colors';
import { styles } from './styles.module';
import { getBearerToken } from '../../../../../data/api/auth/AxiosInstance';

const SoilResults = ({ galleryImages, videos, soilChecked, compactChecked, generalQuality, selectedSurfaceValues, additionalNotes, goBack, navigateToEdit }) => {
  const { t } = useTranslation();
  const contentWidth = (ScreenWidth - 70) / 3;
  const [token, setToken] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const openGallery = () => setIsModalOpen(true);
  const closeGallery = () => setIsModalOpen(false);
  const navigation: any = useNavigation();
  const getSliderImages = () => {
    const images = galleryImages.map(image => ({ uri: image.imageUrl }));
    return images;
  };

  const renderFooterComponent = () => <ImageSliderFooter activeIndex={activeIndex} total={galleryImages.length} />;

  const qualityChecker = () => {
    if (generalQuality >= 60) {
      return 'Good for construction';
    }
    return 'Bad for construction';
  };

  useEffect(() => {
    const getToken = async () => {
      const bearer = await getBearerToken();
      if (bearer) {
        setToken(bearer);
      }
    };
    getToken();
  }, [token]);

  return (
    <>
      <View style={styles.container}>
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
          <View style={styles.pictureContainer}>
            <View style={styles.picturesInfoContainer}>
              <Text style={[styles.inputLabel, { width: ScreenWidth - 40, paddingBottom: 20 }]}>{`${t('survey_measurement.photos')} (${galleryImages.length})`}</Text>
              {galleryImages.length >= 2 && <ArrowRight set="light" color={Colors.grey_700} />}
            </View>
            {galleryImages.length === 0 ? (
              <Text style={styles.noImagesText}>{t('survey_measurement.no_images')}</Text>
            ) : (
              <ScrollView
                horizontal
                pagingEnabled
                decelerationRate={0}
                snapToInterval={ScreenWidth - 40}
                snapToAlignment={'center'}
                scrollEventThrottle={5000}
                contentContainerStyle={styles.images}>
                {galleryImages.map((image, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        openGallery();
                        setSelectedImageIndex(index);
                      }}
                      key={index}
                      style={[styles.imageButton, { width: contentWidth }]}>
                      {token ? (
                        <Image
                          source={{
                            uri: image.imageUrl,
                            headers: { Authorization: `Bearer ${token}` },
                            // cache: 'force-cache',
                          }}
                          style={styles.galleryImage}
                        />
                      ) : (
                        <View style={styles.galleryImage} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </View>
        )}
        <View style={styles.lineStyle} />

        <View style={styles.pictureContainer}>
          <Text style={styles.inputLabel}>{`${t('survey_measurement.video')} (${videos.length}) `}</Text>
          {videos.length === 0 ? (
            <Text style={styles.noVideosText}>{t('survey_measurement.no_videos')}</Text>
          ) : (
            <ScrollView horizontal pagingEnabled contentContainerStyle={styles.images}>
              {videos?.map((video, index) => {
                return (
                  <TouchableOpacity
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
          )}
        </View>
        <View style={styles.lineStyle} />
        <Text style={styles.inputLabel}>{t('survey_measurement.soil_composition')}</Text>
        <View style={styles.compInfoContainer}>
          <Text style={styles.compInfoLabel}>{t('survey_measurement.surface')}</Text>
          <Text style={styles.compInfoValue}>{selectedSurfaceValues.selectedSurface}</Text>
        </View>
        <View style={styles.compInfoContainer}>
          <Text style={styles.compInfoLabel}>{t('survey_measurement.0.5m')}</Text>
          <Text style={styles.compInfoValue}>{selectedSurfaceValues.selectedDeepHalf}</Text>
        </View>
        <View style={styles.compInfoContainer}>
          <Text style={styles.compInfoLabel}>{t('survey_measurement.1m')}</Text>
          <Text style={styles.compInfoValue}>{selectedSurfaceValues.selectedDeep}</Text>
        </View>
        <View style={styles.lineStyle} />

        <Text style={styles.inputLabel}>{t('survey_measurement.soil_type_text')}</Text>
        <View style={styles.gradientContainer}>
          <GradientText colors={['#246BFD', '#6F9EFF']} style={styles.label}>
            {soilChecked.value || 'Not specified'}
          </GradientText>
          <Text style={styles.compInfoLabel}>{soilChecked.label}</Text>
        </View>
        <View style={styles.lineStyle} />
        <Text style={styles.inputLabel}>{t('survey_measurement.soil_compact')}</Text>
        <View style={styles.gradientContainer}>
          <GradientText colors={['#246BFD', '#6F9EFF']} style={styles.label}>
            {compactChecked.value || 'Not specified'}
          </GradientText>
          <Text style={styles.compInfoLabel}>{compactChecked.label}</Text>
        </View>
        <View style={styles.lineStyle} />
        <Text style={styles.inputLabel}>{t('survey_measurement.general_quality')}</Text>
        <View style={styles.gradientContainer}>
          <GradientText colors={['#246BFD', '#6F9EFF']} style={styles.label}>
            {`${generalQuality || '0'}%`}
          </GradientText>
          <Text style={styles.compInfoLabel}>{qualityChecker()}</Text>
        </View>
        <View style={styles.lineStyle} />
        <View style={{ paddingBottom: 20 }}>
          <Text style={[styles.inputLabel, { paddingVertical: 5 }]}>{t('survey_measurement.additional_notes')}</Text>
          <Text style={styles.compInfoLabel}>{additionalNotes}</Text>
        </View>
      </View>
    </>
  );
};

export default SoilResults;
