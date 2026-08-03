import React, { useState, useEffect } from 'react';
import { Text, View, SectionList, Image, SectionListData, Pressable, RefreshControl } from 'react-native';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ASSETS, STRINGS } from 'src/index'; // Assuming ASSETS contains your image assets
import { CONTACTS as style } from 'src/constants/styles/Contacts';
import Loader from '../loader/Loader';
import { useContacts } from 'src/contexts/pages';
import { contact, Section } from 'src/types/Contacts';
import EndListNote from '../note/EndListNote';

const groupContactsByInitial = (contacts: contact[]): Section[] => {
  const groupedContacts: { [key: string]: contact[] } = {};
  contacts.forEach((contact) => {
    const initial = contact.name[0].toUpperCase();
    if (!groupedContacts[initial]) {
      groupedContacts[initial] = [];
    }
    groupedContacts[initial].push(contact);
  });

  return Object.keys(groupedContacts)
    .sort()
    .map((key) => ({
      title: key,
      data: groupedContacts[key].sort((a, b) => a.name.localeCompare(b.name)),
    }));
};

const ContactsItem = ({ }: {}) => {
  const styles = style.ITEM;
  const { state, setState, fetchContacts } = useContacts();
  const sections: SectionListData<contact>[] = groupContactsByInitial(state.contacts);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    fetchContacts();
  }, []);

  const contactPress = (item: contact) => {
    setState({selectectedContact:item});
    navigation.navigate('Contacts', { screen: 'ContactInformation' })
  };

  return (
    <React.Fragment>
      {state.isFetching ? (
        <Loader />
      ) : (
        <React.Fragment>
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id.toString()}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.SectionListView}>
                <Text style={styles.SectionListText}>{title}</Text>
              </View>
            )}
            refreshControl={<RefreshControl refreshing={state.refreshing!} onRefresh={() => fetchContacts()} />}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  contactPress(item);
                }}
              >
                <View style={styles.SectionListItem}>
                  {/* <Image source={{ uri: item.picture }} style={{ width: 50, height: 50, borderRadius: 25 }} /> */}
                  <Image source={ASSETS.mina} style={{ width: 50, height: 50, borderRadius: 25 }} />
                  <View style={{ marginLeft: 15 }}>
                    <Text style={styles.SectionListItemText1}>{item.name}</Text>
                    <Text style={styles.SectionListItemText2}>{item.position}</Text>
                  </View>
                </View>
              </Pressable>
            )}
            ListFooterComponent={EndListNote}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ContactsItem;
