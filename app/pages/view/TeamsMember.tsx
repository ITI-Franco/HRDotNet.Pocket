// HRDotNet-Mobile
// Developed by: Hersvin Fred De La Cruz Labastida, Jessie Cuerda

import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import PageHeader from 'src/components/header/PageHeader';
import { DayShift } from 'src/components/tags/DayShift';
import { DayTagCard } from 'src/components/tags/DayTagCard';
import { TEAMS } from 'src/constants/styles/Teams';
import { ASSETS, COLORS, DateTimeUtils, STRINGS } from 'src/index';
import { useTeams } from 'src/contexts/pages';

import * as Animatable from 'react-native-animatable';
import { useFetch } from 'src/hooks/useFetch';

const TeamsMember: React.FC = () => {
  const { state, handle, setState} = useTeams();

  React.useEffect(() => {
    (async () => {
      await useFetch.GetTeamMembers(
        state,
        setState,
        state.selectedMember.id 
      );
    })();
  }, [state.teamsData, handle.isLoading, state.selectedMember]);

  const styles = TEAMS.TeamMember;
  return (
    <React.Fragment>
    <Animatable.View>
      <PageHeader name={STRINGS.pageTitleTeamMembers} />
      <View style={styles.container}>
        <View>
          <Image source={ASSETS.mina} style={styles.image} />
        </View>
        <View style={styles.text}>
          <Text style={styles.name}>{state.name}</Text>
          <Text style={styles.position}>{state.position.name}</Text>
        </View>
        <View style={styles.date}>
          <Text style={styles.dateText}>{state.todayDate}</Text>
        </View>
        <DayShift tagColor="Green" label={'Work Shift: ' + DateTimeUtils.twoIsToTimeRangeFormat(state.dateFrom, state.dateTo)} />
        <View style={styles.clockIn}>
          <Text style={styles.italicTitle}>Clock - in</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 15 }}>
            <FontAwesome name="sign-out" color={COLORS.orange} size={30} />
            <Text style={{ color: 'gray', fontStyle: 'italic' }}>No History</Text>
          </View>
        </View>
        <View style={styles.clockOut}>
          <Text style={styles.italicTitle}>Clock - out</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 15 }}>
            <FontAwesome name="sign-out" color={COLORS.powderBlue} size={30} style={{ transform: 'rotate(180deg)' }} />
            <Text style={{ color: 'gray', fontStyle: 'italic' }}>No History</Text>
          </View>
        </View>
        <DayTagCard date={DateTimeUtils.dateSubtractOneWorkDayToDash()} label="Previous" name="Work Day" tagColor="Green" color="green" />
        <DayTagCard date={DateTimeUtils.dateAddWorkDayToDash(state.todayDate)} label="Upcoming" name="Work Day" tagColor="Green" color="green" />

      </View>
    </Animatable.View>
    </React.Fragment>
  );
};

export default TeamsMember;
