import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { Button } from '@rneui/themed';

import { styles } from './style.module';

interface IProps {
  navigateTo?: () => void;
  Icon: React.ReactNode;
  title: string;
  description: string;
}

const NoItems: FC<IProps> = ({ navigateTo, Icon, title, description }) => {
  return (
    <View style={styles.container}>
      {Icon}
      <Text style={styles.noItemsText}>{title}</Text>
      {navigateTo ? (
        <Button
          onPress={() => {
            navigateTo();
          }}
          containerStyle={styles.btnContainer}
          title={description}
          buttonStyle={styles.btnStyle}
          titleStyle={styles.btnTitle}
        />
      ) : (
        <Text style={styles.noItemsDescripion}>{description}</Text>
      )}
    </View>
  );
};

export default NoItems;
