// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco

import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';

import { COLORS, ASSETS, STRINGS, STYLES } from 'src';
import { TypeObjectValues, TypeNavStack } from 'src/types/Types';
import { Utils } from 'src/utils/Utils';
import { Others, StorageToken } from 'src/constants/Enum';

const Drawer: React.FC<TypeNavStack> = ({ navigation }) => {
  const styles = STYLES.Drawer;

  const data: TypeObjectValues[] = [
    {
      navigate: undefined,
      image: ASSETS.iconPrivacy,
      title: STRINGS.drawerTitleI,
    },
    {
      navigate: undefined,
      image: ASSETS.iconTerms,
      title: STRINGS.drawerTitleII,
    },
    {
      navigate: () => onHandlePress(STRINGS.pathAboutUs),
      image: ASSETS.iconAbout,
      title: STRINGS.drawerTitleIII,
    },
  ];

  const onHandlePress = (page: string) => {
    navigation.navigate(page);
  };

  const onHandleLogout = async () => {
    await AsyncStorage.multiRemove([StorageToken.Refresh, StorageToken.Auth, Others.CODE]);
    Utils.resetNavigation(navigation, STRINGS.pathLogin, STRINGS.pathLogin);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.textHeader}>{STRINGS.pageTitleDrawer}</Text>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowright" size={30} color={COLORS.clearWhite} />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 20 }}>
        <FlatList
          data={data}
          windowSize={10}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }: { item: TypeObjectValues; index: number }) => (
            <TouchableOpacity key={index} style={styles.button} onPress={item.navigate ? item.navigate : undefined}>
              <Image source={item.image} style={{ height: 30, width: 30 }} />

              <Text style={styles.textButton}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity style={styles.logOutButton} onPress={onHandleLogout}>
        <Text style={styles.logOutText}>{STRINGS.logOut}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Drawer;
