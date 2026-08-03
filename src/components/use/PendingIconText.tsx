/**
 * @project       HRDotNet-Mobile
 * @description   Reusable Pending Icon or Text
 * @author        Hersvin Fred Labastida
 * @date_created  10-10-2024
 */

import { StyleProp, Text, TextStyle, View } from 'react-native';
import { Entypo, FontAwesome, FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { PENDING } from 'src/constants/styles/Pending';

interface Props {
  applicationType: string;
  renderAs: 'icon' | 'text';
  style?: StyleProp<TextStyle>;
}

const PendingIconText: React.FC<Props> = ({ applicationType, renderAs, style }) => {
  const styles = PENDING.ComponentPendingsItem;
  switch (applicationType) {
    case 'OB':
      return renderAs === 'icon' ? (
        <View style={[styles.iconView, { backgroundColor: '#A7C7E7' }]}>
          <Entypo name="briefcase" size={25} color="white" />
        </View>
      ) : (
        <Text style={style}>Official Business</Text>
      );
    case 'ML':
      return renderAs === 'icon' ? (
        <View style={[styles.iconView, { backgroundColor: '#FAA0A0' }]}>
          <FontAwesome6 name="file-circle-exclamation" size={25} color="white" />
        </View>
      ) : (
        <Text style={style}>Missed Logs</Text>
      );
    case 'LV':
      return renderAs === 'icon' ? (
        <View style={[styles.iconView, { backgroundColor: '#db925c' }]}>
          <MaterialIcons name="leave-bags-at-home" size={25} color="white" />
        </View>
      ) : (
        <Text style={style}>Leave</Text>
      );
    case 'OT':
      return renderAs === 'icon' ? (
        <View style={[styles.iconView, { backgroundColor: '#5bef04' }]}>
          <MaterialCommunityIcons name="clock-time-seven" size={24} color="white" />
        </View>
      ) : (
        <Text style={style}>Overtime</Text>
      );
    case 'COS':
      return renderAs === 'icon' ? (
        <View style={[styles.iconView, { backgroundColor: '#d97efe' }]}>
          <MaterialIcons name="edit-calendar" size={25} color="white" />
        </View>
      ) : (
        <Text style={style}>Change of Schedules</Text>
      );
    case 'OFF':
      return renderAs === 'icon' ? (
        <View style={[styles.iconView, { backgroundColor: '#adadad' }]}>
          <FontAwesome name="exclamation-circle" size={25} color="white" />
        </View>
      ) : (
        <Text style={style}>Offset</Text>
      );
    default:
      return <Text style={style}>{applicationType}</Text>;
  }
};

export default PendingIconText;
