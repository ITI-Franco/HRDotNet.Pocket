// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import StyledText from 'react-native-styled-text';

import { COLORS, STYLES } from 'src';
import { PropsSuccessPrompt } from 'src/types/Types';

const SuccessPrompt: React.FC<PropsSuccessPrompt> = ({ title, subTitle, buttonText, visible, onHandleClosePrompt }) => {
  const styles = STYLES.ComponentSuccessPrompt;

  return (
    <React.Fragment>
      <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.modalView}>
          <View style={styles.modalWrapper}>
            <FontAwesome name="check-circle" size={80} color={COLORS.green} />

            <Text style={styles.titleText}>{title}</Text>

            <StyledText style={styles.subTitleText} textStyles={STYLES.StyledText}>
              {subTitle}
            </StyledText>

            <TouchableOpacity onPress={onHandleClosePrompt} style={styles.button}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default SuccessPrompt;
