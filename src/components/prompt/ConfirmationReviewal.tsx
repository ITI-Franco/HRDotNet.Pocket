// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import StyledText from 'react-native-styled-text';

import { COLORS, STYLES, STRINGS } from 'src';
import { useApprovals, useReviewals } from 'src/contexts/pages';

const ConfirmmationReviewal: React.FC = () => {
  const styles = STYLES.ComponentConfirmationApproval;

  const { state, setState, handle, onHandleCancelPrompt, onHandleReviewPrompt } = useReviewals();

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

    return STRINGS.confirmationSelectionReviewal(state.count!, request, handle.isAction);
  };

  const onHandleContinue = () => {
    if (state.batchReason == undefined || state.batchReason.trim() == "") {
      alert(STRINGS.requiredReason)
    } else {
      onHandleReviewPrompt()
    }
  }

  const onHandleCancel = () => {
    onHandleCancelPrompt()
    setState({ batchReason: undefined })
  }

  return (
    <React.Fragment>
      <Modal transparent={true} visible={handle.isVisible} animationType="fade">
        <View style={styles.modalView}>
          <View style={styles.modalWrapper}>
            <FontAwesome name="question-circle" size={70} color={COLORS.yellow} />

            <Text style={styles.titleText}>{`${STRINGS.batch} ${handle.isAction === 0 ? STRINGS.cancel : STRINGS.review}?`}</Text>

            <StyledText style={styles.subTitleText} textStyles={STYLES.StyledText}>
              {onDisplayText()}
            </StyledText>

            <View>
              <Text style={styles.textReason} >Reason <Text style={styles.required}>*</Text></Text>
              <View style={styles.rowView}>
                <TextInput
                  style={styles.textArea}
                  value={state.batchReason}
                  onChangeText={(text) => setState({ batchReason: text })}
                  placeholder={`${STRINGS.placeholderReason}`}
                  placeholderTextColor="#888"
                  multiline={true}
                  numberOfLines={2}
                  textAlignVertical="top"
                />
              </View>
            </View>


            <View style={styles.rowView}>
              <TouchableOpacity onPress={onHandleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={[styles.buttonText, styles.cancelText]}>{STRINGS.cancel}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onHandleContinue} style={styles.button}>
                <Text style={styles.buttonText}>{STRINGS.continue}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default ConfirmmationReviewal;
