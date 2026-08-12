// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda
import React, { useCallback, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, Text, FlatList, StatusBar, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Toast from 'src/components/use/Toast';
import PageHeader from 'src/components/header/PageHeader';
import { COLORS, DateTimeUtils, STRINGS, STYLES } from 'src';
import RequestFilter from 'src/components/use/RequestFilter';
import { useReviewals } from 'src/contexts/pages';
import { useFocusEffect } from 'expo-router';
import ReviewalsPanel from 'src/components/panel/home/approver/ReviewalsPanel';
import ConfirmmationReviewal from 'src/components/prompt/ConfirmationReviewal';
import { useGlobalStore } from 'src/store/GlobalStore';
import { SchemaRequestApplications } from 'src/types/Types';
import { FilingPanel } from 'src/constants/Enum';

const Reviewals: React.FC = () => {
  const styles = STYLES.Request;

  const { cutOffPeriod } = useGlobalStore();

  const {
    params,
    state,
    setState,
    handle,
    setHandle,
    onHandlePress,
    onHandleSetURLReviewal,
    onHandleFetchReviewal,
    ApprovalCount,
  } = useReviewals();

  useEffect(() => {
    onHandleSetURLReviewal();
  }, [state.selectedButton, handle.refreshing]);

  useEffect(() => {
    onHandleFetchReviewal();
  }, [handle.refreshing, state.urlQuery, state.page, params]);

  useEffect(() => {
    ApprovalCount();
  }, []);

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

      <PageHeader name={STRINGS.pageTitleReviewals} />

      {handle.isToast!.show && <Toast handle={handle.isToast!} setHandle={setHandle} />}

      <RequestFilter state={[state, setState]} handle={[handle, setHandle]} />

      <Animatable.View animation={'fadeIn'} duration={900} style={{ opacity: 1, flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <FlatList
              data={state.buttons}
              renderItem={({ item, index }) => {
                const filteredItems =
                  state.approvalCounts?.[index]?.filter((item: SchemaRequestApplications) => {
                    if (index === FilingPanel.OB) {
                      return (
                        item.filing?.filingStatus?.name === STRINGS.filed &&
                        item.filing.dateRange?.dateFrom! >= cutOffPeriod?.[0]! &&
                        item.filing.dateRange?.dateTo! <= cutOffPeriod?.[1]!
                      );
                    }

                    return (
                      item.filing?.filingStatus?.name === STRINGS.filed &&
                      item.filing?.dateFiled! >= cutOffPeriod?.[0]! &&
                      item.filing?.dateFiled! <= cutOffPeriod?.[1]!
                    );
                  }) ?? [];

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

          {state.selectedButton != null ? <ReviewalsPanel /> : null}
        </View>
      </Animatable.View>

      <ConfirmmationReviewal />
    </React.Fragment>
  );
};

export default Reviewals;
