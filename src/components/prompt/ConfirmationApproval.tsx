// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import StyledText from 'react-native-styled-text';

import { COLORS, STYLES, STRINGS } from 'src';
import { useApprovals } from 'src/contexts/pages';

const ConfirmationApproval: React.FC = () => {
  const styles = STYLES.ComponentConfirmationApproval;

  const { state, handle, onHandleCancelPrompt, onHandleApprovePrompt } = useApprovals();

  const onDisplayText = () => {
    let request: string = '';
    switch (state.selectedButton) {
      case 0:
        request = STRINGS.COS;
        break;

      case 1:
        request = STRINGS.OB;
        break;

      case 2:
        request = STRINGS.overtime;
        break;

      case 3:
        request = STRINGS.offset;
        break;

      case 4:
        request = STRINGS.leave;
        break;

      case 5:
        request = STRINGS.missedLog;
        break;

      default:
        request = STRINGS.none;
        break;
    }
    return STRINGS.confirmationSelectionApproval(state.count!, request, handle.isAction);
  };

  return (
    <React.Fragment>
      <Modal transparent={true} visible={handle.isVisible} animationType="fade">
        <View style={styles.modalView}>
          <View style={styles.modalWrapper}>
            <FontAwesome name="question-circle" size={70} color={COLORS.yellow} />

            <Text style={styles.titleText}>{STRINGS.confirmation}</Text>

            <StyledText style={styles.subTitleText} textStyles={STYLES.StyledText}>
              {onDisplayText()}
            </StyledText>

            <View style={styles.rowView}>
              <TouchableOpacity onPress={() => onHandleCancelPrompt()} style={[styles.button, styles.cancelButton]}>
                <Text style={[styles.buttonText, styles.cancelText]}>{STRINGS.cancel}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onHandleApprovePrompt()} style={styles.button}>
                <Text style={styles.buttonText}>{STRINGS.continue}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default ConfirmationApproval;
