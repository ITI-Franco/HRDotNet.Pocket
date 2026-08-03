/**
 * @project      HRDotNet-Mobile
 * @description  Pending Component List of stylesheet
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 09-30-2024
 */

import { StyleSheet } from 'react-native';
import { COLORS } from '../Colors';

export const PENDING = {
  ComponentPendingItem: (index: number, lastIndex: number) =>
    StyleSheet.create({
      itemContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',

        borderTopLeftRadius: index == 0 ? 20 : 0,
        borderTopRightRadius: index == 0 ? 20 : 0,
        borderBottomLeftRadius: lastIndex == index ? 20 : 0,
        borderBottomRightRadius: lastIndex == index ? 20 : 0,

        paddingTop: index == 0 ? 5 : 0,
        paddingBottom: lastIndex == index ? 5 : 0,

        borderBottomColor: COLORS.darkGray,
        borderBottomWidth: lastIndex != index ? 1.5 : 0,
      },

      itemWrapper: {
        width: '100%',
        padding: 7,

        backgroundColor: COLORS.clearWhite,
        borderTopLeftRadius: index == 0 ? 20 : 0,
        borderTopRightRadius: index == 0 ? 20 : 0,
        borderBottomLeftRadius: lastIndex == index ? 20 : 0,
        borderBottomRightRadius: lastIndex == index ? 20 : 0,
      },

      dateRowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
      },

      rowWrapper: {
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'center',
      },

      currDateText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 13,
      },

      statusText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        color: COLORS.black,
      },

      bodyWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10,
      },

      reasonWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
      },

      boldText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 13,
        color: COLORS.darkGray,
      },

      valueText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: COLORS.darkGray,
      },
    }),

  ComponentPendingsItem: StyleSheet.create({
    animatableContainer: {
      opacity: 1,
      flex: 1,
      backgroundColor: COLORS.clearWhite,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 20,
      shadowColor: COLORS.darkGray,
      shadowOpacity: 0.1,
      shadowRadius: 3,
      shadowOffset: { width: 5, height: 5 },
      elevation: 3,
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 10,
      paddingVertical: 8,
      width: '100%',
    },

    iconView: {
      backgroundColor: COLORS.gray,
      padding: 10,
      borderRadius: 25,
      width: 'auto',
    },

    listView: {
      width: '80%',
    },

    rowView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    appliedDates: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    rowSpaceView: {
      justifyContent: 'space-between',
      flexDirection: 'row-reverse',
    },

    boldText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 16,
    },

    boldSmallText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 12,
    },

    regularText: {
      flexWrap: 'wrap',
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
    },

    valueText: {
      width: 170,
      flexWrap: 'wrap',
      fontSize: 14.5,
      fontFamily: 'Inter_400Regular',
    },

    moreButton: {
      position: 'static',
      right: 10,
    },
  }),

  ComponentPendingsPanel: StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: 7,
      paddingLeft: 16,
      paddingVertical: 10,
    },

    rowView: {
      flexDirection: 'row',
    },

    itemView: {
      paddingVertical: 5,
    },

    rowSpaceView: {
      width: '100%',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },

    boldText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 16,
    },

    regularText: {
      flexWrap: 'wrap',
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
    },

    valueText: {
      width: 170,
      flexWrap: 'wrap',
      fontSize: 14.5,
      fontFamily: 'Inter_400Regular',
    },

    moreButton: {
      position: 'static',
      right: 10,
    },
  }),

  ComponentPending: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    btnHorizontal: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      borderBottomColor: COLORS.lighterOrange,
      borderBottomWidth: 2,
    },

    counterText: {
      backgroundColor: COLORS.clearWhite,
      color: COLORS.orange,
      marginRight: 10,
      fontSize: 18,
      fontFamily: 'Inter_700Bold',
      paddingHorizontal: 9,
      borderRadius: 10,
      overflow: 'hidden',
      display: 'none',
    },

    button: {
      paddingHorizontal: 40,
      paddingVertical: 5,
      margin: 8,
      borderRadius: 15,
    },

    buttonText: {
      color: COLORS.black,
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
    },

    selectedButton: {
      backgroundColor: COLORS.orange,
      elevation: 3,
      shadowColor: COLORS.darkGray,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 10,

      paddingHorizontal: 40,
      paddingVertical: 5,
      margin: 8,
      borderRadius: 15,
    },

    selectedTextButton: {
      color: COLORS.clearWhite,
      fontFamily: 'Inter_700Bold',

      fontSize: 18,
    },
  }),

  PendingButtons: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.clearWhite,
    },

    btnHorizontal: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderBottomColor: COLORS.lighterOrange,
      width: '100%',
      borderBottomWidth: 2,
    },

    button: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10,
      paddingHorizontal: 40,
      paddingVertical: 5,
      borderRadius: 20,
      alignItems: 'center',
    },

    selectedButton: {
      backgroundColor: COLORS.orange,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10,
      paddingHorizontal: 40,
      paddingVertical: 5,
      borderRadius: 20,
      alignItems: 'center',
      elevation: 3,
      shadowColor: COLORS.darkGray,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },

    buttonText: {
      color: COLORS.black,
      fontFamily: 'Inter_600SemiBold',
      fontSize: 17,
    },

    selectedTextButton: {
      color: COLORS.clearWhite,
      fontFamily: 'Inter_700Bold',
      fontSize: 17,
    },

    selectedCounter: {
      color: COLORS.orange,
      fontSize: 15,
      fontFamily: 'Inter_700Bold',
      textAlign: 'center',
    },

    selectedCounterView: {
      backgroundColor: COLORS.clearWhite,
      borderRadius: 20,
      height: 25,
      width: 25,
      marginRight: 10,
      justifyContent: 'center',
      display: 'flex',
    },

    searchView: {
      marginHorizontal: 20,
    },
  }),
};
