// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';
import StyledText from 'react-native-styled-text';
import { Image } from 'expo-image';

import { STRINGS, STYLES, DateTimeUtils, ARRAY, ASSETS } from 'src';
import { PropsOTPrompt, StateOTPrompt } from 'src/types/Types';

const OTPrompt: React.FC<PropsOTPrompt> = ({ handle, onHandleSelect, onHandleCancel, onHandleCheck }) => {
  const [data] = useState<StateOTPrompt[]>(ARRAY.schedule);
  const styles = STYLES.ComponentOTPrompt;

  return (
    <>
      <Modal transparent={true} visible={handle.isVisible} animationType="fade">
        <View style={styles.modalView}>
          <View style={styles.modalWrapper}>
            <Image source={ASSETS.iconOTRequest} style={{ width: 70, height: 70 }} />

            <Text style={styles.titleText}>{STRINGS.OTPromptTitle}</Text>

            {!data ? (
              <StyledText style={styles.subTitleText} textStyles={textStyles}>
                {STRINGS.OTPromptHaveLogs('half', DateTimeUtils.getCurrWordMonth())}
              </StyledText>
            ) : (
              <React.Fragment>
                <StyledText style={styles.subTitleText} textStyles={textStyles}>
                  {STRINGS.OTPromptHaveLogs('half', DateTimeUtils.getCurrWordMonth())}
                </StyledText>

                <StyledText style={[styles.subTitleText, { marginTop: 10 }]} textStyles={textStyles}>
                  {STRINGS.OTPromptNote}
                </StyledText>

                <View style={styles.listView}>
                  <View style={styles.listTitle}>
                    <Text style={styles.dateTitle}>{STRINGS.OTPromptColI}</Text>

                    <View style={styles.listTimeTitle}>
                      <Text style={styles.timeTitle}>{STRINGS.OTPromptColII}</Text>
                      <Text style={styles.timeTitle}>{STRINGS.OTPromptColIII}</Text>
                    </View>
                  </View>

                  <FlatList
                    data={data}
                    persistentScrollbar={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <View style={styles.itemView}>
                        <Checkbox
                          value={handle.checkSelect === index}
                          onValueChange={() => onHandleCheck(item, index)}
                        />

                        <Text style={styles.itemText}>{DateTimeUtils.dateDefaultToHalfWord(item.date)}</Text>

                        <Text style={styles.itemText}>{DateTimeUtils.timeSingleToDouble(item.timeOut)}</Text>

                        <Text style={styles.itemText}>{DateTimeUtils.timeSingleToDouble(item.clockOut)}</Text>
                      </View>
                    )}
                  />
                </View>
              </React.Fragment>
            )}

            {!data ? (
              <TouchableOpacity onPress={onHandleCancel} style={styles.button}>
                <Text style={styles.buttonText}>{STRINGS.okay}</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.rowView}>
                <TouchableOpacity onPress={onHandleCancel} style={[styles.button, styles.cancelButton]}>
                  <Text style={[styles.buttonText, styles.cancelText]}>{STRINGS.cancel}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={onHandleSelect}>
                  <Text style={styles.buttonText}>{STRINGS.select}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

const textStyles = StyleSheet.create({
  b: {
    fontFamily: 'Inter_600SemiBold',
  },
});

export default OTPrompt;
