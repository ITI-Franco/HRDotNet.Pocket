// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useMemo } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import StyledText from 'react-native-styled-text';

import { COLORS, STYLES, STRINGS } from 'src';
import { TypeApprovalPromptItem } from 'src/types/Types';
import { useReviewals } from 'src/contexts/pages';

const ReviewalsPrompt: React.FC = () => {
  const styles = STYLES.ComponentApprovalsPrompt;
  const { state, handle, onHandleClosePrompt } = useReviewals();

  const DisplayBadge = ({ text }: { text: string }) => {
    return (
      <Text
        style={[
          styles.badge,
          {
            backgroundColor: text?.includes(STRINGS.review)
              ? COLORS.purple
              : text?.includes(STRINGS.approve)
                ? COLORS.green
                : COLORS.red,
          },
        ]}
      >
        {text}
      </Text>
    );
  };

  const renderItemSuccess = useMemo(() => {
    return ({ item, index }: { item: TypeApprovalPromptItem; index: number }) => (
      <View style={[styles.renderWrapper, styles.successItem]} key={index}>
        <FontAwesome name="check-circle" color={COLORS.green} size={15} />
        <Text style={styles.numberText}>{item?.documentNo}</Text>

        {item?.filingProcess && <DisplayBadge text={item.filingProcess} />}
      </View>
    );
  }, []);

  const renderItemFailed = useMemo(() => {
    return ({ item, index }: { item: TypeApprovalPromptItem; index: number }) => (
      <View style={styles.renderView} key={index}>
        <View style={styles.renderWrapper}>
          <FontAwesome name="exclamation-circle" color={COLORS.red} size={15} />

          <Text style={styles.numberText}>{item?.documentNo}</Text>

          {item?.filingProcess && <DisplayBadge text={item.filingProcess} />}
        </View>
        <Text style={styles.messageText}>{item?.message}</Text>
      </View>
    );
  }, []);

  return (
    <React.Fragment>
      <Modal transparent={true} visible={handle.isSuccess} animationType="fade">
        <View style={styles.modalView}>
          <View style={styles.modalWrapper}>
            <FontAwesome name="warning" size={70} color={COLORS.yellow} />

            <Text style={styles.titleText}>{STRINGS.notice}</Text>

            <StyledText style={styles.subTitleText} textStyles={STYLES.StyledText}>
              {STRINGS.approvalsPromptTitle}
            </StyledText>

            {state.successList!.length > 0 && (
              <FlatList
                style={styles.listView}
                data={state.successList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItemSuccess}
                ListHeaderComponent={() => (
                  <Text style={styles.headerText}>
                    {STRINGS.approvalsPromptSuccessTitle(state.successList!.length)}
                  </Text>
                )}
              />
            )}

            {state.failedList!.length > 0 && (
              <FlatList
                style={styles.listView}
                data={state.failedList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItemFailed}
                ListHeaderComponent={() => (
                  <Text style={styles.headerText}>{STRINGS.approvalsPromptFailedTitle(state.failedList!.length)}</Text>
                )}
              />
            )}

            <TouchableOpacity onPress={() => onHandleClosePrompt()} style={styles.button}>
              <Text style={styles.buttonText}>{STRINGS.okay}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default ReviewalsPrompt;
