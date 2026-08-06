// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { STYLES, DateTimeUtils, STRINGS } from 'src';
import { PropsApprovalsItem } from 'src/types/Types';
import { Utils } from 'src/utils/Utils';

const ApprovalsItem: React.FC<PropsApprovalsItem> = ({ data, onPanel, navigation }) => {
  const styles = STYLES.ComponentApprovalsItem;

  const DisplayItemContent2 = () => {
    const content = Utils.itemApprovalsContent(data, onPanel);

    return (
      <>
        {content.map((item, index) => (
          <View style={styles.rowView} key={index}>
            <Text style={styles.boldText}>{item.label} </Text>
            <Text style={styles.valueText}>{item.value}</Text>
          </View>
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.itemView}
        onPress={() => {
          navigation.navigate(STRINGS.pathReviewalDetails, {
            data: data,
            onPanel: onPanel,
            isSecondary: true,
          });
        }}
      >
        <Text style={styles.boldTextName}>{Utils.formatEmployeeName(data.name)}</Text>

        <View style={styles.rowView}>
          <Text style={styles.boldText}>{`${STRINGS.labelDateTransaction}:`}</Text>
          <Text style={styles.valueText}>{DateTimeUtils.dateDefaultToWord(data?.filing?.dateTransaction)}</Text>
        </View>

        <View style={styles.rowView}>
          <Text style={styles.boldText}>{`${STRINGS.labelDatePeriodOB}:`}</Text>
          <Text style={styles.valueText}>
            {(data?.filing?.dateFiled as { dateFrom: string })?.dateFrom! ||
            (data?.filing?.dateFiled as { dateTo: string })?.dateTo!
              ? DateTimeUtils.twoDateRangeFormat(
                  (data?.filing?.dateFiled as { dateFrom: string })?.dateFrom!,
                  (data?.filing?.dateFiled as { dateTo: string })?.dateTo!,
                )
              : data?.filing?.dateRange?.dateFrom || data?.filing?.dateRange?.dateTo
                ? DateTimeUtils.twoDateRangeFormat(data?.filing?.dateRange?.dateFrom, data?.filing?.dateRange?.dateTo)
                : DateTimeUtils.dateDefaultToWord(data?.filing?.dateFiled as string)}
          </Text>
        </View>
        <DisplayItemContent2 />
      </Pressable>
    </View>
  );
};

export default memo(ApprovalsItem);
