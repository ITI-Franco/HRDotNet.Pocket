/**
 * @project       HRDotNet-Mobile
 * @description   Pending Items for rendering pending items
 * @author        Hersvin Fred Labastida, Jessie Cuerda, Daneris Mendoza
 * @date_created  09-30-2024
 * @date_modified 10-10-2024
 */

//--- React Modules
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { View, Text } from 'react-native';
//-- Other Modules
import { PENDING } from 'src/constants/styles/Pending';
import { PendingApplications } from 'src/types/Pending';
import { DateTimeUtils } from 'src/utils/DateTimeUtils';
import { STRINGS } from 'src/constants/Strings';
import PendingIconText from '../use/PendingIconText';

const PendingsItem: React.FC<{ item: PendingApplications }> = ({ item }) => {
  const styles = PENDING.ComponentPendingsItem;

  return (
    <React.Fragment>
      <Animatable.View
        animation={'fadeIn'}
        duration={120}
        useNativeDriver
        shouldRasterizeIOS
        renderToHardwareTextureAndroid
        easing="ease-in-out-expo"
        key={item.dateTransaction}
        style={styles.animatableContainer}
      >
        <View style={styles.container}>
          {/* App Icon */}
          <PendingIconText applicationType={item.applicationType} renderAs="icon" />
          <View style={styles.listView}>
            {/* App Type */}
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <PendingIconText
                applicationType={item.applicationType}
                renderAs="text"
                style={{ fontSize: 16, fontWeight: 700 }}
              />
            </View>
            {/* Date Transact */}
            <View style={styles.rowView}>
              <Text style={styles.boldSmallText}>Transaction Date: </Text>
              <Text style={styles.regularText}>
                {DateTimeUtils.dateCheckToday(item.dateTransaction)
                  ? STRINGS.today
                  : DateTimeUtils.dateCheckYesterday(item.dateTransaction)
                    ? STRINGS.yesterday
                    : DateTimeUtils.dateDefaultToWord(item.dateTransaction)}
              </Text>
            </View>
            {/* Date Filed */}
            <View style={styles.rowView}>
              <Text style={styles.boldSmallText}>Work Date: </Text>
              <Text style={styles.regularText}>
                {item.dateRange.dateFrom === item.dateRange.dateTo ? (
                  <Text style={{ fontSize: 11 }}>
                    {DateTimeUtils.dateCheckToday(item.dateRange.dateTo.toString())
                      ? STRINGS.today
                      : DateTimeUtils.dateCheckYesterday(item.dateRange.dateTo.toString())
                        ? STRINGS.yesterday
                        : DateTimeUtils.dateDefaultToWord(item.dateRange.dateTo.toString())}
                  </Text>
                ) : (
                  <React.Fragment>
                    {item.dateRange?.dateFrom ? (
                      <>
                        <Text style={{ fontSize: 11 }}>
                          {DateTimeUtils.dateDefaultToHalfMonthWord(item.dateRange.dateFrom.toString())}
                        </Text>
                      </>
                    ) : null}
                    {item.dateRange?.dateTo ? (
                      <Text style={{ fontSize: 11 }}>
                        <Text> - </Text>
                        {DateTimeUtils.dateDefaultToHalfMonthWord(item.dateRange.dateTo.toString())}
                      </Text>
                    ) : null}
                  </React.Fragment>
                )}
              </Text>
            </View>
            {/* Doc No */}
            <View style={styles.rowView}>
              <Text style={styles.boldSmallText}>Document No: </Text>
              <Text style={styles.regularText}>{item.documentNo}</Text>
            </View>
          </View>
        </View>
      </Animatable.View>
    </React.Fragment>
  );
};

export default PendingsItem;
