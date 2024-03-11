import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, PermissionsAndroid, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import DraggablePanel from 'react-native-draggable-panel';
import Exif from 'react-native-exif';
import { ArrowLeft, Camera, MoreCircle, Plus } from 'react-native-iconly';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';

import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Button, ScreenHeight, ScreenWidth } from '@rneui/base';

import MeasurementIcon from '../../assets/images/icons/MeasurementPic.svg';
import CustomTextArea from '../../components/CustomTextArea';
import ImageSliderFooter from '../../components/ImageSliderFooter';
import { baseUrl } from '../../constants/apiUrls';
import { Colors } from '../../constants/colors';
import { getBearerToken } from '../../data/api/auth/AxiosInstance';
import { initializeSurveys } from '../../store/surveysSlice';
import { hasAndroidPermission } from '../../tools/PermissionRequests/Permissions';
import { styles } from './styles.module';

interface IProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

const SurveyMeasurementPage: FC<IProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const goBackToPreviousRoute = () => {
    const routes = navigation.getState()?.routes;
    navigation.navigate(routes[routes.length - 2]?.name.toString(), { id });
  };
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const [location, setLocation] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [orientation, setOrientation] = useState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [presentedImages, setPresentedImages] = useState<Array<any>>([]);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);
  const dispatch = useDispatch();

  const contentWidth = (ScreenWidth - 70) / 3;

  //? Function to open the gallery and pick images for server upload

  const GallerySelection = async () => {
    let newImage: any = {};

    const formData = new FormData();

    if (Platform.OS === 'android' && !(await hasAndroidPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE))) {
      return;
    }

    try {
      const images = await ImagePicker.openPicker({ multiple: true, mediaType: 'photo' });
      for (const image of images) {
        const { latitude, longitude } = await Exif.getLatLong(image.path);
        newImage = { uri: image.path, type: image.mime, name: 'kep.jpg', latitude, longitude };
        formData.append('files[]', newImage);
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        setGalleryImages(prevState => [...prevState, newImage]);
      }

      const token = await getBearerToken();

      await fetch(`${baseUrl}measurements/${id}/upload`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data;',
        },
      });
    } catch (err) {
      console.error(err);
    }
    dispatch(initializeSurveys());
  };

  //? Function to take camera picture and save it using formData that we will send to the server

  const takePictureFromCamera = async () => {
    let newImage: any = {};
    const formData = new FormData();
    if (Platform.OS === 'android' && !(await hasAndroidPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE))) {
      return;
    }
    try {
      const img = await ImagePicker.openCamera({
        width: 1920,
        mediaType: 'photo',
        height: 1080,
      });
      newImage = { uri: img.path, type: img.mime, name: 'kep.jpg' };
      setGalleryImages(prevState => [...prevState, img]);
      formData.append('files[]', newImage);

      const token = await getBearerToken();
      await fetch(`${baseUrl}measurements/${id}/upload`, {
        method: 'post',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (e) {
      console.error(e);
    }
    dispatch(initializeSurveys());

    return formData;
  };

  //? To get the current degree, direction where the phone faces so we can tell where north is for example

  React.useEffect(() => {
    let cancel = false;
    const degree_update_rate = 5;
    if (CompassHeading.start !== null) {
      CompassHeading.start(degree_update_rate, ({ heading, accuracy }) => {
        if (cancel) {
          setOrientation(heading);
        }
      });
    }

    return () => {
      CompassHeading.stop();
      cancel = true;
    };
  }, []);

  const getSliderImages = () => {
    const images = galleryImages.map((image, index) => ({ uri: image.path, index, width: image.width, height: image.height }));
    setPresentedImages(images);
    return images;
  };

  const renderFooterComponent = () => <ImageSliderFooter activeIndex={activeIndex} total={galleryImages.length} />;

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
          // HeaderComponent={renderHeaderComponent}
        />
      ) : (
        <>
          <View style={styles.mainContainer}>
            <TouchableOpacity activeOpacity={1} style={styles.goBackArrow}>
              <View style={styles.backArrowContainer}>
                <ArrowLeft
                  onPress={() => {
                    goBackToPreviousRoute();
                  }}
                  color={Colors.grey_900}
                />
                <View style={styles.rightHeader}>
                  <Camera
                    style={{
                      marginHorizontal: 10,
                    }}
                    set="light"
                    primaryColor={Colors.grey_900}
                  />
                  <MoreCircle set="light" primaryColor={Colors.grey_900} />
                </View>
              </View>
            </TouchableOpacity>
            <ScrollView horizontal={false} contentContainerStyle={styles.contentContainer}>
              <View style={styles.measurementContainer}>
                <MeasurementIcon />
                <Text style={styles.measurementName}>{t('survey_measurement.vegetation')}</Text>
              </View>
              <View style={styles.lineStyle} />

              <View style={styles.pictureContainer}>
                <Text style={styles.measurementImagesTitle}>{t('survey_measurement.pictures')}</Text>
                <ScrollView
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
                        <Image
                          source={{
                            uri: image?.path,
                          }}
                          style={styles.galleryImage}
                        />
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

                <CustomTextArea
                  backgroundColor={Colors.grey_200}
                  placeholder={t('survey_measurement.notes')}
                  placeholderTextColor={Colors.grey_500}
                  value={description}
                  onChangeText={text => setDescription(text)}
                />
              </View>
              <View style={styles.btnContainer}>
                <Button
                  containerStyle={{
                    height: 58,
                    width: ScreenWidth - 40,
                    borderRadius: 100,
                  }}
                  title={t('survey_measurement.button_action')}
                  buttonStyle={{ backgroundColor: Colors.primary_500, borderRadius: 100, height: '100%' }}
                  titleStyle={{ fontSize: RFValue(16, ScreenHeight), fontFamily: 'Urbanist-Bold', color: 'white' }}
                />
              </View>
            </ScrollView>
          </View>
          <DraggablePanel visible={visible} onDismiss={() => setVisible(false)} expandable={false} borderRadius={30}>
            <View>
              <Text style={styles.photoUpload}>{t('survey_measurement.upload')}</Text>
            </View>
            <View style={styles.buttons}>
              <Button
                onPress={takePictureFromCamera}
                containerStyle={styles.buttonContainerStyle}
                title={t('survey_measurement.button_action')}
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonTitleStyle}>
                {t('survey_measurement.camera')}
              </Button>
              <Button
                onPress={GallerySelection}
                containerStyle={styles.buttonContainerStyle}
                title={t('survey_measurement.button_action')}
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonTitleStyle}>
                {t('survey_measurement.gallery')}
              </Button>
            </View>
          </DraggablePanel>
        </>
      )}
    </>
  );
};

export default SurveyMeasurementPage;
