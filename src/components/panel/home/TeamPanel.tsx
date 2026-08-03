// HRDotNet-Mobile
// Hersvin Fred De La Cruz Labastida, Jessie Cuerda

import { FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import React from 'react';
import { PanResponder, Pressable, Text, TouchableOpacity, View } from 'react-native';
import TeamsItem from 'src/components/item/TeamsItem';
import { COLORS } from 'src/constants/Colors';
import { TEAMS } from 'src/constants/styles/Teams';
import { useTeams } from 'src/contexts/pages';
import { DateArray, MonthYear } from 'src/types/Teams';
import { getCurrentWeek, getNextWeek, getPreviousWeek } from 'src/contexts/pages/home/Teams.context';
import { DateTimeUtils } from 'src/utils/DateTimeUtils';
import { ARRAY } from 'src/constants/Array';

const TeamPanel: React.FC<MonthYear> = ({ onGet }) => {
  const styles = TEAMS.Calendar;
  const weekViewRef = React.createRef<Animatable.View>();
  const { state, handle, setHandle, showMemberDetails } = useTeams();
  const [currentWeek, setCurrentWeek] = React.useState<DateArray>(getCurrentWeek());
  const firstDate = currentWeek[3];
  const month = firstDate.toLocaleString('default', { month: 'long' });
  const year = firstDate.getFullYear();

  React.useEffect(() => {
    onGet(month, year);
  });

  const handlePreviousWeek = () => {
    if (!handle.isSwiping) {
      animateWeekView('left');
      const previousWeek = getPreviousWeek(currentWeek);
      setCurrentWeek(previousWeek);
      setHandle({
        isSwiping: false,
      });
    }
  };

  const handleNextWeek = () => {
    if (!handle.isSwiping) {
      animateWeekView('right');
      const nextWeek = getNextWeek(currentWeek);
      setCurrentWeek(nextWeek);
      setHandle({
        isSwiping: false,
      });
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > 10,
    onPanResponderMove: (evt, gestureState) => {
      if (!handle.isSwiping) {
        if (gestureState.dx > 100) {
          handlePreviousWeek();
        } else if (gestureState.dx < -100) {
          handleNextWeek();
        }
      }
    },
  });

  const animateWeekView = (direction: 'left' | 'right') => {
    const animation = direction === 'left' ? 'slideInLeft' : 'slideInRight';
    weekViewRef.current?.animate(animation, 200);
  };

  return (
    <React.Fragment>
      <View style={styles.calendarList}>
        <TouchableOpacity onPress={handlePreviousWeek} style={styles.buttonNext}>
          <FontAwesome name="caret-left" size={30} color={COLORS.powderBlue} />
        </TouchableOpacity>
        <Animatable.View ref={weekViewRef} {...panResponder.panHandlers} style={styles.weekDate}>
          {currentWeek.map((date, index) => {
            const isActive = date.toDateString() === state.todayDate;
            const textColor = isActive ? 'white' : COLORS.darkGray;
            const dayOfWeek = ARRAY.dayOfWeek[date.getDay()];
            const formattedDate = DateTimeUtils.isoToDateSlash(date.toDateString());
            const active = state.data === formattedDate;
            return (
              <Pressable
                key={index}
                style={[
                  styles.perDay,
                  isActive ? styles.activeDay : styles.inActiveDay,
                  active ? styles.activeDayClicked : null,
                ]}
                onPress={() => showMemberDetails(formattedDate)}
              >
                <Text style={[styles.date, { color: textColor }]}>{date.getDate()}</Text>
                <Text style={[styles.date, { color: textColor }]}>{dayOfWeek}</Text>
              </Pressable>
            );
          })}
        </Animatable.View>
        <TouchableOpacity onPress={handleNextWeek} style={styles.buttonPrev}>
          <FontAwesome name="caret-right" size={30} color={COLORS.powderBlue} />
        </TouchableOpacity>
      </View>

      <TeamsItem initialDate={`${state.data}`} />
    </React.Fragment>
  );
};

export default TeamPanel;
