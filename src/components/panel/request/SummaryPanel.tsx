// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useReducer, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import SuccessPrompt from 'src/components/prompt/SuccessPrompt';
import RowDetails from 'src/components/sections/request/RowDetails';
import RowAttachment from 'src/components/sections/request/RowAttachment';
import LoaderPage from 'src/components/loader/LoaderPage';
import { STYLES, STRINGS, ARRAY } from 'src';
import { ValuesSummaryPanel } from 'src/constants/Values';
import { StateSummaryPanel, PropsSummaryPanel, TypeDetailsSummaryPanel, TypeReqAction } from 'src/types/Types';

const SummaryPanel: React.FC<PropsSummaryPanel> = ({
  panel,
  reqAction,
  data,
  handle,
  onHandleSubmit,
  onHandleClosePrompt,
}) => {
  const styles = STYLES.ComponentRequestSummary;
  const [onReqAction] = useState<TypeReqAction[]>(ARRAY.reqAction)[0];

  const [state, setState] = useReducer(
    (state: StateSummaryPanel, newState: Partial<StateSummaryPanel>) => ({ ...state, ...newState }),
    ValuesSummaryPanel.State,
  );

  const DetailsRender = () => {
    return state.details.map((item: TypeDetailsSummaryPanel, index: number) => (
      <RowDetails item={item} index={index} key={index} />
    ));
  };

  useEffect(() => {
    const val = ARRAY.requestSummary(data, reqAction)[panel];

    val &&
      setState({
        details: val.details.map((item) => ({
          label: item.label,
          value: item.value!,
        })),
        subText: val.subText,
      });
  }, []);

  return (
    <React.Fragment>
      {handle.isLoading ? (
        <LoaderPage />
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>{STRINGS.requestSummary}</Text>

          <ScrollView style={styles.summaryView} showsVerticalScrollIndicator={false}>
            {DetailsRender()}
            {reqAction == onReqAction.New || reqAction == onReqAction.Update && <RowAttachment attachment={data?.attachment} />}
          </ScrollView>

          <TouchableOpacity style={styles.button} onPress={() => onHandleSubmit()}>
            <Text style={styles.textButton}>{STRINGS.submit}</Text>
          </TouchableOpacity>
        </View>
      )}

      <SuccessPrompt
        title={STRINGS.success}
        subTitle={state.subText}
        buttonText={STRINGS.okay}
        visible={handle.isSuccess!}
        onHandleClosePrompt={onHandleClosePrompt}
      />
    </React.Fragment>
  );
};

export default SummaryPanel;
