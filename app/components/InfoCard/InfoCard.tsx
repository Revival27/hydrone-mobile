import React, { FC } from 'react';
import { View } from 'react-native';

import { styles } from './style.module';

interface IProps {
  children?: React.ReactNode;
}

const InfoCard: FC<IProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default InfoCard;
