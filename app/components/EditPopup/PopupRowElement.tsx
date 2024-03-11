import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ChevronRight } from 'react-native-iconly';

import { styles } from './styles.module';

interface IProps {
  children?: React.ReactNode;
  handlePress: () => void;
}

const PopupRowElement: FC<IProps> = ({ children, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress} hitSlop={{ top: 10, bottom: 10, left: 50, right: 50 }} style={styles.element}>
      <View style={styles.elementLeft}>{children}</View>
      <ChevronRight color={'black'} />
    </TouchableOpacity>
  );
};

export default PopupRowElement;
