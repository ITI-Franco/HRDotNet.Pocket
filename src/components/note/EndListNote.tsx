// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import { STYLES, STRINGS, COLORS } from 'src';

const EndListNote: React.FC = () => {
  const styles = STYLES.ComponentEndListNote;

  return (
    <View style={styles.container}>
      <FontAwesome5 name="stop" size={13} color={COLORS.lighterGray} />
      <Text style={styles.text}>{STRINGS.endListNote}</Text>
    </View>
  );
};

export default EndListNote;
