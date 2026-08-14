import React from 'react';
import { View, Text } from 'react-native';
import { STYLES, STRINGS, DateTimeUtils } from 'src';
import { OverlapNoteProps } from 'src/types/Types';

const OverlapNote: React.FC<OverlapNoteProps> = ({ dateFrom, dateTo }) => {
    const styles = STYLES.ComponentOverlapNote;
    return (
        <View style={styles.container}>
            <View style={styles.alertBox}>
                <View style={styles.content}>
                    <View style={styles.messageContainer}>
                        <Text style={styles.message}>
                            {STRINGS.overlapMessage}
                            { } {DateTimeUtils.abbreviatedMonthDateRange(dateFrom, dateTo)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default OverlapNote;