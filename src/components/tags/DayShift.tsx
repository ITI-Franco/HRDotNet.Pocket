// HRDotNet-Mobile
// Developed by: Hersvin Fred De La Cruz Labastida

import React from 'react';
import { Text, View } from 'react-native';
import { TEAMS } from 'src/constants/styles/Teams';

interface DayShiftProps {
  label: string;
  tagColor: 'Purple' | 'Red' | 'Green';
}

export const DayShift: React.FC<DayShiftProps> = ({ label, tagColor }) => {
  const styles = TEAMS.TeamMember;
  const circleColor = styles[`circle${tagColor}`];

  return (
    <React.Fragment>
      <View style={styles.workShift}>
        <View style={circleColor}>
          <Text></Text>
        </View>
        <View>
          <Text>{label}</Text>
        </View>
      </View>
    </React.Fragment>
  );
};
