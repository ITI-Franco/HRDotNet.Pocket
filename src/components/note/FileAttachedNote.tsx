// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { Text } from 'react-native';

import { STRINGS, STYLES } from 'src';

const FileAttachedNote: React.FC = () => {
  const styles = STYLES.ComponentFileAttachedNote;
  return <Text style={styles.fileNote}>{STRINGS.fileNote}</Text>;
};

export default FileAttachedNote;
