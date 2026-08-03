import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../Colors';

export const STYLES_CALENDAR = {
    
    Calendar: StyleSheet.create({
        safeArea: {
            flex: 1,
            // padding: 10,
        },
        container: {
            opacity: 1, flex: 1, backgroundColor: COLORS.clearWhite
        },

        wrapper: {
            flex: 1,
            backgroundColor: COLORS.clearWhite,
        },

        calendarView: {
            // paddingTop: 10,
            // height: 'auto',
            // marginBottom: 30,
        },

        button: {
            padding: 5,
        },
        grid: {
            justifyContent: 'center',
        },
        monthBox: {
            flex: 1,
            padding: 2,
            margin: 1.5,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'gray',
            width: '20%', 
        },
        monthText: {
            fontSize: 16,
            // color: 'gray',
        },

        selectedMonthBox: {
            flex: 1,
            padding: 3,
            margin: 1.5,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'gray',
            width: '20%', // 30% width for 3 columnsy
            backgroundColor: COLORS.orange,
        },

        selectedMonthText: {
            color: 'white',
            fontSize: 16,
        },
   
        selectedYearText: {
            color: 'white',
            // fontSize: 16,
        },

        item: {
            padding: 15,
            alignItems: 'center',
        },

        selectedItem: {
            borderRadius: 5,
            backgroundColor: COLORS.blue,
        },

        closeButton: {
            backgroundColor: COLORS.blue,
            borderRadius: 5, 
            padding: 10, 
            alignItems: 'center', 
            justifyContent: 'center', 
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.2, 
            elevation: 2,
        },
        closeButton2: {
            justifyContent: 'center', 
        },
        closeButtonText: {
            color: 'white',
        },
        buttonText: {
            color: 'black',
        },
        calendarHeaderButtonText: {
            fontSize: 16,
            color: 'black',
            fontFamily: 'Inter_600SemiBold',
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        pickerContainer: {
            gap: 10,
            width: 310,
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
        },
        title: {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
        },
        scrollContainer: {
            maxHeight: 200,
            width: '100%',
            marginBottom: 20,
        },

        itemText: {
            fontSize: 16,
        },
        datePickerText: {
            fontSize: 16,
            fontFamily: 'Inter_500SemiBold',
        },

    }),

    ComponentCalendarItem: StyleSheet.create({
        container: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingHorizontal: 10,
          paddingVertical: 20,
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.clearWhite,
        },
    
        topView: {
          paddingHorizontal: 20,
          paddingBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
    
        dayStatus: {
          fontFamily: 'Inter_600SemiBold',
          fontSize: 18,
        },
    
        selectedDayText: {
          fontSize: 12,
          textAlign: 'center',
          fontFamily: 'Inter_400Regular',
        },
    
        selectedEvent: {
          paddingHorizontal: 20,
          paddingBottom: 10,
          paddingTop: 5,
          backgroundColor: COLORS.clearWhite,
        },
    
        topCircle: {
          position: 'absolute',
          zIndex: 99,
        },
    
        dayBelowEvent: {
          fontSize: 13,
          fontFamily: 'Inter_400Regular',
        },
    
        dayEventText: {
          textAlign: 'center',
          paddingLeft: 10,
          fontSize: 16,
          fontFamily: 'Inter_500Medium',
        },
    
        subDayContentTitle: {
          backgroundColor: COLORS.gray,
          fontFamily: 'Inter_600SemiBold',
          color: COLORS.clearWhite,
          paddingVertical: 2,
          width: 130,
          borderRadius: 5,
          overflow: 'hidden',
          textAlign: 'center',
        },
    
        subDayContentView: {
          justifyContent: 'center',
          marginVertical: 5,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
        },
    
        subDayContentText: {
          textAlign: 'center',
          width: '60%',
          paddingLeft: 10,
          fontSize: 15,
          fontFamily: 'Inter_400Regular',
        },
    
        dayContentWrapper: {
          paddingBottom: 10,
          borderBottomColor: COLORS.lightestGray,
          borderBottomWidth: 1.5,
        },
    
        dayContentText: {
          fontSize: 14,
          marginVertical: 20,
          textAlign: 'center',
          fontFamily: 'Inter_500Medium',
        },
    
        dayBelowWrapper: {
          paddingHorizontal: 10,
          padding: 5,
        },
    
        rowWrapper: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
    
        boldText: {
          color: COLORS.darkGray,
          fontWeight: '700',
          fontStyle: 'italic',
        },
    
        dateBelowText: {
          marginTop: 5,
          fontFamily: 'Inter_400Regular',
          color: COLORS.black,
          fontSize: 12,
        },
    
        noEventsText: {
          fontSize: 13,
          textAlign: 'center',
          color: COLORS.darkGray,
          marginTop: 30,
          fontFamily: 'Inter_400Regular',
        },
    
        selectedDayEvent: {
          flexDirection: 'row',
          backgroundColor: COLORS.clearWhite,
          width: 160,
          marginBottom: 10,
          paddingLeft: 2,
        },
    
        selectedDayView: {
          borderRadius: 20,
          height: 37,
          width: '100%',
          backgroundColor: COLORS.clearWhite,
          justifyContent: 'center',
        },
    
        dayBelowEventWrapper: {
          flexDirection: 'row',
          alignItems: 'center',
          width: '50%',
          height: 25,
          paddingLeft: 40,
          borderRadius: 50,
          borderWidth: 1,
          backgroundColor: COLORS.clearWhite,
        },
      }),
}