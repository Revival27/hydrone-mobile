import React, { useState } from 'react';
import { Animated, Image } from 'react-native';

const LoadingImage = props => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [animatedValue] = useState(new Animated.Value(0));

  return (
    <>
      <Image {...props} onLoad={() => setImageLoaded(true)} />
      {imageLoaded && (
        <Animated.View
          style={[
            {
              backgroundColor: animatedValue.interpolate({
                inputRange: [0, 100],
                outputRange: ['rgba(100,100,100, 0.3)', 'rgba(100,100,100,0.5)'],
              }),
            },
          ]}
        />
      )}
    </>
  );
};

export default LoadingImage;
