// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Shadow } from 'react-native-shadow-2';

import { STYLES, STRINGS, DateTimeUtils } from 'src';
import { Utils } from 'src/utils/Utils';
import { PropsRequestItem } from 'src/types/Types';

const RequestItem: React.FC<PropsRequestItem> = ({ onPanel, data, navigation }) => {
  const styles = STYLES.ComponentRequestItem(data?.filing?.filingStatus?.name);
  enum PanelType {
    REQUESTED_SCHED = 0,
    LOCATION = 1,
    OVERTIME_HOURS = 2,
    OFFSET_HOURS = 3,
    CALL_TYPE = 4,
    LOG_TYPE = 5,
  }

  const panelLabelMap = {
    [PanelType.REQUESTED_SCHED]: STRINGS.cllnRequestedSched,
    [PanelType.LOCATION]: STRINGS.cllnLocation,
    [PanelType.OVERTIME_HOURS]: STRINGS.cllnOvertimeHours,
    [PanelType.OFFSET_HOURS]: STRINGS.cllnOffsetHours,
    [PanelType.CALL_TYPE]: STRINGS.cllnType,
    [PanelType.LOG_TYPE]: STRINGS.cllnLogType,
  };

  const panelValuelMap = {
    [PanelType.REQUESTED_SCHED]: data?.filing?.requested?.name,
    [PanelType.LOCATION]: data?.filing?.location?.name,
    [PanelType.OVERTIME_HOURS]: DateTimeUtils.twoTimeRangeFormat(
      DateTimeUtils.timeWithSeconds(data?.filing?.requested?.dateFrom!),
      DateTimeUtils.timeWithSeconds(data?.filing?.requested?.dateTo!),
    ),
    [PanelType.OFFSET_HOURS]: DateTimeUtils.twoTimeRangeFormat(
      DateTimeUtils.timeWithSeconds(data?.filing?.requested?.dateFrom!),
      DateTimeUtils.timeWithSeconds(data?.filing?.requested?.dateTo!),
    ),
    [PanelType.CALL_TYPE]: data?.filing?.leaveParameter?.name,
    [PanelType.LOG_TYPE]: data?.filing?.logType?.name,
  };

  const panelDatelMap = {
    [PanelType.REQUESTED_SCHED]:
      DateTimeUtils.twoDateRangeFormat(
        (data?.filing?.dateFiled as { dateFrom: string; dateTo: string })?.dateFrom!,
        (data?.filing?.dateFiled as { dateFrom: string; dateTo: string })?.dateTo!,
      )
    ,
    [PanelType.LOCATION]: DateTimeUtils.twoDateRangeFormat(
      (data?.filing?.dateRange as { dateFrom: string; dateTo: string })?.dateFrom!,
      (data?.filing?.dateRange as { dateFrom: string; dateTo: string })?.dateTo!,
    ),
    [PanelType.OVERTIME_HOURS]:
      DateTimeUtils.dateDefaultToWord(data?.filing?.dateFiled as string)
    ,
    [PanelType.OFFSET_HOURS]:
      DateTimeUtils.dateDefaultToWord(data?.filing?.dateFiled as string),
    [PanelType.CALL_TYPE]:
      DateTimeUtils.twoDateRangeFormat(
        (data?.filing?.dateFiled as { dateFrom: string; dateTo: string })?.dateFrom!,
        (data?.filing?.dateFiled as { dateFrom: string; dateTo: string })?.dateTo!,
      )
    ,
    [PanelType.LOG_TYPE]:
      DateTimeUtils.timeSecondsToUnits(data?.filing?.timeInOut!),
  };

  const panelLabel = Object.values(panelLabelMap)[onPanel];
  const panelValue = Object.values(panelValuelMap)[onPanel];
  const dateValue = Object.values(panelDatelMap)[onPanel];

  return (
    <Pressable onPress={() => { navigation.navigate(STRINGS.pathRequestDetails, { onPanel, data }) }}>
      <View style={styles.itemContainer} >
        <Shadow distance={5} offset={[4, 1]} style={styles.itemWrapper}>
          <View style={styles.dateRowWrapper}>
            <Text style={styles.titleText}>
              {DateTimeUtils.dateCheckToday(data?.filing?.dateTransaction)
                ? STRINGS.today
                : DateTimeUtils.dateCheckYesterday(data?.filing?.dateTransaction)
                  ? STRINGS.yesterday
                  : DateTimeUtils.dateDefaultToWord(data?.filing?.dateTransaction)}
            </Text>

            <View style={styles.rowWrapper}>
              {Utils.statusIcon(data?.filing?.filingStatus?.id!)}
              <Text style={styles.titleText}>{data?.filing?.filingStatus?.name}</Text>
            </View>
          </View>

          <View style={styles.bodyWrapper}>
            <View style={styles.rowWrapper}>
              <Text style={styles.boldText}>{panelLabel}</Text>
              <Text style={styles.valueText}>{panelValue}</Text>
            </View>
            <View style={styles.rowWrapper}>
              <Text style={styles.boldText}>{onPanel == 5 ? STRINGS.cllnLogTime : STRINGS.cllnDateFiled}</Text>
              <Text style={styles.valueText} >{dateValue}</Text>
            </View>

          </View>
        </Shadow>
      </View>
    </Pressable>
  );
};

export default memo(RequestItem);
