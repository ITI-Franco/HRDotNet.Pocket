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
import { COLORS, STRINGS, STYLES } from 'src';
import RequestFilter from 'src/components/use/RequestFilter';
import { useApprovals } from 'src/contexts/pages';
import { useFocusEffect } from 'expo-router';
import { SchemaRequestApplications } from 'src/types/Types';
import { useGlobalStore } from 'src/store/GlobalStore';
import { FilingPanel } from 'src/constants/Enum';
import { FilingUtils } from 'src/utils/Utils';

const Approvals: React.FC = () => {
  const styles = STYLES.Request;

  const { cutOffPeriod, approvalCounts } = useGlobalStore();

  const { params, state, setState, handle, setHandle, onHandlePress, onHandleSetURLApproval, onHandleFetchApproval } =
    useApprovals();

  useEffect(() => {
    onHandleSetURLApproval();
  }, [state.selectedButton, handle.refreshing]);

  useEffect(() => {
    onHandleFetchApproval();
  }, [handle.refreshing, state.urlQuery, state.page, , params]);

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
              renderItem={({ item, index }) => {
                const filteredItems =
                  approvalCounts?.[index]?.filter((item: SchemaRequestApplications) =>
                    FilingUtils.isEligibleFiling(item, index, cutOffPeriod, [STRINGS.filed, STRINGS.reviewed]),
                  ) ?? [];

                const count = filteredItems.length;

                return (
                  <TouchableOpacity
                    style={[styles.button, state.selectedButton === index && styles.selectedButton]}
                    onPress={() => onHandlePress(index)}
                    disabled={state.selectedButton === index}
                  >
                    <View style={styles.tabItem}>
                      {count !== 0 && (
                        <Text
                          style={[
                            styles.approvalCountButton,
                            state.selectedButton === index
                              ? {
                                  color: COLORS.orange,
                                  backgroundColor: COLORS.clearWhite,
                                }
                              : {
                                  color: COLORS.clearWhite,
                                  backgroundColor: COLORS.orange,
                                },
                          ]}
                        >
                          {count}
                        </Text>
                      )}

                      <Text
                        style={[
                          styles.buttonText,
                          state.selectedButton === index && styles.selectedTextButton,
                          index === FilingPanel.CTO && { color: COLORS.gray },
                        ]}
                      >
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
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
