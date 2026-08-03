// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Shadow } from 'react-native-shadow-2';

import { STYLES, STRINGS, DateTimeUtils } from 'src';
import { PropsTimeOffItem } from 'src/types/Types';

const TimeOffItem: React.FC<PropsTimeOffItem> = ({ item }) => {
  const styles = STYLES.ComponentTimeOffItem;

  return (
    <View style={styles.itemWrapper}>
      <Shadow distance={3} offset={[0.8, 2]} style={styles.shadowView}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemHeaderText}>{item.source}</Text>
          <Text style={styles.itemHeaderText}>{item.debit || item.credit}</Text>
        </View>

        <View style={styles.itemBody}>
          <Text style={styles.bodyText}>
            {STRINGS.VLRowTitleI}

            <Text style={styles.itemText}>{DateTimeUtils.dateDefaultToWord(item.dateTransaction)}</Text>
          </Text>

          <Text style={styles.bodyText}>
            {STRINGS.VLRowTitleII}

            <Text style={styles.itemText}>{item.documentNo || STRINGS.blankLine}</Text>
          </Text>
        </View>
      </Shadow>
    </View>
  );
};

export default TimeOffItem;
