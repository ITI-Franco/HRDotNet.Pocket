// HRDotNet-Mobile
// Developed by: Hersvin Fred De La Cruz Labastida, Jessie Cuerda

import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../Colors';
const { width } = Dimensions.get('window');
const perDayWidth = width * 0.1;
const calendarListPaddingHorizontal = width * 0.01;

export const TEAMS = {
  Calendar: StyleSheet.create({
    weekCalendarContainer: {
      width: 'auto',
    },
    dateHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 30,
      paddingTop: 30,
      alignItems: 'center',
    },
    perDay: {
      marginHorizontal: 5,
      padding: 2,
      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 4,
      // height: 50,
      minWidth: perDayWidth,
    },
    calendarList: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 30,
      width: '100%',
      maxHeight: 60,
      paddingHorizontal: calendarListPaddingHorizontal,
    },
    weekDate: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonNext: {
      width: '5%',
      alignItems: 'flex-start',
    },
    buttonPrev: {
      width: '5%',
      alignItems: 'flex-end',
    },
    activeDay: {
      borderColor: 'orange',
      backgroundColor: 'orange',
    },
    inActiveDay: {
      borderColor: COLORS.darkGray,
      backgroundColor: 'white',
    },
    date: {
      fontWeight: 'bold',
      textAlign: 'center',
    },

    dateLabel: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    activeDayClicked: {
      backgroundColor: COLORS.powderBlue,
      borderColor: COLORS.powderBlue,
    },
  }),
  TeamList: StyleSheet.create({
    activeContainer: {
      width: 'auto',
      minHeight: 70,
      borderColor: COLORS.lightGray,
      borderWidth: 1,
      backgroundColor: 'white',
      marginHorizontal: 20,
      marginTop: 25,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 20,
      paddingVertical: 5,
      shadowColor: COLORS.black,
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 10,
    },
    inActiveContainer: {
      width: 'auto',
      height: 70,
      borderColor: COLORS.lightGray,
      borderWidth: 1,
      backgroundColor: 'white',
      marginHorizontal: 20,
      marginTop: 25,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 20,
      paddingVertical: 5,
      shadowColor: COLORS.black,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      elevation: 5,
      opacity: 0.5,
    },
    noDataContainer: {
      marginTop: 25,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
    },
    noDataText: {
      fontSize: 18,
      color: '#6c757d',
      fontWeight: 'bold',
    },
    activeName: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    inActiveName: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    activePosition: {
      fontSize: 12,
    },
    inActivePosition: {
      color: 'white',
      fontSize: 12,
    },
    mainContainer: {
      flex: 1,
    },
    image: {
      borderRadius: 20,
      width: 40,
      height: 40,
      borderColor: 'black',
      borderWidth: 1,
    },

    loader: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      paddingBottom: 20,
      flexDirection: 'row',
    },

    loaderText: {
      marginLeft: 10,
      fontFamily: 'Inter_500Medium',
      color: COLORS.lighterGray,
    },
  }),
  TeamMember: StyleSheet.create({
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
      gap: 5,
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
    date: {
      alignItems: 'flex-end',
      width: '100%',
    },
    dateText: {
      fontSize: 16,
      fontWeight: '600',
    },
    workShift: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 5,
      marginHorizontal: 50,
      marginVertical: 10,
      width: '100%',
      borderRadius: 20,
      backgroundColor: 'white',
      shadowColor: COLORS.black,
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 2 },
      elevation: 10,
    },

    clockIn: {
      height: 90,
      width: '100%',
      gap: 15,
      borderBottomWidth: 1,
      borderStyle: 'dashed',
      borderBottomColor: 'black',
      marginBottom: 10,
    },
    clockOut: {
      height: 90,
      width: '100%',
      gap: 15,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: 'black',
      marginBottom: 10,
    },
    previousContainer: {
      width: '100%',
      height: 70,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    upcomingContainer: {
      width: '100%',
      height: 70,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    // Indicator for Tags
    circleGreen: {
      backgroundColor: COLORS.green,
      height: 'auto',
      width: 20,
      borderRadius: 30,
    },
    circleRed: {
      backgroundColor: COLORS.red,
      height: 'auto',
      width: 20,
      borderRadius: 30,
    },
    circlePurple: {
      backgroundColor: COLORS.purple,
      height: 'auto',
      width: 20,
      borderRadius: 30,
    },
    DayTag: {
      width: 150,
      height: 'auto',
      borderRadius: 50,
      borderWidth: 1,
      flexDirection: 'row',
      gap: 5,
    },
    holiDay: {
      width: 150,
      height: 'auto',
      borderRadius: 50,
      borderColor: COLORS.red,
      borderWidth: 1,
      flexDirection: 'row',
      gap: 5,
    },
    restDay: {
      width: 150,
      height: 'auto',
      borderRadius: 50,
      borderColor: COLORS.purple,
      borderWidth: 1,
      flexDirection: 'row',
      gap: 5,
    },

    // Font Style
    italicTitle: {
      fontStyle: 'italic',
      fontSize: 16,
    },
  }),
};
