import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect} from 'react';
import { Text, View } from 'react-native';
import PageHeader from 'src/components/header/PageHeader';
import { CONTACTS } from 'src/constants/styles/Contacts';
import { ASSETS, COLORS, STRINGS } from 'src/index';
import { useContacts } from 'src/contexts/pages';


const ContactInformation: React.FC = ({  }) => {
    const styles = CONTACTS.SELECTED_ITEM;
    const { state } = useContacts();

    return (
        <View>
            <PageHeader name={STRINGS.pageTitleContactInformation} />
            <View style={styles.container}>
                <View>
                    <Image source={ASSETS.mina} style={styles.image} />
                </View>
                <View style={styles.text}>
                    <Text style={styles.name}>{state.selectectedContact.name}</Text>
                    <Text style={styles.position}>{state.selectectedContact.position}</Text>
                </View>
                <Text style={styles.label}>Contact Number</Text>
                <View style={styles.horizontalLine} />
                <Text style={{ alignSelf: 'flex-start' }}>{state.selectectedContact.email}</Text>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.horizontalLine} />
                <Text style={{ alignSelf: 'flex-start' }}>{state.selectectedContact.contact}</Text>
            </View>
        </View>
    );
};

export default ContactInformation;
