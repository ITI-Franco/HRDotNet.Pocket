// HRDotNet-Mobile
// Developed by: Hersvin Fred De La Cruz Labastida, Jessie Cuerda
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { TEAMS } from 'src/constants/styles/Teams';
import { InitialDate, TeamSchema, TeamsStates } from 'src/types/Teams';
import { FlatList, State } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { ASSETS } from 'src/constants/Assets';
import { useNavigation } from '@react-navigation/native';
import Note from '../note/Note';
import EndListNote from '../note/EndListNote';
import { useTeams } from 'src/contexts/pages';
import { Pressable } from 'react-native';
import LoaderPage from '../loader/LoaderPage';

const TeamsItem: React.FC<InitialDate> = ({ initialDate }) => {
  const style = TEAMS.TeamList;
  const navigation = useNavigation();
  const { state, handle, setState } = useTeams();

  const renderItem = ({ item }: { item: TeamSchema }) => (
    <Pressable
      onPress={() => {
        (navigation as any).navigate('TeamMembers', { screen: 'TeamsInformation' });
      }}
    >
      <View
        onTouchEnd={() => {
          itemPress(item);
        }}
      >
        <View style={style.activeContainer}>
          <Image source={ASSETS.mina} style={style.image} />
          <View style={{ flexShrink: 1 }}>
            <Text style={style.activeName}>{item.name}</Text>
            <Text>{item.department.name}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const ListFooterComponent = () => {
    return (
      <React.Fragment>
        <EndListNote />
      </React.Fragment>
    );
  };

  const itemPress = (item: TeamSchema) => {
    setState({ selectedMember: item });
  };

  return (
    <React.Fragment>
      <Animatable.View style={style.mainContainer}>
        {handle.isLoading ? (
          <LoaderPage />
        ) : state.count === 0 ? (
          <Note text={`No data found for ${initialDate}`} icon="magnifying-glass" />
        ) : (
          <FlatList
            data={state.teamsData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={{
              maxHeight: '100%',
              marginTop: 20,
            }}
            ListFooterComponent={ListFooterComponent}
          />
        )}
      </Animatable.View>
    </React.Fragment>
  );
};

export default TeamsItem;
