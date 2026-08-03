// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { COLORS, STYLES, ARRAY } from 'src';
import { STYLES_CALENDAR } from "src/constants/styles/Calendar"
import { useCalendar } from "src/contexts/tabs";

const MonthYearPicker: React.FC = () => {
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
    const years = Array.from({ length: 12 }, (_, i) => new Date().getFullYear() - i);

    return (
        <View>
            <Modal visible={state.isMonthModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer} onTouchStart={()=>{setState({isMonthModalVisible: false})}}>
                    <View style={styles.pickerContainer} onTouchStart={(e)=>{e.stopPropagation()}}>
                        <Text style={styles.title}>Select Month</Text>
                        <FlatList
                            contentContainerStyle={styles.grid}
                            data={ARRAY.months}
                            numColumns={3}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        const date = `${state.selectedYear}-${item.value}-01`
                                        // handleSelectMonth(item.value)
                                        setState({ selectedMonth: item.value, isMonthModalVisible: !state.isMonthModalVisible })
                                        onHandleMonthChange(date)
                                    }}
                                    style={[styles.monthBox, state.selectedMonth == item.value && styles.selectedMonthBox]}
                                >
                                    <Text style={[styles.monthText, state.selectedMonth == item.value && styles.selectedMonthText]}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>

            <Modal visible={state.isYearModalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer} onTouchStart={()=>{setState({isYearModalVisible: false})}}>
                    <View style={styles.pickerContainer} onTouchStart={(e)=>{e.stopPropagation()}}>
                        <Text style={styles.title}>Select Year</Text>
                        <FlatList
                            contentContainerStyle={styles.grid}
                            data={years}
                            numColumns={3}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        const selectedMonthPadded = state.selectedMonth.toString().padStart(2, '0');
                                        const date = `${item}-${selectedMonthPadded}-01`;
                                        // handleSelectYear(String(item))
                                        setState({selectedYear: String(item), isYearModalVisible: !state.isYearModalVisible})
                                        onHandleMonthChange(date)
                                    }}
                                    style={[styles.monthBox, state.selectedYear == String(item) && styles.selectedMonthBox]}
                                >
                                    <Text style={[styles.monthText, state.selectedYear == String(item) && styles.selectedMonthText]}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default MonthYearPicker;
