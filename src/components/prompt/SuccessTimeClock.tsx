// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StyledText from 'react-native-styled-text';

import { COLORS, STYLES, STRINGS, DateTimeUtils } from 'src';
import { PropsSuccessTimeClock } from 'src/types/Types';

const SuccessTimeClock: React.FC<PropsSuccessTimeClock> = ({ state, visible, onCloseSuccessPrompt }) => {
  const styles = STYLES.ComponentSuccessTimeClock;

  const [visiblePrompt, setVisiblePrompt] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setVisiblePrompt(visible), 500);
  }, [visible]);

  return (
      <View style={styles.modalView}>
        <View style={styles.modalWrapper}>
          <Ionicons name={'checkmark-circle-sharp'} size={40} color={COLORS.green} />

          <Text style={styles.titleText}>{STRINGS.success}</Text>

          <Text style={styles.clockedDate}>{DateTimeUtils.dateDefaultToFullWord(state.clockedData?.date)}</Text>

          <Text style={styles.clockedTime}>{DateTimeUtils.timeSecondsToUnits(state.clockedData?.time)}</Text>

          <StyledText style={styles.subText} textStyles={STYLES.StyledText}>
            {STRINGS.successClocked(state?.status, state.clockedData?.address)}
          </StyledText>

          <TouchableOpacity onPress={onCloseSuccessPrompt} style={styles.button}>
            <Text style={styles.buttonText}>{STRINGS.okay}</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

export default SuccessTimeClock;
