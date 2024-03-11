import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@rneui/themed';

import Warning from '../../assets/images/icons/warning.svg';
import { Colors } from '../../constants/colors';
import { styles } from './style.module';

interface IProps {
  children?: React.ReactNode;
  header: string;
  description: string;
  isVisible: boolean;
  removeFunction?: Function;
  cancel: Function;
  setIsLoading?: boolean;
  buttonText?: string;
}

const WarningModal: FC<IProps> = ({ buttonText, header, description, isVisible, cancel, removeFunction, setIsLoading }) => {
  const { t } = useTranslation();

  return (
    <Modal transparent visible={isVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Warning width={'75%'} />
          <Text style={styles.header}>{header}</Text>
          <Text style={styles.description}>{description}</Text>
          <TouchableOpacity>
            <Button
              loading={setIsLoading}
              loadingProps={{
                size: 'small',
                color: Colors.error,
              }}
              onPress={() => removeFunction?.()}
              type="outline"
              containerStyle={styles.errorButtonContainer}
              title={buttonText}
              buttonStyle={styles.errorButtonStyle}
              titleStyle={styles.errorButtonText}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1}>
            <Button
              onPress={() => cancel()}
              containerStyle={styles.cancelButtonContainer}
              title={t('components.popup.cancel')}
              buttonStyle={styles.cancelButton}
              titleStyle={styles.cancelButtonTitle}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default WarningModal;
