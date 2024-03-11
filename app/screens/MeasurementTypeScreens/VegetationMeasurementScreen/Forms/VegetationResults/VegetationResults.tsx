import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Play } from 'react-native-iconly';
import ImageView from 'react-native-image-viewing';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
/* eslint-disable react-native/no-inline-styles */
import { ScreenWidth } from '@rneui/base';

import GradientText from '../../../../../components/GradientText/GradientText';
import ImageSliderFooter from '../../../../../components/ImageSliderFooter';
import { getBearerToken } from '../../../../../data/api/auth/AxiosInstance';
import { styles } from './styles.module';

const VegetationResults = ({ galleryImages, videos, wildlife, foliage, undergrowth, additionalNotes, replantation, goBack, navigateToEdit }) => {
  const { t } = useTranslation();
  const contentWidth = (ScreenWidth - 70) / 3;
  const [token, setToken] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const openGallery = () => setIsModalOpen(true);
  const closeGallery = () => setIsModalOpen(false);
  const getSliderImages = () => {
    const images = galleryImages.map(image => ({ uri: image.imageUrl }));
    return images;
  };
  const navigation: any = useNavigation();

  const renderFooterComponent = () => <ImageSliderFooter activeIndex={activeIndex} total={galleryImages.length} />;

  const valueMap = {
    1: 'Very rare',
    2: 'Rare',
    3: 'Moderate',
    4: 'Dense',
    5: 'Very dense',
  };

  const replantationChecker = () => (replantation === 0 || replantation?.value === 0 ? 'No' : 'Yes');

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
            <Text style={[styles.inputLabel, { width: ScreenWidth - 40, paddingBottom: 20 }]}>{`${t('survey_measurement.photos')} (${galleryImages.length})`}</Text>
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
                    {token ? (
                      <View style={styles.galleryImage}>
                        <Image resizeMode="cover" source={{ uri: video.videoThumb, headers: { Authorization: `Bearer ${token}` } }} style={styles.galleryImage} />
                        <Play width={50} height={50} style={styles.startBtn} set="bold" primaryColor="white" />
                      </View>
                    ) : (
                      <View style={styles.galleryImage} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>
        <View style={styles.lineStyle} />

        <Text style={styles.inputLabel}>{t('survey_measurement.vegetation')}</Text>
        <View style={styles.compInfoContainer}>
          <Text style={styles.compInfoLabel}>{t('survey_measurement.foliage_title')}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <GradientText colors={['#246BFD', '#6F9EFF']} style={[styles.label, { marginHorizontal: 25 }]}>
              {foliage}
            </GradientText>
            <Text style={styles.labelText}>{valueMap[foliage]}</Text>
          </View>
        </View>
        <View style={styles.compInfoContainer}>
          <Text style={styles.compInfoLabel}>{t('survey_measurement.undergrowth_title')}</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <GradientText colors={['#246BFD', '#6F9EFF']} style={[styles.label, { marginHorizontal: 25 }]}>
              {undergrowth}
            </GradientText>
            <Text style={styles.labelText}>{valueMap[undergrowth]}</Text>
          </View>
        </View>

        <View style={styles.lineStyle} />
        <Text style={styles.inputLabel}>{t('survey_measurement.wildLife_title')}</Text>
        <View style={styles.gradientContainer}>
          <GradientText colors={['#246BFD', '#6F9EFF']} style={styles.label}>
            {wildlife}
          </GradientText>
          <Text style={styles.compInfoLabel}>{valueMap[wildlife]}</Text>
        </View>

        <View style={styles.lineStyle} />
        <Text style={styles.inputLabel}>{t('survey_measurement.replantation_title')}</Text>
        <View style={styles.gradientContainer}>
          <GradientText colors={['#246BFD', '#6F9EFF']} style={styles.label}>
            {replantation?.label || replantationChecker()}
          </GradientText>
          <Text style={styles.compInfoLabel}>{replantation === 0 ? t('survey_measurement.plantation_not_necessary') : t('survey_measurement.plantation_necessary')}</Text>
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

export default VegetationResults;
