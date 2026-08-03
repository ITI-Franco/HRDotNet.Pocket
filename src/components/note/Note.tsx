// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, Text } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { COLORS, STYLES } from 'src';
import { PropsNote } from 'src/types/Types';

const Note: React.FC<PropsNote> = ({ text, icon, size }) => {
  const styles = STYLES.ComponentMessages;

  return (
    <View style={styles.container}>
      <Entypo name={icon} size={size || 24} color={COLORS.lighterGray} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Note;
