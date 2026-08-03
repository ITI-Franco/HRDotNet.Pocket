// HRDotNet-Mobile
// Developed by: Hersvin Fred De La Cruz Labastida

import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from 'src/constants/Colors';
import { TEAMS } from 'src/constants/styles/Teams';

interface DayTagCardProps {
  date: string;
  label: string;
  tagColor: 'Purple' | 'Red' | 'Green';
  color: 'purple' | 'red' | 'green';
  name: string;
}

export const DayTagCard: React.FC<DayTagCardProps> = ({ date, label, tagColor, color, name }) => {
  const styles = TEAMS.TeamMember;
  const circleColor = styles[`circle${tagColor}`];
  const borderColor = COLORS[`${color}`];

  return (
    <React.Fragment>
      <View style={styles.previousContainer}>
        <View style={{ gap: 5 }}>
          <Text>{label}</Text>
          <View style={{ paddingHorizontal: 15 }}>
            <View style={[styles.DayTag, { borderColor: borderColor }]}>
              <View style={circleColor}>
                <Text></Text>
              </View>
              <Text>{name}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text>{date}</Text>
        </View>
      </View>
    </React.Fragment>
  );
};
