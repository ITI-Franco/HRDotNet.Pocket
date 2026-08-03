// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, Text } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { STYLES, DateTimeUtils, STRINGS } from 'src';
import { PropsTimesheetItem, SchemaCalendarEntries } from 'src/types/Types';
import { Utils } from 'src/utils/Utils';

const TimesheetItem: React.FC<PropsTimesheetItem> = ({ title, icon, color, time, source }) => {
  const styles = STYLES.ComponentTimesheetItem;

  const sourceName: string = Utils.checkCalendarEntrySource({ source: source } as SchemaCalendarEntries).name!;

  return (
    <Animatable.View animation={'fadeIn'} duration={1000}>
      <Text style={styles.clockInOutText}>{title}</Text>

      <View style={styles.itemContainer}>
        <Shadow distance={2} offset={[1, 1]} style={styles.shadowView}>
          <FontAwesome name={icon} color={color} size={38} style={{ paddingRight: 20, marginLeft: 10 }} />

          <View>
            <Text style={styles.itemText}>{time ? DateTimeUtils.isoToTimeUnits(time) : STRINGS.blankLine}</Text>

            {source && <Text style={styles.regularText}>{source}
              </Text>}
          </View>
        </Shadow>
      </View>
    </Animatable.View>
  );
};

export default TimesheetItem;
