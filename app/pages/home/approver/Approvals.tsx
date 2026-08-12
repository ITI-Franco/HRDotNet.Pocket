// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda
import React, { useCallback, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, Text, FlatList, StatusBar, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Toast from 'src/components/use/Toast';
import ApprovalsPanel from 'src/components/panel/home/approver/ApprovalsPanel';
import ConfirmationApproval from 'src/components/prompt/ConfirmationApproval';
import PageHeader from 'src/components/header/PageHeader';
import { COLORS, DateTimeUtils, STRINGS, STYLES } from 'src';
import RequestFilter from 'src/components/use/RequestFilter';
import { useApprovals } from 'src/contexts/pages';
import { useFocusEffect } from 'expo-router';

const Approvals: React.FC = () => {
  const styles = STYLES.Request;

  const {
    params,
    state,
    setState,
    handle,
    setHandle,
    onHandlePress,
    onHandleSetURLApproval,
    onHandleFetchApproval,
    ApprovalCount,
  } = useApprovals();

  useEffect(() => {
    onHandleSetURLApproval();
  }, [state.selectedButton, handle.refreshing]);

  useEffect(() => {
    onHandleFetchApproval();
  }, [handle.refreshing, state.urlQuery, state.page, params]);

  useEffect(() => {
    ApprovalCount();
  }, [state.totalCount]);

  useFocusEffect(
    useCallback(() => {
      setHandle({ isLoading: true, refreshing: true });
      const timeoutId = setTimeout(() => {
        setHandle({ isLoading: false, refreshing: true });
      }, 800);
      return () => clearTimeout(timeoutId);
    }, []),
  );

  return (
    <React.Fragment>
      <StatusBar backgroundColor={COLORS.powderBlue} barStyle="light-content" />

      <PageHeader name={STRINGS.pageTitleApprovals} />

      {handle.isToast!.show && <Toast handle={handle.isToast!} setHandle={setHandle} />}

      <RequestFilter state={[state, setState]} handle={[handle, setHandle]} />

      <Animatable.View animation={'fadeIn'} duration={900} style={{ opacity: 1, flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <FlatList
              data={state.buttons}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[styles.button, state.selectedButton === index && styles.selectedButton]}
                  onPress={() => onHandlePress(index)}
                  disabled={state.selectedButton === index ? true : false}
                >
                  <View style={styles.tabItem}>
                    {state.selectedButton === index && (
                      <Text style={styles.approvalCountButton}>{state.totalCount ?? 0}</Text>
                    )}

                    <Text
                      style={[
                        styles.buttonText,
                        state.selectedButton === index && styles.selectedTextButton,
                        index === 6 && { color: COLORS.gray },
                      ]}
                    >
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              style={styles.buttonList}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {state.selectedButton != null ? <ApprovalsPanel /> : null}
        </View>
      </Animatable.View>

      <ConfirmationApproval />
    </React.Fragment>
  );
};

export default Approvals;
