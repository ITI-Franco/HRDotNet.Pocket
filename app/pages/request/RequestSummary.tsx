// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useReducer } from 'react';
import { useRoute } from '@react-navigation/native';

import PageHeader from 'src/components/header/PageHeader';
import SummaryPanel from 'src/components/panel/request/SummaryPanel';
import Toast from 'src/components/use/Toast';
import { STRINGS, ARRAY, DateTimeUtils } from 'src';
import { useFetch } from 'src/hooks/useFetch';
import {
  PropsRequestSummary,
  TypeHandle,
  TypeNavStack,
  SchemaRequestApplications,
  TypeReqAction,
} from 'src/types/Types';
import { ValuesRequestSummary } from 'src/constants/Values';
import { useGlobalStore } from 'src/store/GlobalStore';
import { Utils } from 'src/utils/Utils';

const RequestSummary: React.FC<TypeNavStack> = ({ navigation }) => {
  const [onReqAction] = useState<TypeReqAction[]>(ARRAY.reqAction)[0];
  const { employeeName } = useGlobalStore();

  const params = useRoute().params as {
    onPanel?: number;
    onReqAction?: number;
    props?: unknown;
    data?: unknown;
  };

  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesRequestSummary.Handle,
  );

  const currPanel: number = params.onPanel || 0;
  const currOnReqAction = params.onReqAction as number;
  const currProps = params.props as PropsRequestSummary; // Form values state
  const currUpdateProps = params.data as SchemaRequestApplications;

  // console.log(
  //   "Updd",
  //   JSON.stringify(currProps, null, 2),
  //   JSON.stringify(currUpdateProps, null, 2)
  // );

  const onHandleClosePrompt = () => {
    setHandle({ isSuccess: false });
    navigation.navigate(STRINGS.pathTabStack, { screen: STRINGS.tabTitleRequest, params: { refresh: true } });
  };

  const cancellationReason =
    currOnReqAction === 3 ? STRINGS.requestCancellation(currUpdateProps, currProps) : currProps.reason;

  const onHandleSubmit = () => {
    (async () => {
      try {
        setHandle({ isLoading: true });
        await useFetch.SubmitRequest(
          navigation,
          currPanel,
          currOnReqAction,
          JSON.stringify({ ...currProps, reason: cancellationReason }),
          currUpdateProps,
          handle,
          setHandle,
          employeeName,
        );
      } catch (error) {
        console.error(error);
      } finally {
        setHandle({ isLoading: false });
      }
    })();
  };

  return (
    <React.Fragment>
      <PageHeader
        name={`${STRINGS.pageTitleReqSummary} ${
          currOnReqAction === onReqAction.New
            ? ''
            : currOnReqAction !== onReqAction.Update
              ? STRINGS.cancel
              : STRINGS.update
        }`}
      />

      {handle.isToast!.show && <Toast handle={handle.isToast!} setHandle={setHandle} />}

      <SummaryPanel
        panel={currPanel}
        reqAction={currOnReqAction}
        data={currProps}
        handle={handle}
        onHandleSubmit={onHandleSubmit}
        onHandleClosePrompt={onHandleClosePrompt}
      />
    </React.Fragment>
  );
};

export default RequestSummary;
