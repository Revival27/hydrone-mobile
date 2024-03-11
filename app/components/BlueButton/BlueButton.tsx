import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { styles } from './styles.module';

interface IProps {
  navigation?: NavigationProp<ParamListBase>;
  title: string;
  disabled?: boolean;
  handleClick: Function;
}

const BlueButton: FC<IProps> = ({ handleClick, title, disabled }) => {
  const loading = useSelector((state: RootState) => state.loading.loading);

  return (
    <Button
      disabled={disabled ? true : false}
      onPress={() => {
        handleClick();
      }}
      containerStyle={styles.buttonContainerStyle}
      buttonStyle={styles.buttonStyle}
      loading={loading}
      loadingProps={{
        size: 'small',
        color: 'rgba(111, 202, 186, 1)',
      }}>
      {title}
    </Button>
  );
};

export default BlueButton;
