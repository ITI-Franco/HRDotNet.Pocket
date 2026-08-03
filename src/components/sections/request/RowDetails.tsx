// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, Text } from 'react-native';
import DashedLine from 'react-native-dashed-line';

import { STYLES, COLORS, STRINGS } from 'src';
import { PropsRowDetails } from 'src/types/Types';

const RowDetails: React.FC<PropsRowDetails> = ({ item, index }) => {
  const styles = STYLES.ComponentRequestSummary;

  return (
    <View style={styles.rowView} key={index}>
      <Text style={styles.boldText}>{item.label}</Text>

      <Text style={styles.summaryText}>
        {item.value === 0 ? STRINGS.no : item.value === 1 ? STRINGS.yes : item.value}
      </Text>

      <DashedLine style={styles.dashed} dashColor={COLORS.gray} dashLength={5} />
    </View>
  );
};

export default RowDetails;
