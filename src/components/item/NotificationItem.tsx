// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { memo, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Octicons, Entypo } from '@expo/vector-icons';
import DashedLine from 'react-native-dashed-line';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { COLORS, STYLES, DateTimeUtils, STRINGS } from 'src';
import { Image } from 'expo-image';
import { ImageMap, NotificationParamType } from 'src/types/Notification';

const NotificationItem: React.FC<NotificationParamType> = ({ item }) => {
  const styles = STYLES.ComponentNotificationItem(item);
  const imageMap: ImageMap = {
    approvals_update: require('../../../src/assets/icons/approvals_update.webp'),
    request_update: require('../../../src/assets/icons/request_update.webp'),
    advisory: require('../../../src/assets/icons/advisory.webp'),
  };
  const navigation = useNavigation();
  const navigateItem = () => {
    (navigation as NavigationProp<ParamListBase>).navigate(STRINGS.pathNotificationDetails, {
      selectedNotification: item,
    });
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        style={styles.innerContent}
        onPress={() => {
          navigateItem();
        }}
      >
        <Octicons
          name="dot-fill"
          size={15}
          color={COLORS.powderBlue}
          style={{ marginRight: 2, opacity: item.isRead ? 0 : 1 }}
        />

        <View style={styles.imgParent}>
          {/* <Image
            source={imageMap[item.type]}
            cachePolicy={'disk'}
            contentFit="cover"
            style={styles.img}
            transition={300}
          /> */}
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.topContentWrapper}>
            <Text style={styles.contentTitle}>{item.name}</Text>
            <Text style={styles.contentDate}>{DateTimeUtils.dateDefaultToHalfMonthWord(item!.date)}</Text>
          </View>

          <View style={styles.bodyContentWrapper}>
            <Text numberOfLines={2} style={styles.description}>
              {item.message}
            </Text>

            <Entypo name="dots-three-horizontal" size={17} style={{ paddingTop: 20 }} color={COLORS.darkGray} />
          </View>
        </View>
      </TouchableOpacity>

      <DashedLine
        dashLength={10}
        dashColor={COLORS.lighterGray}
        dashGap={5}
        dashThickness={1}
        style={styles.dashLine}
      />
    </React.Fragment>
  );
};

export default memo(NotificationItem);
