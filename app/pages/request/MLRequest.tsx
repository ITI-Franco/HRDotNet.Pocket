// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import PageHeader from 'src/components/header/PageHeader';
import { Utils } from 'src/utils/Utils';
import { UtilsDisplay } from 'src/utils/UtilsDisplay';
import { UtilsFetch } from 'src/utils/UtilsFetch';
import { FieldLimit, ValuesMLRequest } from 'src/constants/Values';
import {
  StateMLRequest,
  TypeHandle,
  TypeNavProp,
  CheckboxData,
  ParamsRequestApplication,
  TypePanel,
  TypeReqAction,
} from 'src/types/Types';
import { STRINGS, STYLES, ARRAY, DateTimeUtils } from 'src';

const MLRequest: React.FC<TypeNavProp> = ({ navigation }) => {
  const styles = STYLES.NewRequest;
  const [onPanel] = useState<TypePanel[]>(ARRAY.panel)[0];
  const [onReqAction] = useState<TypeReqAction[]>(ARRAY.reqAction)[0];

  const params = useRoute().params as ParamsRequestApplication;
  const currParams: ParamsRequestApplication = {
    onPanel: onPanel.ML,
    onReqAction: params?.onReqAction,
    image: params?.image,
    data: params?.data,
  };

  const [checkboxData] = useState(ARRAY.logType);
  const [state, setState] = useReducer(
    (state: StateMLRequest, newState: Partial<StateMLRequest>) => ({ ...state, ...newState }),
    ValuesMLRequest.State,
  );

  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesMLRequest.Handle,
  );

  useEffect(() => {
    const stateFilingData = setState(
      UtilsFetch.panelUpdateRequestFormData(currParams.onPanel, currParams.data) as StateMLRequest,
    );
    const handleFilingData = setHandle({ checkSelect: currParams?.data?.filing?.logType?.id });

    currParams.onReqAction !== onReqAction.Update
      ? (setState({}), stateFilingData, handleFilingData)
      : stateFilingData,
      handleFilingData;
  }, []);

  useEffect(() => {
    currParams.image && setState({ attachment: currParams.image });
  }, [params]);

  const onHandleMLDate = (date: string) => {
    setHandle({ isDatePicker: false });
    setState({ dateFiled: DateTimeUtils.isoToDateDash(date) });
  };

  const onHandleLogTime = (time: string) => {
    setHandle({ isTimePicker: false });
    setState({ logTime: DateTimeUtils.isoToDefaultTime(time) });
  };

  const onHandleCheck = (item: CheckboxData, index: number) => {
    setState({ logType: item });
    setHandle({ checkSelect: index });
  };

  const onNextHandler = async () => {
    await Utils.checkHaveValueRequest(
      onPanel.ML,
      currParams.onReqAction,
      state,
      currParams.data,
      setHandle,
      navigation,
    );
  };
  const stateToUse = (() => {
    switch (currParams.onReqAction) {
      case onReqAction.Cancel:
        return state.cancelReason;

      case onReqAction.Review:
        return state.reviewReason;

      case onReqAction.Approve:
        return state.approveReason;

      default:
        return "";
    }
  })();

  const setStateToUse = (text: string) => {
    switch (currParams.onReqAction) {
      case onReqAction.Cancel:
        setState({ cancelReason: text });
        break;

      case onReqAction.Review:
        setState({ reviewReason: text });
        break;

      case onReqAction.Approve:
        setState({ approveReason: text });
        break;

      default:
        break;
    }
  };

  const reasonLabel = (() => {
    switch (currParams.onReqAction) {
      case onReqAction.Cancel:
        return STRINGS.requestFieldCancellationReason;

      case onReqAction.Review:
        return STRINGS.requestFieldReviewReason;

      case onReqAction.Approve:
        return STRINGS.requestFieldApproveReason;

      default:
        return STRINGS.requestFieldReason;
    }
  })();

  return (
    <View style={styles.mainView}>
      <PageHeader name={Utils.panelPageHeaderTitle(currParams.onPanel, currParams.onReqAction)} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
        <ScrollView>
          <View style={styles.container}>
            {currParams.onReqAction === onReqAction.Cancel || currParams.onReqAction === onReqAction.Review || currParams.onReqAction === onReqAction.Approve
              ? [
                UtilsDisplay.DisplayFieldTextInput(
                  handle.isInputCheck!,
                  STRINGS.requestFieldDocumentNo,
                  state.documentNo!,
                  true,
                  () => ({}),
                  false,
                ),

                UtilsDisplay.DisplayFieldTextInput(
                  handle.isInputCheck!,
                  reasonLabel,
                  stateToUse || "",
                  true,
                  setStateToUse,
                  true,
                ),
              ]
              : [
                UtilsDisplay.DisplayFieldWithIcon(
                  handle.isInputCheck!,
                  STRINGS.MLRequestFieldI,
                  state.dateFiled,
                  true,
                  DateTimeUtils.dateDefaultToWord(state.dateFiled),
                  STRINGS.styledPlaceholderDate,
                  () => setHandle({ isDatePicker: true }),
                  'calendar',
                ),

                UtilsDisplay.DisplayFieldCheckbox(
                  checkboxData,
                  true,
                  handle.isInputCheck!,
                  handle.checkSelect!,
                  state.logType.name!,
                  STRINGS.MLRequestFieldII,
                  (item, index) => onHandleCheck(item as CheckboxData, index as number),
                  true,
                ),

                UtilsDisplay.DisplayFieldWithIcon(
                  handle.isInputCheck!,
                  STRINGS.MLRequestFieldIII,
                  state.logTime,
                  true,
                  DateTimeUtils.timeSecondsToUnits(state.logTime),
                  STRINGS.styledPlaceholderTime,
                  () => setHandle({ isTimePicker: true }),
                  'time',
                ),


                UtilsDisplay.DisplayFieldTextInput(
                  handle.isInputCheck!,
                  STRINGS.requrestFieldReferenceNo,
                  state.referenceNo || "",
                  true,
                  (text: string) => setState({ referenceNo: text }),
                  true,
                  14,
                ),

                UtilsDisplay.DisplayFieldTextInput(
                  handle.isInputCheck!,
                  STRINGS.requestFieldReason,
                  state.reason,
                  true,
                  (text: string) => setState({ reason: text }),
                  true,
                  FieldLimit,
                ),

                UtilsDisplay.DisplayFieldAttachment(
                  handle.isInputCheck!,
                  STRINGS.fileAttachment,
                  state.attachment.uri || state.attachment.url!,
                  true,
                  () => navigation.navigate(STRINGS.pathCamera, currParams),
                  () => Utils.fileAttach(setState),
                  () => currParams,
                ),
              ]}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.button} onPress={onNextHandler}>
        <Text style={styles.textButton}>{STRINGS.next}</Text>
      </TouchableOpacity>

      {UtilsDisplay.DisplayDateTimePicker(
        handle.isDatePicker!,
        'date',
        (date: string) => onHandleMLDate(date),
        () => setHandle({ isDatePicker: false }),
        state.dateFiled ? DateTimeUtils.dateDefaultToDate(state.dateFiled) : DateTimeUtils.dayToDate(),
      )}

      {UtilsDisplay.DisplayDateTimePicker(
        handle.isTimePicker!,
        'time',
        (time: string) => onHandleLogTime(time),
        () => setHandle({ isTimePicker: false }),
        state.logTime ? DateTimeUtils.timeToDate(state.logTime) : DateTimeUtils.dayToDate(),
      )}
    </View>
  );
};

export default MLRequest;
