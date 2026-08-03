// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, TextInput, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { COLORS, STYLES, STRINGS } from 'src';
import { CONTACTS } from 'src/constants/styles/Contacts';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ClickToSearch: React.FC<{
    search: string;
    setSearch: (text:string) =>void;
    clickFunction: ()=> void;
}> = ({ search, setSearch, clickFunction }) => {
    const styles = CONTACTS.CONTAINER;
    return (
        <View style={styles.HeaderContainer}>
            <TextInput
                style={styles.SearchInput}
                value={search}
                onChangeText={setSearch}
                placeholder="Search"
            />
            <TouchableOpacity onPress={clickFunction}>
                <FontAwesome name="search" size={22} color={COLORS.orange} />
            </TouchableOpacity>
        </View>
    );
};

export default ClickToSearch;
