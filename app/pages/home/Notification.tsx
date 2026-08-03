1; // HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import Note from 'src/components/note/Note';
import PageHeader from 'src/components/header/PageHeader';
import LoaderPage from 'src/components/loader/LoaderPage';
import NotificationItem from 'src/components/item/NotificationItem';
import { TypeNavProp, TypeSchemaNotification } from 'src/types/Types';
import { STRINGS, STYLES } from 'src';
import { useNotification } from 'src/contexts/pages';
import { Notification as NotificationType } from 'src/types/Notification';

const Notification: React.FC<TypeNavProp> = ({}) => {
  const styles = STYLES.Notification;
  const { state, setState, fetchNotifications } = useNotification();

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <PageHeader name={STRINGS.pageTitleNotification} />
      {state.isFetching ? (
        <LoaderPage />
      ) : (
        <View style={[styles.wrapper]}>
          <Shadow distance={4} offset={[2, 2]} style={styles.shadowView}>
            {state.notifications.length <= 0 ? (
              <Note text={STRINGS.nothingFound} icon="notifications-off" size={30} />
            ) : (
              <FlatList
                data={state.notifications}
                renderItem={({ item, index }: { item: NotificationType; index: number }) => (
                  <NotificationItem item={item} />
                )}
                style={styles.listView}
              />
            )}
          </Shadow>
        </View>
      )}
    </View>
  );
};

export default Notification;
