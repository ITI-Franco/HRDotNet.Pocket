// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

import { COLORS, STRINGS, STYLES } from 'src';
import { ApprovalsAction as ValuesAction } from 'src/constants/Values';
import { useApprovals } from 'src/contexts/pages';

const ApprovalsAction: React.FC = () => {
  const styles = STYLES.ComponentApprovalsAction;
  const { state, onHandleSelectAll, onHandleApprovals, isSelectable } = useApprovals();
  const [values, setValues] = useState<{
    isDisabled: boolean;
    selectAll: boolean;
  }>({
    isDisabled: false,
    selectAll: false,
  });

  useEffect(() => {
    const selectableItems = state.data.filter(isSelectable);

    setValues({
      isDisabled: selectableItems.every(item => !item.isChecked),
      selectAll:
        selectableItems.length > 0 &&
        selectableItems.every(item => item.isChecked),
    });
  }, [state]);

  return (
    <View style={styles.container}>
      <View style={styles.rowView}>
        <Checkbox
          color={COLORS.orange}
          style={styles.checkBox}
          value={values.selectAll}
          disabled={state.data.length <= 0 ? true : false}
          onValueChange={(value: boolean) => onHandleSelectAll(value)}
        />

        <Text style={styles.regularText}>{STRINGS.all}</Text>
      </View>

      <View style={styles.rowView}>
        <TouchableOpacity
          style={[styles.button, values.isDisabled && styles.disabled]}
          disabled={values.isDisabled}
          onPress={() => onHandleApprovals(ValuesAction.Cancel)}
        >
          <MaterialIcons name="cancel" size={24} color={values.isDisabled ? COLORS.lightestGray : COLORS.red} />
          <Text style={styles.boldText}>{STRINGS.cancel}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, values.isDisabled && styles.disabled]}
          disabled={values.isDisabled}
          onPress={() => onHandleApprovals(ValuesAction.Approve)}
        >
          <FontAwesome name="check-circle" size={24} color={values.isDisabled ? COLORS.lightestGray : COLORS.green} />
          <Text style={styles.boldText}>{STRINGS.approve}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ApprovalsAction;
