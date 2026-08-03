// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { FontAwesome } from '@expo/vector-icons';

import { Utils } from 'src/utils/Utils';
import { STYLES, ARRAY, STRINGS, DateTimeUtils } from 'src';
import { SchemaCalendarEntries } from 'src/types/Types';
import Note from '../note/Note';
import { useCalendar } from 'src/contexts/tabs';
import BottomSheet from 'src/components/bottom-sheet/BottomSheet';

const CalendarItem: React.FC = () => {
  const styles = STYLES.ComponentCalendarItem;

  const {
    state: { selected },
  } = useCalendar();

  const checkCalendarSource = () =>
    Utils.checkCalendarSource(
      selected.entry[selected.entry.length - 1].isRestDay
        ? STRINGS.RD
        : selected.entry[selected.entry.length - 1].source,
    );

  const subDayContent = (content: SchemaCalendarEntries) => {
    const sourceProps = Utils.checkCalendarEntrySource(content);
    return (
      <View style={styles.subDayContentView}>
        <Text style={[styles.subDayContentTitle, { backgroundColor: sourceProps.color }]}>
          {sourceProps.tag || content.source}
        </Text>

        <Text style={styles.subDayContentText}>{sourceProps.title}</Text>
      </View>
    );
  };

  const DisplayOtherDates = (title: string, data: { date: string; source: string; isRestDay: boolean }) => {
    const sourceProps = Utils.checkCalendarSource(data.isRestDay ? STRINGS.RD : data.source);
    return (
      <View style={styles.dayBelowWrapper}>
        <View style={styles.rowWrapper}>
          <Text style={styles.boldText}>{title}</Text>
          <Text style={styles.dateBelowText}>{DateTimeUtils.dateDefaultToHalfMonthDay(data.date)}</Text>
        </View>

        <View style={[styles.dayBelowEventWrapper, { borderColor: sourceProps.color }]}>
          <FontAwesome name="circle" size={27} color={sourceProps.color} style={styles.topCircle} />
          <Text style={styles.dayBelowEvent}>{sourceProps.tag || STRINGS.none}</Text>
        </View>
      </View>
    );
  };

  const DisplayStatus = () => {
    return selected.date == DateTimeUtils.getCurrDateDefault()
      ? ARRAY.dayStatus[0]
      : selected.date == DateTimeUtils.getCurrDateDefaultLessDay()
        ? ARRAY.dayStatus[1]
        : selected.date == DateTimeUtils.getCurrDateDefaultAddDay()
          ? ARRAY.dayStatus[2]
          : STRINGS.event;
  };

  return (
    <BottomSheet
      setBottom={-360}
      children={
        <React.Fragment>
          {selected.date && selected.entry ? (
            <React.Fragment>
              <View style={styles.topView}>
                <Text style={styles.dayStatus}>{DisplayStatus()}</Text>

                <Text style={styles.selectedDayText}>{DateTimeUtils.dateDefaultToHalfMonthDay(selected.date)}</Text>
              </View>

              <ScrollView>
                <View style={styles.selectedEvent}>
                  <React.Fragment>
                    <Shadow
                      distance={3}
                      offset={[1.5, 1.5]}
                      startColor={checkCalendarSource().color}
                      style={styles.selectedDayEvent}
                    >
                      <View style={styles.selectedDayView}>
                        <FontAwesome
                          name="circle"
                          size={40}
                          color={checkCalendarSource().color}
                          style={styles.topCircle}
                        />

                        <Text style={styles.dayEventText}>{checkCalendarSource().tag || STRINGS.none}</Text>
                      </View>
                    </Shadow>

                    <View style={styles.dayContentWrapper}>
                      {selected.entry.map((item: SchemaCalendarEntries, index: number) => (
                        <View key={index}>{subDayContent(item)}</View>
                      ))}
                    </View>

                    {selected.previous.source && DisplayOtherDates(STRINGS.previous, selected.previous)}
                    {selected.next.source && DisplayOtherDates(STRINGS.upcoming, selected.next)}
                  </React.Fragment>
                </View>
              </ScrollView>
            </React.Fragment>
          ) : (
            <Note text={STRINGS.selectDateNote} icon="grid" size={70} />
          )}
        </React.Fragment>
      }
    />
  );
};
export default CalendarItem;
