/**
 * @project       HRDotNet-Mobile
 * @description   Pending Panel Main Item for Pending Component
 * @author        Hersvin Fred Labastida, Jessie Cuerda
 * @date_created  09-30-2024
 * @date_modified 10-10-2024
 */
//--- React Modules
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//--- Others Modules
import { PENDING } from 'src/constants/styles/Pending';
import { usePending } from 'src/contexts/pages';

const PendingsPanel: React.FC = () => {
  const styles = PENDING.PendingButtons;
  const { state, onHandlePress } = usePending();

  const DisplayButton = ({ title, isSelected }: { title: string; isSelected: boolean }) => (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={() => {
        onHandlePress(title);
      }}
      disabled={isSelected}
    >
      {isSelected && state.badgeCount !== null && state.badgeCount > 0 && (
        <View style={styles.selectedCounterView}>
          <Text style={[styles.selectedCounter]}>{state.badgeCount}</Text>
        </View>
      )}
      <Text style={[styles.buttonText, isSelected && styles.selectedTextButton]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <React.Fragment>
      <View style={styles.btnHorizontal}>
        {state.selectedButton.map((button, index) => (
          <DisplayButton key={index} title={button.title} isSelected={state.selectedButtonIndex === index} />
        ))}
      </View>
    </React.Fragment>
  );
};

export default PendingsPanel;
