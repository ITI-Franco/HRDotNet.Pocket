// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, STYLES, STRINGS } from 'src';
import { Utils } from 'src/utils/Utils';
import { PropsSearchAndNew } from 'src/types/Types';

const SearchAndNew: React.FC<PropsSearchAndNew> = ({ setHandle, onlySearch, onPanel, filterValue }) => {
  const platformIOS = Platform.OS === 'ios';
  const styles = STYLES.ComponentSearchAndNew(platformIOS);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const onNewRequestHandle = () => {
    Utils.panelNavigateRequest(onPanel, 1, navigation);
  };


  return (
    <View style={styles.topContainer}>
      <TouchableOpacity style={styles.searchContainer} onPress={() => setHandle({ isVisibleFilter: true })}>
        <FontAwesome name="search" size={20} color={COLORS.orange} />

        <Text style={styles.searchText}>{filterValue !== "undefined" ? filterValue : STRINGS.filter}</Text>
      </TouchableOpacity>

      {!onlySearch && (
        <TouchableOpacity style={styles.newRequestButton} onPress={onNewRequestHandle}>
          <Entypo name="circle-with-plus" size={23} color={COLORS.orange} />
          <Text style={styles.newRequestText}>{STRINGS.newRequest}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchAndNew;
