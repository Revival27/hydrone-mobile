import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ArrowRight, Play } from 'react-native-iconly';
import ImageView from 'react-native-image-viewing';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
/* eslint-disable react-native/no-inline-styles */
import { ScreenHeight, ScreenWidth } from '@rneui/base';

import GradientText from '../../../../../components/GradientText/GradientText';
import ImageSliderFooter from '../../../../../components/ImageSliderFooter';
import { Colors } from '../../../../../constants/colors';
import { styles } from './styles.module';
import { getBearerToken } from '../../../../../data/api/auth/AxiosInstance';

const WaterResults = ({
  galleryImages,
  videos,
  additionalNotes,
  waterLevelChecked,
  riverDischarge,
  riverWidth,
  riverBed,
  riverWall,
  riverWallColor,
  riverFlow,
  wildLife,
  selectedRiverFlow,
  goBack,
  navigateToEdit,
}) => {
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
    if (riverWidth >= 15) {
      return 'Wide enough for construction';
    }
    return 'Not wide enough for construction';
  };

  const valueMap = {
    1: 'Very rare',
    2: 'Rare',
    3: 'Moderate',
    4: 'Dense',
    5: 'Very dense',
  };

  useEffect(() => {
    const getToken = async () => {
      const bearer = await getBearerToken();
      if (bearer) {
        setToken(bearer);
      }
      return bearer;
    };
    getToken();
  }, [galleryImages, token]);

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
                {token &&
                  galleryImages?.map((image, index) => {
                    console.log(image.imageUrl);
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
                            }}
                            style={styles.galleryImage}
                            onError={({ nativeEvent: { error } }) => console.log(error)}
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
                console.log(video);
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('VideoPlayerScreen', { url: video.videoUrl, thumbnail: video.videoThumb })}
                    activeOpacity={1}
                    key={index}
                    style={styles.video}>
                    {token && (
                      <View style={styles.galleryImage}>
                        <Image
                          resizeMode="cover"
                          source={{ uri: video.videoThumb, headers: { Authorization: `Bearer ${token}` } }}
                          style={styles.galleryImage}
                          onError={({ nativeEvent: { error } }) => console.log(error)}
                        />

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

        <Text style={styles.inputLabel}>{t('survey_measurement.water_level_title')}</Text>
        <View style={styles.gradientContainer}>
          <GradientText colors={['#246BFD', '#6F9EFF']} style={styles.label}>
            {waterLevelChecked && typeof waterLevelChecked === 'object' ? `${waterLevelChecked?.label}` : waterLevelChecked || 'Not specified'}
          </GradientText>
        </View>
        <View style={styles.lineStyle} />
        <Text style={styles.inputLabel}>{t('survey_measurement.river_discharge_title')}</Text>
        <View style={styles.gradientContainer}>
          <GradientText colors={['#246BFD', '#6F9EFF']} style={styles.label}>
            {selectedRiverFlow || riverFlow ? `${selectedRiverFlow || riverDischarge}  ${riverFlow} m³/s` : 'Not specified'}
          </GradientText>
        </View>
        <View style={styles.lineStyle} />
        <Text style={styles.inputLabel}>{t('survey_measurement.river_width')}</Text>
        <View style={styles.gradientContainer}>
          <GradientText colors={['#246BFD', '#6F9EFF']} style={styles.label}>
            {riverWidth ? `${riverWidth} m` : 'Not specified'}
          </GradientText>
          <Text style={styles.compInfoLabel}>{riverWidth ? qualityChecker() : ''}</Text>
        </View>
        <View style={styles.lineStyle} />
        <Text style={styles.inputLabel}>{t('survey_measurement.river_soil')}</Text>
        <View style={styles.compInfoContainer}>
          <Text style={styles.compInfoLabel}>{t('survey_measurement.river_bed')}</Text>
          <Text style={styles.compInfoValue}>{riverBed}</Text>
        </View>
        <View style={styles.compInfoContainer}>
          <Text style={styles.compInfoLabel}>{t('survey_measurement.river_wall')}</Text>
          <Text style={styles.compInfoValue}>{riverWall}</Text>
        </View>
        <View style={styles.compInfoContainer}>
          <Text style={styles.compInfoLabel}>{t('survey_measurement.river_wall_color')}</Text>
          <Text style={styles.compInfoValue}>{riverWallColor}</Text>
        </View>
        <View style={styles.lineStyle} />
        <Text style={styles.inputLabel}>{t('survey_measurement.wildLife_title')}</Text>
        <View style={styles.gradientContainer}>
          <GradientText colors={['#246BFD', '#6F9EFF']} style={styles.label}>
            {wildLife ? wildLife : '0'}
          </GradientText>
          <View>
            <Text style={styles.compInfoLabel}>{valueMap[wildLife]}</Text>
          </View>
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

export default WaterResults;
