import { StyleSheet } from 'react-native';

export const Style = {
    styles: StyleSheet.create({
        viewContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            gap: 10
        },
        animatedView: {
            backgroundColor: 'white',
            height: '17%',
            width: '95%',
            borderRadius: 20,
            flexDirection: 'column',
            alignItems: 'center',
        },
        animatedView2: {
            backgroundColor: 'white',
            height: '8.5%',
            width: '95%',
            borderRadius: 20,
            flexDirection: 'column',
            alignItems: 'center',
        },
        button: {
            flexDirection: 'row',
            gap: 15,
            width: '100%',
            height: '50%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        button2: {
            flexDirection: 'row', 
            gap: 15, 
            width: '100%', 
            height: '100%', 
            alignItems: 'center', 
            justifyContent: 'center'
        }
    }),
};
