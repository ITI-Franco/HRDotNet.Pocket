import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import PageHeader from 'src/components/header/PageHeader';
import { CONTACTS } from 'src/constants/styles/Contacts';
import { useRoute } from '@react-navigation/native';
import { ImageMap } from 'src/types/Notification';

const NotificationDetails: React.FC = ({}) => {
  const styles = CONTACTS.SELECTED_ITEM;
  const params = useRoute().params as any;
  const imageMap: ImageMap = {
    approvals_update: require('src/assets/icons/approvals_update.webp'),
    request_update: require('src/assets/icons/request_update.webp'),
    advisory: require('src/assets/icons/advisory.webp'),
  };

  return (
    <View>
      <PageHeader name={'Notification Details'} />
      <View style={styles.container}>
        <Image source={imageMap[params.selectedNotification.type]} style={{ height: 90, width: 90 }} />
        <Text style={{ alignSelf: 'flex-start' }}>{params.selectedNotification.message}</Text>
        <View style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
          {params.selectedNotification.tags.map((tag: string, index: number) => (
            <Text key={index} style={{ alignSelf: 'flex-start' }}>
              &#8226; {tag}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default NotificationDetails;
