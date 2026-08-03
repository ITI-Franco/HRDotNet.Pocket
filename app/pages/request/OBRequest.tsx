// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, Platform, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import PageHeader from 'src/components/header/PageHeader';
import { STRINGS, STYLES, DateTimeUtils, ARRAY } from 'src';
import { Utils } from 'src/utils/Utils';
import { UtilsDisplay } from 'src/utils/UtilsDisplay';
import { UtilsFetch } from 'src/utils/UtilsFetch';
import {
  StateOBRequest,
  TypeHandle,
  TypeNavProp,
  ParamsRequestApplication,
  TypePanel,
  TypeReqAction,
} from 'src/types/Types';
import { ValuesOBRequest, SelectionList, FieldLimit } from 'src/constants/Values';

const OBRequest: React.FC<TypeNavProp> = ({ navigation }) => {
  const styles = STYLES.NewRequest;
  const [onPanel] = useState<TypePanel[]>(ARRAY.panel)[0];
  const [onReqAction] = useState<TypeReqAction[]>(ARRAY.reqAction)[0];

  const params = useRoute()?.params as ParamsRequestApplication;
  let currParams: ParamsRequestApplication = {
    onPanel: onPanel.OB,
    onReqAction: params?.onReqAction,
    location: params?.location,
    branch: params?.branch,
    image: params?.image,
    data: params?.data,
  };

  const [state, setState] = useReducer(
    (state: StateOBRequest, newState: Partial<StateOBRequest>) => ({ ...state, ...newState }),
    ValuesOBRequest.State,
  );

  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesOBRequest.Handle,
  );

  useEffect(() => {
    const stateFilingData = setState(
      UtilsFetch.panelUpdateRequestFormData(currParams.onPanel, currParams.data) as StateOBRequest,
    );
    const handleFilingData = setHandle({ checkSelect: currParams?.data?.filing?.logType?.id });

    currParams.onReqAction !== onReqAction.Update
      ? (setState({ reason: '' }), stateFilingData, handleFilingData)
      : stateFilingData,
      handleFilingData;
  }, []);

  useEffect(() => {
    currParams.location && setState({ location: currParams.location });
    currParams.branch && setState({ branch: currParams.branch });
    currParams.image && setState({ attachment: currParams.image });
  }, [params]);

  useEffect(() => {
    currParams = { ...currParams, branch: SelectionList };
    currParams.location && setState({ branch: SelectionList });
  }, [params?.location]);

  const onHandleOBDateFrom = async (date: string) => {
    setHandle({ isDateFromPicker: false });
    setState({ OBDateFrom: DateTimeUtils.isoToDateDash(date), OBDateTo: '' });
  };

  const onHandleOBDateTo = async (date: string) => {
    setHandle({ isDateToPicker: false });
    setState({ OBDateTo: DateTimeUtils.isoToDateDash(date) });
  };

  const onHandleTimeIn = (time: string) => {
    setHandle({ isTimeFromPicker: false });
    setState({ OBTimeOut: '', OBTimeIn: DateTimeUtils.timeWithSeconds(time) });
  };

  const onHandleTimeOut = (time: string) => {
    setHandle({ isTimeToPicker: false });
    setState({ OBTimeOut: DateTimeUtils.timeWithSeconds(time) });
  };

  const onNextHandler = async () => {
    await Utils.checkHaveValueRequest(
      onPanel.OB,
      currParams.onReqAction,
      state,
      currParams.data,
      setHandle,
      navigation,
    );
  };


  return (
    <View style={styles.mainView}>
      <PageHeader name={Utils.panelPageHeaderTitle(currParams.onPanel, currParams.onReqAction)} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
        <ScrollView>
          <View style={styles.container}>
            {currParams.onReqAction === onReqAction.Cancel
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
                    STRINGS.requestFieldCancellationReason,
                    state.reason,
                    true,
                    (text: string) => setState({ reason: text }),
                    true,
                  ),
                ]
              : [
                  UtilsDisplay.DisplayFieldWithIcon(
                    handle.isInputCheck!,
                    STRINGS.OBRequestFieldI,
                    state.OBDateFrom,
                    true,
                    DateTimeUtils.dateDefaultToWord(state.OBDateFrom),
                    STRINGS.styledPlaceholderDate,
                    () => setHandle({ isDateFromPicker: true }),
                    'calendar',
                  ),

                  UtilsDisplay.DisplayFieldWithIcon(
                    handle.isInputCheck!,
                    STRINGS.OBRequestFieldII,
                    state.OBDateTo,
                    true,
                    DateTimeUtils.dateDefaultToWord(state.OBDateTo),
                    STRINGS.styledPlaceholderDate,
                    () => setHandle({ isDateToPicker: true }),
                    'calendar',
                  ),

                  UtilsDisplay.DisplayButtonField(
                    true,
                    handle.isInputCheck!,
                    STRINGS.OBRequestFieldIII,
                    state.location.name || '',
                    state.location?.name,
                    STRINGS.tapSelectPlaceholder('Location'),
                    () =>
                      navigation.navigate(STRINGS.pathSelectionList, {
                        currParams,
                        action: STRINGS.selectionListOBRequestI,
                      }),
                  ),

                  UtilsDisplay.DisplayButtonField(
                    false,
                    handle.isInputCheck!,
                    STRINGS.OBRequestFieldIV,
                    state.location.name || '',
                    state.branch?.name,
                    STRINGS.tapSelectPlaceholder('Branch'),
                    () =>
                      navigation.navigate(STRINGS.pathSelectionList, {
                        currParams,
                        stateLocationID: state.location?.ID,
                        action: STRINGS.selectionListOBRequestII,
                      }),
                    !state.location?.name ? true : false,
                  ),

                  UtilsDisplay.DisplayFieldWithIcon(
                    handle.isInputCheck!,
                    STRINGS.OBRequestFieldVII,
                    state.OBTimeIn,
                    true,
                    DateTimeUtils.timeSecondsToUnits(state.OBTimeIn),
                    STRINGS.styledPlaceholderTime,
                    () => setHandle({ isTimeFromPicker: true }),
                    'time',
                  ),

                  UtilsDisplay.DisplayFieldWithIcon(
                    handle.isInputCheck!,
                    STRINGS.OBRequestFieldVIII,
                    state.OBTimeOut,
                    true,
                    DateTimeUtils.timeSecondsToUnits(state.OBTimeOut),
                    STRINGS.styledPlaceholderTime,
                    () => setHandle({ isTimeToPicker: true }),
                    'time',
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
        handle.isDateFromPicker!,
        'date',
        (date: string) => onHandleOBDateFrom(date),
        () => setHandle({ isDateFromPicker: false }),
        state.OBDateFrom ? DateTimeUtils.defaultStartDate(state.OBDateFrom) : DateTimeUtils.dayToDate(),
      )}

      {UtilsDisplay.DisplayDateTimePicker(
        handle.isDateToPicker!,
        'date',
        (date: string) => onHandleOBDateTo(date),
        () => setHandle({ isDateToPicker: false }),
        DateTimeUtils.dayToDate(),
        state.OBDateFrom ? DateTimeUtils.dateDashToStartToDate(state.OBDateFrom) : DateTimeUtils.dayToDate(),
      )}

      {UtilsDisplay.DisplayDateTimePicker(
        handle.isTimeFromPicker!,
        'time',
        (time: string) => onHandleTimeIn(time),
        () => setHandle({ isTimeFromPicker: false }),
        DateTimeUtils.dayToDate(),
      )}

      {UtilsDisplay.DisplayDateTimePicker(
        handle.isTimeToPicker!,
        'time',
        (time: string) => onHandleTimeOut(time),
        () => setHandle({ isTimeToPicker: false }),
        DateTimeUtils.dayToDate(),
      )}
    </View>
  );
};

export default OBRequest;
