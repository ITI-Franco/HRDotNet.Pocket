import { StyleSheet } from 'react-native';
import { COLORS } from '../Colors';

export const CONTACTS = {
    CONTAINER: StyleSheet.create({
        HeaderContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 10,
            margin: 15,
            marginEnd: 35
        },
        SearchInput: {
            color: COLORS.lighterGray,
            fontSize: 17
        },
        HorizontalLine: {
            height: 2,
            backgroundColor: COLORS.orange,
        },

    }),
    ITEM: StyleSheet.create({
        SectionListView: {
            paddingHorizontal: 20,
            paddingVertical: 5
        },
        SectionListText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: COLORS.orange
        },
        SectionListItem: {
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: COLORS.lightGray,
            borderWidth: 1,
            backgroundColor: 'white',
            marginHorizontal: 20,
            marginVertical: 10,
            borderRadius: 20,
            padding: 15,
            shadowColor: COLORS.black,
            shadowOpacity: 0.25,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 10,
        },
        SectionListItemText1: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        SectionListItemText2: {
            fontSize: 14,
            color: COLORS.lighterGray
        },
    }),
    SELECTED_ITEM: StyleSheet.create({
        container: {
            backgroundColor: 'white',
            height: 'auto',
            width: '80%',
            padding: 25,
            marginTop: 20,
            marginHorizontal: 40,
            borderRadius: 20,
            shadowColor: COLORS.black,
            shadowOpacity: 0.25,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 10,
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
        },
        image: {
            borderRadius: 50,
            width: 80,
            height: 80,
        },
        name: {
            fontSize: 18,
            fontWeight: '600',
        },
        position: {
            color: COLORS.darkGray,
        },
        text: {
            alignItems: 'center',
        },
        label: {
            color: COLORS.darkGray, alignSelf: 'flex-start'
        },
        horizontalLine: {
            height: 1.5,
            backgroundColor: COLORS.darkGray,
            width: '100%'
        }
    })
};
