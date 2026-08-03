import { StyleSheet } from 'react-native';

export const Style = {
    styles: StyleSheet.create({
        viewContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        animatedView: {
            backgroundColor: 'white',
            height: '17%',
            width: '95%',
            borderRadius: 20,
            flexDirection: 'column',
            alignItems: 'center',
        },
        View: {
            flexDirection: 'row', 
            gap: 15, 
            width: '100%', 
            height: '50%', 
            alignItems: 'center', 
            justifyContent: 'center'
        },
    }),
};
