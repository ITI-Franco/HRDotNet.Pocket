/**
 * @project      HRDotNet-Mobile
 * @description  Recent Payslip Component for Payslip
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 10-03-2024
 * @date_updated
 */

import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { Image } from 'expo-image';

import { STYLES, STRINGS, DateTimeUtils, ASSETS } from 'src';
import { Utils } from 'src/utils/Utils';
import { PayHistoryStack } from 'src/types/Profile';
const RecentPayItem: React.FC<PayHistoryStack> = ({ data, onHandleMore }) => {
  const styles = STYLES.ComponentRecentPayItem;

  const { absence, sssLoan, hdmfLoan, ssses, phicee, otherEarnings, tax } = data.employees[0] || {};

  const deductions = sssLoan + hdmfLoan + ssses + phicee + otherEarnings + tax + absence;

  return (
    <View style={styles.topView}>
      {data.employees.length > 0 && (
        <Pressable onPress={() => onHandleMore()}>
          <Shadow distance={3} offset={[1.5, 1.5]} style={styles.shadowView}>
            <View style={styles.rowView}>
              <Image source={ASSETS.iconPay} style={{ width: 55, height: 55 }} />
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.recentPayText}>{STRINGS.recentPayTitle}</Text>
                <Text>{DateTimeUtils.dateDefaultToHalfMonthWord(data?.timekeeping.cutOff.datePayoutSchedule)}</Text>
              </View>
            </View>

            <View style={[styles.rowView, { marginTop: 10 }]}>
              <View>
                <View style={styles.netpayView}>
                  <Text style={styles.netpayText}>{STRINGS.recentPayRowI}</Text>
                  <Text style={styles.netpayValue}>
                    {STRINGS.php}
                    {Utils.amountFormat(data.employees[0]?.netPay)}
                  </Text>
                </View>

                <View style={styles.grosspayView}>
                  <Text style={styles.grosspayText}>{STRINGS.recentPayRowII}</Text>
                  <Text style={styles.amountText}>{Utils.amountFormat(data.employees[0]?.grossPay)}</Text>
                </View>

                <View style={styles.deductionsView}>
                  <Text style={styles.deductionsText}>{STRINGS.recentPayRowIII}</Text>
                  <Text style={styles.amountText}>{Utils.amountFormat(deductions)}</Text>
                </View>
              </View>
            </View>
          </Shadow>
        </Pressable>
      )}
    </View>
  );
};

export default RecentPayItem;
