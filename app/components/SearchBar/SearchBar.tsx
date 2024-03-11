import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { CloseSquare, Search } from 'react-native-iconly';
import { Searchbar } from 'react-native-paper';

import { useIsFocused } from '@react-navigation/native';

import { Colors } from '../../constants/colors';
import { useKeyboard } from '../../hooks/useKeyboard';
import { styles } from './style.module';

interface IProps {
  callback: Function;
  // data: any;
}

const SearchBar: FC<IProps> = ({ callback }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchBar, setShowSearchbar] = useState(false);
  const isFocused = useIsFocused();
  const keyboard = useKeyboard();
  const isActiveSearch = keyboard.activeSearch;
  const { t } = useTranslation();

  const closeSearchBar = () => {
    setShowSearchbar(false);
    setSearchTerm('');
  };

  useEffect(() => {
    callback(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    !isFocused && closeSearchBar();
  }, [isFocused]);

  return (
    <View>
      {showSearchBar ? (
        <Searchbar
          style={isActiveSearch ? styles.activeSearchBar : styles.searchBar}
          icon={() => <Search color={isActiveSearch ? Colors.primary_500 : Colors.grey_900} />}
          placeholder={t('components.search_bar.placeholder')}
          value={searchTerm}
          onChangeText={e => {
            setSearchTerm(e);
          }}
          clearIcon={() => <CloseSquare color={Colors.primary_500} onPress={closeSearchBar} />}
        />
      ) : (
        <Search style={styles.searchIcon} onPress={() => setShowSearchbar(true)} color={Colors.grey_900} />
      )}
    </View>
  );
};

export default SearchBar;
