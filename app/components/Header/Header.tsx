import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { ArrowLeft } from 'react-native-iconly';

import { Colors } from '../../constants/colors';
import { styles } from './style.module';

interface IProps {
  title: string | undefined;
  children?: React.ReactNode;
  goBack?: Function;
  backButton: boolean;
}

const Header: FC<IProps> = ({ backButton, goBack, title, children }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftside}>
        {backButton && <ArrowLeft hitSlop={{ top: 12, bottom: 12, right: 12, left: 12 }} style={styles.leftArrow} color={Colors.grey_900} onPress={() => goBack?.()} />}
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.rightSidebuttons}>{children}</View>
    </View>
  );
};

export default Header;
