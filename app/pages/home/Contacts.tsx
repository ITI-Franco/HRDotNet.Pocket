import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { StatusBar, Text, TouchableOpacity, View, TextInput } from 'react-native';
import PageHeader from 'src/components/header/PageHeader';
import { ASSETS, COLORS, STRINGS } from 'src/index';
import { CONTACTS } from 'src/constants/styles/Contacts';
import { FontAwesome } from '@expo/vector-icons';
import ContactsItem from 'src/components/item/ContactsItem';
import { useContacts } from 'src/contexts/pages';

const Contacts: React.FC = () => {
    const styles = CONTACTS.CONTAINER;
    const { state, setState, fetchContacts } = useContacts();
    
    return (
        <React.Fragment>
            <StatusBar backgroundColor={COLORS.powderBlue} barStyle="light-content" />
            <PageHeader name={STRINGS.pageTitleContacts} />
            <View style={styles.HeaderContainer}>
                <TextInput
                    style={styles.SearchInput}
                    value={state.search}
                    onChangeText={(text) => {
                        setState({search: text})
                        if(text == ""){
                            fetchContacts();
                        }
                    }}
                    placeholder="Search"
                />
                <TouchableOpacity onPress={()=>{fetchContacts()}}>
                    <FontAwesome name="search" size={22} color={COLORS.orange} />
                </TouchableOpacity>
            </View>
            <View style={styles.HorizontalLine} />
            <ContactsItem />
        </React.Fragment>
    );
};

export default Contacts;
