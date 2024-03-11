import React, { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import BlueBg from '../assets/images/icons/BlueBg.svg';
import GreenBg from '../assets/images/icons/greenBg.svg';
import PurpleBg from '../assets/images/icons/purpleBg.svg';
import RedBg from '../assets/images/icons/redBg.svg';
import { Backgrounds } from '../constants/Backgrounds';
import { Colors } from '../constants/colors';

interface IProps {
  children: React.ReactNode;
  changeBg: (active: number) => void;
}

const getBackGround = (id: number) => {
  switch (id) {
    case 0:
      return <PurpleBg style={styles.svgBg} />;
    case 1:
      return <GreenBg style={styles.svgBg} />;
    case 2:
      return <BlueBg style={styles.svgBg} />;
    case 3:
      return <RedBg style={styles.svgBg} />;
    case 4:
      return <RedBg style={styles.svgBg} />;
    default:
      console.log('Color does not exist');
  }
};

const BackgroundSlider: FC<IProps> = ({ children, changeBg }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const getIndex = nativeEvent => {
    setActiveIndex(Math.ceil(nativeEvent.contentOffset.x / (nativeEvent.contentSize.width / 5)));
  };

  useEffect(() => {
    changeBg(activeIndex);
    makeSteppers(activeIndex);
  }, [activeIndex]);

  return (
    <>
      <ScrollView
        horizontal
        pagingEnabled
        decelerationRate={1}
        snapToInterval={ScreenWidth}
        snapToAlignment={'center'}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={5000}
        style={{}}
        onScroll={({ nativeEvent }) => {
          getIndex(nativeEvent);
        }}>
        {AllBackgrounds.map((background, index) => (
          <View style={styles.container} key={background.colors1Id}>
            <LinearGradient
              colors={[Backgrounds[background.colors1Id].color1, Backgrounds[background.colors2Id].color2]}
              useAngle={true}
              angle={Backgrounds[background.angleId].angle}
              style={styles.linearGradient}>
              {getBackGround(background.getBgId)}

              {children}
            </LinearGradient>
          </View>
        ))}
      </ScrollView>

      {makeSteppers(activeIndex)}
    </>
  );
};

const makeSteppers = (activeIndex: any) => {
  const dots: JSX.Element[] = [];

  for (let i = 0; i < AllBackgrounds.length; i++) {
    dots.push(
      <View
        key={i}
        style={{
          width: activeIndex === i ? 40 : 10,
          height: 10,
          borderRadius: 100,
          backgroundColor: activeIndex === i ? Colors.primary_500 : Colors.grey_300,
          marginHorizontal: 4,
        }}
      />,
    );
  }
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {dots}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  linearGradient: {
    padding: 32,
    width: ScreenWidth - 40,
    borderRadius: 32,
    marginBottom: 24,
  },
  svgBg: {
    position: 'absolute',
  },
  wrap: {
    width: ScreenWidth,
    height: ScreenHeight / 6,
  },
});

const AllBackgrounds = [
  {
    colors1Id: 0,
    colors2Id: 0,
    angleId: 0,
    getBgId: 0,
  },
  {
    colors1Id: 1,
    colors2Id: 1,
    angleId: 1,
    getBgId: 1,
  },
  {
    colors1Id: 2,
    colors2Id: 2,
    angleId: 2,
    getBgId: 2,
  },
  {
    colors1Id: 3,
    colors2Id: 3,
    angleId: 3,
    getBgId: 3,
  },
  {
    colors1Id: 4,
    colors2Id: 4,
    angleId: 4,
    getBgId: 4,
  },
];

export default BackgroundSlider;
