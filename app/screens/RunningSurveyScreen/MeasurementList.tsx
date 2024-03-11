import { t } from 'i18next';
import React, { FC, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Paper, Search } from 'react-native-iconly';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';

import GeneralIcon from '../../assets/images/icons/generalIcon.svg';
import SoilIcon from '../../assets/images/icons/soilIcon.svg';
import VegetationIcon from '../../assets/images/icons/vegetationIcon.svg';
import WaterIcon from '../../assets/images/icons/waterIcon.svg';
import NoItems from '../../components/NoItems/NoItems';
import WarningModal from '../../components/WarningModal/WarningModal';
import { Colors } from '../../constants/colors';
import { MeasurementType } from '../../constants/measurementTypes';
import { deleteMeasurement } from '../../store/measurementSlice';
import { RootState } from '../../store/store';
import { SearchDropDown } from './SearchDropdown';
import { styles } from './style.module';

const MEASUREMENT_TYPES = {
  VEGETATION: 'vegetation',
  SOIL_COMPOSITION: 'soil_composition',
  RIVER_DISCHARGE: 'river_discharge',
  GENERAL: 'general',
};
interface MeasurementProps {
  survey_id: number;
  setExpanded: Function;
  setVisibleMeasurementList?: Function;
}

const MeasurementRowElement = ({ handleLongPress, measurement }) => {
  const navigation: any = useNavigation();
  const [hour, minute] = measurement?.time.split(':');
  const formattedTime = hour.concat(':').concat(minute);

  const iconSelector = () => {
    if (measurement.measurement_type_id === MeasurementType.RiverDischarge) {
      return <WaterIcon />;
    } else if (measurement.measurement_type_id === MeasurementType.Vegetation) {
      return <VegetationIcon />;
    } else if (measurement.measurement_type_id === MeasurementType.Soil) {
      return <SoilIcon />;
    } else {
      return <GeneralIcon />;
    }
  };

  const whereTo = () => {
    switch (measurement.measurement_type_slug) {
      case MEASUREMENT_TYPES.GENERAL:
        return 'GeneralDetailsSummaryScreen';
      case MEASUREMENT_TYPES.SOIL_COMPOSITION:
        return 'SoilDetailsSummaryScreen';
      case MEASUREMENT_TYPES.RIVER_DISCHARGE:
        return 'WaterDetailsSummaryScreen';
      case MEASUREMENT_TYPES.VEGETATION:
        return 'VegetationDetailsSummaryScreen';
      default:
        return 'GeneralDetailsSummaryScreen';
    }
  };

  return (
    <>
      <TouchableOpacity
        onLongPress={handleLongPress}
        onPress={() => navigation.navigate(whereTo(), { id: measurement.id, surveyId: measurement.survey_id })}
        style={styles.rowElement}>
        <View style={styles.leftSide}>
          {iconSelector()}
          <View style={styles.data}>
            <Text style={styles.rowElementTitle}>{measurement.name.length >= 20 ? measurement.name.substring(15, 0) + '...' : measurement.name}</Text>
            <Text style={styles.location}>
              {measurement.latitude} | {measurement.longitude}
            </Text>
          </View>
        </View>
        <View style={styles.time}>
          <Text style={styles.timeText}>{formattedTime}</Text>
          <View style={styles.modeContainer} />
        </View>
      </TouchableOpacity>
    </>
  );
};

const EmptyList = ({ text, callback }) => {
  return (
    <View style={styles.emptyList}>
      <Paper size={87} primaryColor={Colors.primary_500} set="bulk" />
      <Text style={styles.emptyListText}>{text}</Text>
      <Button onPress={callback} containerStyle={styles.btnContainer} title={'Add measurement'} buttonStyle={styles.btnStyle} titleStyle={styles.btnTitle} />
    </View>
  );
};

const MeasurementList: FC<MeasurementProps> = ({ survey_id, setExpanded, setVisibleMeasurementList }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading.loading);

  const [searchFilter, setSearchFilter] = useState<string>('');
  const [group, setGroup] = useState(MeasurementType.NoGroup);
  const [modalVisible, setModalVisible] = useState(false);

  const [chosenMeasurementID, setChosenMeasurementId] = useState(0);

  const allMeasurements = useSelector((state: RootState) => state.measurement.measurements.filter(item => item.survey_id === survey_id));

  const allMeasurementsCopy = useMemo(() => allMeasurements.filter(m => m.name.toLowerCase().includes(searchFilter.toLowerCase())), [allMeasurements, searchFilter]);

  const groupedMeasurements = useMemo(
    () => allMeasurements.filter(measurement => measurement.measurement_type_id === group && measurement.name.toLowerCase().includes(searchFilter.toLowerCase())),
    [allMeasurements, group, searchFilter],
  );

  // measurements being displayed if no search filter
  const displayedMeasurements = group === MeasurementType.NoGroup ? allMeasurementsCopy : groupedMeasurements;

  const removeMeasurement = id => {
    //@ts-ignore

    dispatch(deleteMeasurement(id, () => setModalVisible(false)));
  };

  const renderList = () => {
    if (allMeasurements.length === 0) {
      return <EmptyList callback={() => setExpanded(false)} text={t('survey_measurement.empty_list.all')} />;
    } else if (displayedMeasurements.length === 0) {
      return <EmptyList callback={() => setExpanded(false)} text={t('survey_measurement.empty_list.category')} />;
    } else if (searchFilter !== '' && displayedMeasurements.length === 0) {
      return (
        <NoItems
          Icon={<Search set="bulk" primaryColor={Colors.primary_500} size={87} />}
          title={t('survey.all_surveys.no_results_title')}
          description={t('survey.all_surveys.no_results_description')}
        />
      );
    } else {
      //TODO
      return displayedMeasurements.map(measurement => {
        return <MeasurementRowElement key={measurement.id} handleLongPress={() => (setModalVisible(true), setChosenMeasurementId(measurement.id))} measurement={measurement} />;
      });
    }
  };

  return (
    <View style={styles.container}>
      {/*  eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ zIndex: 1, marginBottom: 10 }}>
        <SearchDropDown setVisibleMeasurementList={setVisibleMeasurementList} setGroup={setGroup} setSearchFilter={setSearchFilter} />
      </View>
      <ScrollView contentContainerStyle={styles.rowElementContainer}>{renderList()}</ScrollView>
      <WarningModal
        setIsLoading={loading}
        cancel={() => setModalVisible(false)}
        removeFunction={() => removeMeasurement(chosenMeasurementID)}
        isVisible={modalVisible}
        header={'Delete'}
        description={'Delete measurement from survey?'}
        buttonText={'delete'}
      />
    </View>
  );
};

export default MeasurementList;
