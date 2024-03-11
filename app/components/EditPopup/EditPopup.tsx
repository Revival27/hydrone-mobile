import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import DraggablePanel from 'react-native-draggable-panel';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight } from '@rneui/base';
import { Button } from '@rneui/themed';

import { Colors } from '../../constants/colors';
import { styles } from './styles.module';

type Props = {
  isVisible: boolean;
  children?: ReactNode;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  height?: any;
  handlePress?: Function;
};
const screenHeight = Dimensions.get('window').height;

const EditPopup: React.FC<Props> = ({ isVisible, setIsVisible, title, handlePress, children, height = screenHeight / 3 }) => {
  const { t } = useTranslation();

  return (
    <DraggablePanel animationDuration={300} overlayOpacity={0.2} initialHeight={height} expandable={false} visible={isVisible} onDismiss={() => setIsVisible(false)} borderRadius={30}>
      <View hitSlop={{ bottom: 30, left: 20, right: 20, top: 20 }} style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={styles.lineStyle} />
        {children}
        <View style={styles.buttons}>
          <TouchableOpacity activeOpacity={1}>
            <Button type="outline" onPress={() => handlePress?.()} containerStyle={styles.errorButtonContainer} title={t('project.one_project.popup.button_delete')} buttonStyle={styles.errorButtonStyle} titleStyle={styles.errorButtonText} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1}>
            <Button
              onPress={() => setIsVisible(false)}
              containerStyle={styles.cancelButtonContainer}
              title={t('components.popup.cancel')}
              buttonStyle={{ backgroundColor: Colors.primary_500, borderRadius: 100, height: '100%' }}
              titleStyle={{ fontSize: RFValue(16, ScreenHeight), fontFamily: 'Urbanist-Bold', color: 'white' }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </DraggablePanel>
  );
};

export default EditPopup;
