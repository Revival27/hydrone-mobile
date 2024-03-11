import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ChevronDown, ChevronUp, Search } from 'react-native-iconly';

/* eslint-disable @typescript-eslint/no-use-before-define */
import { ScreenWidth } from '@rneui/base';

import GeneralIcon from '../../assets/images/icons/generalIcon.svg';
import SoilIcon from '../../assets/images/icons/soilIcon.svg';
import VegetationIcon from '../../assets/images/icons/vegetationIcon.svg';
import WaterIcon from '../../assets/images/icons/waterIcon.svg';
import { Colors } from '../../constants/colors';
import { useKeyboard } from '../../hooks/useKeyboard';

const DropDown = ({ setGroup }) => {
  const ICON_WIDTH = 22;
  const [expanded, setExpanded] = useState(false);
  const options = [
    {
      name: 'All',
      icon: null,
      measurement_type_id: 6,
    },
    {
      name: 'River discharge',
      icon: <WaterIcon width={ICON_WIDTH} />,
      measurement_type_id: 3,
    },
    {
      name: 'Vegetation',
      icon: <VegetationIcon width={ICON_WIDTH} />,
      measurement_type_id: 2,
    },
    {
      name: 'Soil',
      icon: <SoilIcon width={ICON_WIDTH} />,
      measurement_type_id: 1,
    },
    {
      name: 'General',
      icon: <GeneralIcon width={ICON_WIDTH} />,
      measurement_type_id: 5,
    },
  ];
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    setGroup(selected.measurement_type_id);
  }, [selected, setGroup]);

  return (
    <View style={styles.dropDown}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.dropdownLabelContainer}>
        {selected.icon}
        <Text style={styles.labelText}>{selected.name}</Text>
        {expanded && <ChevronUp set="bold" color={Colors.grey_900} />}
        {!expanded && <ChevronDown set="bold" color={Colors.grey_900} />}
      </TouchableOpacity>
      {expanded && (
        <ScrollView keyboardShouldPersistTaps="handled" style={[styles.dropdownContainer]}>
          {options.map(option => {
            return (
              <TouchableOpacity
                key={option.name}
                style={selected.name === option.name ? styles.selectedOption : styles.dropdownOption}
                onPress={() => {
                  setExpanded(false);
                  setSelected(option);
                }}>
                <View style={selected.name === option.name ? styles.selectedContainer : styles.optionContainer}>
                  {option.icon}
                  <Text style={selected.name === option.name ? styles.selectedOptionText : styles.options}>{option.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export const SearchDropDown = ({ setGroup, setSearchFilter, setVisibleMeasurementList }) => {
  const keyboard = useKeyboard();
  const isActiveSearch = keyboard.activeSearch;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
      <View style={isActiveSearch ? styles.activeSearchBar : styles.searchbarContainer}>
        <View style={styles.leftSide}>
          <Search color={isActiveSearch ? Colors.primary_500 : Colors.grey_900} set="light" />
          <TextInput defaultValue={''} onChangeText={text => setSearchFilter(text)} style={isActiveSearch ? styles.activeSearchText : styles.searchText} />
          <DropDown setGroup={setGroup} />
        </View>
      </View>
      <Text onPress={() => setVisibleMeasurementList(false)}>Cancel</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontFamily: 'Urbanist-Bold',
    color: Colors.grey_900,
    marginHorizontal: 5,
  },
  dropdownOption: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  selectedOption: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 12,
  },
  selectedContainer: {
    marginTop: 5,
    height: 50,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: Colors.primary_100,
  },
  optionContainer: {
    marginTop: 5,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  selectedOptionText: {
    fontFamily: 'Urbanist-Bold',
    color: Colors.primary_500,
    marginLeft: 5,
  },
  searchbarContainer: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 12,
    width: ScreenWidth / 1.4,
    backgroundColor: Colors.grey_100,
  },
  activeSearchBar: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 12,
    width: ScreenWidth / 1.4,

    backgroundColor: Colors.primary_100,
    borderWidth: 1,
    borderColor: Colors.primary_500,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropDown: {
    flexDirection: 'column',
  },
  dropdownLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    paddingHorizontal: 10,
    borderRadius: 100,
    backgroundColor: Colors.primary_100,
  },
  activeLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    paddingHorizontal: 10,
    borderRadius: 100,
    backgroundColor: Colors.primary_200,
  },
  options: {
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
    marginLeft: 5,
  },
  dropdownContainer: {
    top: 40,
    right: 0,
    // padding: 10,
    position: 'absolute',
    backgroundColor: 'white',
    width: 170,
    elevation: 5,
    borderRadius: 12,
  },

  searchText: {
    flex: 1,
    backgroundColor: Colors.grey_100,
    padding: 10,
    color: Colors.grey_900,
  },
  activeSearchText: {
    flex: 1,
    backgroundColor: Colors.primary_100,
    padding: 10,
    color: Colors.grey_900,
  },
  text: {
    color: Colors.grey_900,
  },
});
