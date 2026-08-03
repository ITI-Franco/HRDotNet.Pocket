// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, TextInput, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { COLORS, STYLES, STRINGS } from 'src';

const Search: React.FC<{
  filterText: string;
  setFilterText: ({ filterText }: { filterText: string }) => void;
}> = ({ filterText, setFilterText }) => {
  const platformIOS = Platform.OS === 'ios';
  const styles = STYLES.ComponentSearch(platformIOS);

  return (
    <View style={styles.topContainer}>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color={COLORS.orange} />

        <TextInput
          style={styles.searchValueText}
          placeholder={STRINGS.search}
          placeholderTextColor={COLORS.lighterGray}
          onChangeText={(text) => setFilterText({ filterText: text })}
          value={filterText}
        />
      </View>
    </View>
  );
};

export default Search;
