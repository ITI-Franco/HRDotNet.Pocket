// HRDotNet-Mobile
// Developed by: Hersvin Fred De La Cruz Labastida, Jessie Cuerda

import React from 'react';
import * as Animatable from 'react-native-animatable';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import PageHeader from 'src/components/header/PageHeader';
import { COLORS, STRINGS } from 'src/index';
import TeamPanel from 'src/components/panel/home/TeamPanel';
import { TEAMS } from 'src/constants/styles/Teams';
import { FontAwesome } from '@expo/vector-icons';
import { useTeams } from 'src/contexts/pages';

const Teams: React.FC = () => {
  const styles = TEAMS.Calendar;
  const [month, getMonth] = React.useState<string>('');
  const [year, getYear] = React.useState<number>(0);

  const onGetMonthYear = (newMonth: string, newYear: number) => {
    getMonth(newMonth);
    getYear(newYear);
  };

  return (
    <React.Fragment>
      <StatusBar backgroundColor={COLORS.powderBlue} barStyle="light-content" />
      <PageHeader name={STRINGS.pageTitleTeams} />
      <View style={styles.dateHeader}>
        <View>
          <Text style={styles.dateLabel}>
            {month} {year}
          </Text>
        </View>

        <TouchableOpacity>
          <FontAwesome name="search" size={20} color={COLORS.orange} />
        </TouchableOpacity>
      </View>
      <Animatable.View animation={'fadeIn'} duration={900} style={{ opacity: 1, flex: 1 }}>
        <TeamPanel onGet={onGetMonthYear} />
      </Animatable.View>
    </React.Fragment>
  );
};

export default Teams;
