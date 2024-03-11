import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Play } from 'react-native-iconly';
import ImageView from 'react-native-image-viewing';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
/* eslint-disable react-native/no-inline-styles */
import { ScreenWidth } from '@rneui/base';

import ImageSliderFooter from '../../../../components/ImageSliderFooter';
import { styles } from './styles.module';
import { getBearerToken } from '../../../../data/api/auth/AxiosInstance';

const GeneralResults = ({ galleryImages, videos, additionalNotes, name, date, time, location, goBack, navigateToEdit }) => {
  const { t } = useTranslation();
  const contentWidth = (ScreenWidth - 70) / 3;
  const [token, setToken] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const openGallery = () => setIsModalOpen(true);
  const closeGallery = () => setIsModalOpen(false);
  const navigation: any = useNavigation();
  const latitude = location?.split('-')[0];
  const longitude = location?.split('-')[1];

  const getSliderImages = () => {
    const images = galleryImages.map(image => ({ uri: image.imageUrl }));
    return images;
  };
  const renderFooterComponent = () => <ImageSliderFooter activeIndex={activeIndex} total={galleryImages.length} />;

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
          </View>
        )}
        <View style={styles.lineStyle} />

        <View style={styles.pictureContainer}>
          <Text style={styles.inputLabel}>{`${t('survey_measurement.video')} (${videos.length}) `}</Text>
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
        </View>
        <View style={styles.lineStyle} />
        <View style={styles.compInfoContainer}>
          <Text style={styles.compInfoValue}>{t('survey_measurement.survey_name')}</Text>
          <Text style={styles.compInfoLabel}>{name}</Text>
        </View>
        <View style={styles.lineStyle} />
        <View style={styles.compInfoContainer}>
          <Text style={styles.compInfoValue}>{t('survey_measurement.location_title')}</Text>
          <Text style={styles.compInfoLabel}>{`${Number(latitude).toFixed(2)} - ${Number(longitude).toFixed(2)}`}</Text>
        </View>
        <View style={styles.lineStyle} />
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>{t('survey_measurement.date_title')}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.infoText}>{typeof date === 'string' ? date : date.toDateString()}</Text>
            <Text style={styles.infoText}>{typeof time === 'string' ? time : time.toLocaleTimeString()}</Text>
          </View>
        </View>
        <View style={styles.lineStyle} />
        <View style={styles.compInfoContainer}>
          <Text style={styles.compInfoValue}>{t('survey_measurement.notes')}</Text>
          <Text style={styles.compInfoLabel}>{additionalNotes}</Text>
        </View>
        <View style={styles.lineStyle} />
      </View>
    </>
  );
};

export default GeneralResults;
