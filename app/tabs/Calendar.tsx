// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';

import { Calendar as CalendarView, Agenda } from "react-native-calendars";
import * as Animatable from 'react-native-animatable';

import Toast from "src/components/use/Toast";
import TabHeader from "src/components/header/TabHeader";
import LoaderPage from "src/components/loader/LoaderPage";
import Loader from "src/components/loader/Loader";
import CalendarItem from "src/components/item/CalendarItem";
import { ARRAY, COLORS, STRINGS, DateTimeUtils } from "src";
import {STYLES_CALENDAR } from "src/constants/styles/Calendar"
import { useCalendar } from "src/contexts/tabs";
import { StateCalendar } from "src/types/Types";
import MonthYearPicker from "src/components/modal/MonthYearPicker"

const Calendar: React.FC = () => {
    const styles = STYLES_CALENDAR.Calendar
    const {
        state,
        setState,
        handle,
        setHandle,
        onHandleSelectedDate,
        onHandlePressDate,
        onHandleMonthChange,
        onHandleEffectI
    } = useCalendar()

   
    useEffect(() => {
        setState({selectedDate: `${state.selectedYear}-${state.selectedMonth}-01`})
    }, [state.selectedMonth, state.selectedYear]);


    useEffect(() => {
        onHandleEffectI();
    }, [state.calendarDate]);


    useEffect(() => {
        setMarkedDates(state.markedDates);
    }, [state.markedDates])

    useEffect(() => {
        const selectedDate = state.selected.date;
        const formattedSelectedDate = `${selectedDate.substring(0, 4)}-${selectedDate.substring(4, 6)}-${selectedDate.substring(6, 8)}`;

        setMarkedDates((prevMarkedDates: any) => {
            const updatedMarkedDates = { ...prevMarkedDates };
            Object.keys(updatedMarkedDates).forEach((date: any) => {
                if (updatedMarkedDates[date]?.selected) {
                    delete updatedMarkedDates[date].selected;
                }
            });

            return {
                ...updatedMarkedDates,
                [formattedSelectedDate]: {
                    ...updatedMarkedDates[formattedSelectedDate],
                    selected: true,
                    selectedColor: COLORS.orange,
                },
            };
        });

    }, [state.selected.date]);


    const [markedDates, setMarkedDates] = useState<StateCalendar["markedDates"]>();

    return (
        <React.Fragment>
            <StatusBar backgroundColor={COLORS.powderBlue} barStyle="light-content" />

            <TabHeader headerName={STRINGS.tabTitleCalendar} />

            {handle.isToast!.show && (
                <Toast handle={handle.isToast!} setHandle={setHandle} />
            )}

            {/* {handle.isLoadMore == true && (<Loader />)} */}

            {handle.isLoading ? (<LoaderPage />) : (
                <Animatable.View
                    animation={'fadeIn'}
                    duration={900}
                    style={styles.container}
                    onAnimationBegin={() => onHandlePressDate({ "dateString": DateTimeUtils.getCurrDateDash() })}
                >

                    <CalendarView
                        renderHeader={(date: any) => {
                            return (
                                <View style={{ backgroundColor: COLORS.clearWhite, flexDirection: 'row', gap: 2 }}>
                                    <TouchableOpacity onPress={()=>{setState({isMonthModalVisible:!state.isMonthModalVisible})}} style={styles.button}>
                                        <Text style={styles.calendarHeaderButtonText}>
                                        {ARRAY.months.find(month => month.value === (state.selectedMonth as any))?.label}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={()=>{setState({isYearModalVisible: !state.isYearModalVisible})}} style={styles.button}>
                                        <Text style={styles.calendarHeaderButtonText}>
                                            {state.selectedYear}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                        displayLoadingIndicator={handle.isLoadMore}
                        markingType={'multi-dot'}
                        markedDates={markedDates}
                        style={styles.calendarView}
                        showSixWeeks={false}
                        enableSwipeMonths={true}
                        headerStyle={{ backgroundColor: COLORS.clearWhite }}
                        theme={{
                            dotColor: COLORS.clearWhite,
                            todayTextColor: COLORS.orange,
                            arrowColor: COLORS.powderBlue,
                            textDayFontFamily: 'Inter_400Regular',
                            textDayHeaderFontFamily: 'Inter_500Medium',
                            textMonthFontFamily: 'Inter_600SemiBold',
                        }}

                        onMonthChange={
                            (params: { dateString: string }) => {
                                const date = new Date(params.dateString);
                                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                const year = date.getFullYear();
                                setState({selectedMonth: String(month), selectedYear: String(year)})
                                onHandleMonthChange(params.dateString);
                            }
                        }


                        key={state.selectedDate}
                        current={state.selectedDate}
                        firstDay={1}
                        disableArrowLeft={handle.isLoadMore}
                        disableArrowRight={handle.isLoadMore}
                        onDayPress={(day: { dateString: string }) => onHandlePressDate(day)}
                    />

                    <MonthYearPicker/>
                    <CalendarItem />

                </Animatable.View>
            )}
        </React.Fragment>
    )
}
export default Calendar