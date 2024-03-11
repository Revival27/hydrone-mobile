import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

/* eslint-disable @typescript-eslint/no-use-before-define */
import { ScreenHeight } from '@rneui/base';

import { Colors } from '../../constants/colors';

const DropDownSelector = ({ value, items, setValue, multiple = true, searchable = true }) => {
  const [open, setOpen] = useState(false);
  const [activePicker, setactivePicker] = useState(false);
  DropDownPicker.setListMode('SCROLLVIEW');
  DropDownPicker.setMode('BADGE');
  return (
    <DropDownPicker
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
      searchPlaceholder="Search..."
      onPress={() => setactivePicker(true)}
      style={activePicker ? styles.activeDropDown : styles.dropDown}
      onClose={() => setactivePicker(false)}
      dropDownContainerStyle={styles.activeDropDown}
      closeAfterSelecting={true}
      containerStyle={styles.containerStyle}
      labelStyle={activePicker ? styles.activeLabel : styles.inactiveLabel}
      theme="LIGHT"
      dropDownDirection="BOTTOM"
      listItemLabelStyle={styles.optionLabeText}
      placeholderStyle={activePicker ? styles.activeLabel : styles.inactiveLabel}
      searchable={searchable}
      searchContainerStyle={styles.searchContainerStyle}
      searchTextInputStyle={styles.searchTextInputStyle}
      searchPlaceholderTextColor={Colors.primary_500}
      open={open}
      badgeDotColors={Colors.primary_300}
      badgeColors={[Colors.primary_500]}
      badgeTextStyle={styles.badgeTextStyle}
      multiple={multiple}
      selectedItemLabelStyle={{ color: Colors.primary_500 }}
      min={0}
      max={5}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
    />
  );
};

export default DropDownSelector;

const styles = StyleSheet.create({
  containerStyle: {
    height: ScreenHeight / 5.5,
    marginBottom: 50,
  },
  searchContainerStyle: {
    borderBottomWidth: 0,
  },
  searchTextInputStyle: {
    borderWidth: 1,
    color: Colors.primary_500,
    borderColor: Colors.primary_500,
  },
  dropDown: {
    backgroundColor: Colors.grey_50,
    borderWidth: 0,
  },

  activeDropDown: {
    backgroundColor: Colors.primary_100,
    borderWidth: 0,
  },
  activeLabel: {
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.primary_500,
  },
  inactiveLabel: {
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
  },
  badgeTextStyle: {
    color: 'white',
  },
  optionLabeText: {
    color: Colors.primary_300,
  },
});
