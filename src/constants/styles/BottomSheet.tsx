import { Platform, StyleSheet } from 'react-native';

export const BOTTOM_SHEET = {
  BottomSheet: StyleSheet.create({
    container: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 0,
      right: 0,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 20,
    },
  }),
};
