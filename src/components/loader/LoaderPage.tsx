// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { ActivityIndicator } from 'react-native';

import { COLORS, STYLES } from 'src';
const LoaderPage: React.FC = () => {
  const styles = STYLES.ComponentLoaderPage;

  return <ActivityIndicator size="large" color={COLORS.darkGray} style={styles.loading} />;
};

export default LoaderPage;
