// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { STYLES, STRINGS, COLORS } from 'src';
import { PropsMaterialIconsNote } from 'src/types/Types';

const MaterialIconsNote: React.FC<PropsMaterialIconsNote> = ({ icon, text }) => {
  const styles = STYLES.ComponentLostFileNote;

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} size={50} color={COLORS.lighterGray} />

      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default MaterialIconsNote;
