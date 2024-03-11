/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { Dimensions } from 'react-native';
import { CloseSquare } from 'react-native-iconly';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { getBearerToken } from '../../data/api/auth/AxiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useNavigation } from '@react-navigation/native';

const VideoPlayerScreen = () => {
  const route = useRoute();
  const { url }: any = route.params;
  const navigate = useNavigation();

  const [videoUrl, setVideoUrl] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [buffering, setBuffering] = useState(true);

  const onBuffer = ({ isBuffering }) => {
    setBuffering(isBuffering ? true : false);
  };

  const handleOrientationChange = ({ window }) => {
    setScreenHeight(window.height);
    setScreenWidth(window.width);
  };

  useEffect(() => {
    const getVideo = async () => {
      const bearer = await getBearerToken();
      if (bearer) setToken(bearer);

      if (token) {
        //@ts-ignore
        setVideoUrl(String(url), { headers: { Authorization: `Bearer ${token}` } });
      }
    };
    getVideo();
    setScreenWidth(Dimensions.get('window').width);
    setScreenHeight(Dimensions.get('window').height);
  }, [token, url]);

  useEffect(() => {
    const dimensions = Dimensions.addEventListener('change', handleOrientationChange);

    return () => dimensions.remove();
  }, [screenHeight, screenWidth]);

  useFocusEffect(() => {
    StatusBar.setHidden(true);

    return () => {
      StatusBar.setHidden(false);
    };
  });

  return (
    <React.Fragment>
      {videoUrl && (
        <Video
          onBuffer={onBuffer}
          source={{ uri: videoUrl, headers: { Authorization: `Bearer ${token}` } }}
          style={{ width: screenWidth, height: screenHeight }}
          resizeMode="cover"
          controls={true}
        />
      )}
      <CloseSquare onPress={() => navigate.goBack()} style={styles.closeBtn} set="bold" size={50} primaryColor={'#fff'} />
      <LoadingSpinner visible={buffering} title={''} description={''} />
    </React.Fragment>
  );
};
export default VideoPlayerScreen;

export const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 10,
    zIndex: 999,
    opacity: 0.7,
  },
});
