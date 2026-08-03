/**
 * @project      HRDotNet-Mobile
 * @description  PayHistory Item
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 10-03-2024
 * @date_updated 10-21-2024
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { STYLES, DateTimeUtils, STRINGS } from 'src';
import { Utils } from 'src/utils/Utils';
import { PayHistoryStack } from 'src/types/Profile';

const PayHistoryItem: React.FC<PayHistoryStack> = ({ data, onHandleMore }) => {
  const styles = STYLES.ComponentPayHistoryItem;

  return (
    <View style={styles.container} onTouchEnd={() => onHandleMore()} key={data.id}>
      {data.employees.map((employee, index) => (
        <View style={styles.shadowItem}>
          <Text style={styles.boldText}>
            {DateTimeUtils.dateDefaultToHalfMonthWord(data.timekeeping.cutOff.datePayoutSchedule)}
          </Text>

          <Text style={styles.regularText}>
            {STRINGS.currency}
            {Utils.amountFormat(employee.netPay)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default PayHistoryItem;
