// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

import PageHeader from 'src/components/header/PageHeader';
import Loader from 'src/components/loader/Loader';
import Toast from 'src/components/use/Toast';
import { STRINGS, STYLES, DateTimeUtils, ARRAY } from 'src';
import { useFetch } from 'src/hooks/useFetch';
import { Utils } from 'src/utils/Utils';
import { UtilsDisplay } from 'src/utils/UtilsDisplay';
import { UtilsFetch } from 'src/utils/UtilsFetch';
import { ValuesOTOFFRequest, Schedules, TimeRecord, FieldLimit } from 'src/constants/Values';
import {
  StateOTOFFRequest,
  TypeHandle,
  TypeNavStack,
  ParamsRequestApplication,
  TypePanel,
  TypeReqAction,
} from 'src/types/Types';

const OTRequest: React.FC<TypeNavStack> = ({ navigation }) => {
  const styles = STYLES.NewRequest;
  const [onPanel] = useState<TypePanel[]>(ARRAY.panel)[0];
  const [onReqAction] = useState<TypeReqAction[]>(ARRAY.reqAction)[0];

  const params = useRoute().params as ParamsRequestApplication;
  const currParams: ParamsRequestApplication = {
    onPanel: onPanel.OT,
    onReqAction: params?.onReqAction,
    image: params?.image,
    data: params?.data,
  };

  const [state, setState] = useReducer(
    (state: StateOTOFFRequest, newState: Partial<StateOTOFFRequest>) => ({ ...state, ...newState }),
    ValuesOTOFFRequest.State,
  );

  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesOTOFFRequest.Handle,
  );

  useEffect(() => {
    if (currParams.onReqAction === onReqAction.Update) {
      setState(UtilsFetch.panelUpdateRequestFormData(currParams.onPanel, currParams.data) as StateOTOFFRequest);
    } else if (currParams.onReqAction === onReqAction.Cancel) {
      setState({
        ...(UtilsFetch.panelUpdateRequestFormData(currParams.onPanel, currParams.data) as Record<string, any>),
        // reqTimeIn: DateTimeUtils.timeWithSeconds(currParams.data?.filing.actual?.dateFrom as string),
        // reqTimeOut: DateTimeUtils.timeWithSeconds(currParams.data?.filing.actual?.dateTo as string),
        reason: '',
        timeRecord: [{ date: '2025-01-14T00:00:00', source: 'etr' }],
      });
    }
  }, []);

  useEffect(() => {
    currParams?.image && setState({ attachment: currParams?.image });
  }, [params]);

  useEffect(() => {
    if (currParams.onReqAction !== onReqAction.Cancel) {
      setHandle({ isLoading: true });

      const interval = setTimeout(async () => {
        try {
          if (state.date != '') {
            await useFetch.ProcessedSchedule(navigation, state, setState, handle, setHandle);
            await useFetch.TimeRecord(navigation, state, setState, handle, setHandle);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setHandle({ isLoading: false });
        }
      }, 100);

      return () => clearTimeout(interval);
    }
  }, [state.date]);

  const onHandleOTDate = (date: string) => {
    setHandle({ isDatePicker: false });
    setState({ date: DateTimeUtils.isoToDateDash(date) });
  };

  const onHandleOTFrom = (time: string) => {
    setHandle({ isTimeFromPicker: false });
    setState({ reqTimeIn: DateTimeUtils.timeWithSeconds(time) });
  };

  const onHandleOTTo = (time: string) => {
    setHandle({ isTimeToPicker: false });
    setState({ reqTimeOut: DateTimeUtils.timeSecondsToUnitsZero(time) });
  };

  const onNextHandler = async () => {
    let scheduleToUse;
    const scheduleIn = DateTimeUtils.timeSecondsToUnits(state.schedule?.timeIn);
    const scheduleOut = DateTimeUtils.timeSecondsToUnits(state.schedule?.timeOut);
    const timeRecordIn = DateTimeUtils.timeSecondsToUnits(state.timeRecord[0]?.date);

    if (state.schedule.isPremium === true) {
      scheduleToUse = timeRecordIn < scheduleIn ? scheduleIn : timeRecordIn;
    } else {
      scheduleToUse = state.schedule?.timeOut ? state.schedule.timeOut : undefined;
    }

    if (state.reqTimeIn < scheduleToUse!) {
      return Alert.alert('', 'Requested Time In is greater than Actual OT In');
    } else if (state.timeRecord[state?.timeRecord?.length - 1]?.date < state.reqTimeOut) {
      return Alert.alert('', 'Requested Time Out is greater than Actual OT Out');
    }
    await Utils.checkHaveValueRequest(
      onPanel.OT,
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

      {handle.isLoading && <Loader />}

      {handle.isToast!.show && <Toast handle={handle.isToast!} setHandle={setHandle} />}

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
        <ScrollView bounces={false}>
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
                    STRINGS.OTRequestFieldI,
                    state.date,
                    true,
                    DateTimeUtils.dateDefaultToWord(state.date),
                    STRINGS.styledPlaceholderDate,
                    () => setHandle({ isDatePicker: true }),
                    'calendar',
                  ),

                  UtilsDisplay.DisplayFieldOnlyInput(
                    handle.isInputCheck!,
                    STRINGS.OFFRequestFieldII,
                    state.schedule?.name ? state.schedule?.name : undefined,
                    true,
                  ),

                  UtilsDisplay.DisplayFieldOnlyInput(
                    handle.isInputCheck!,
                    STRINGS.OTRequestFieldIII,
                    (() => {
                      const scheduleIn = DateTimeUtils.timeSecondsToUnits(state.schedule?.timeIn);
                      const scheduleOut = DateTimeUtils.timeSecondsToUnits(state.schedule?.timeOut);
                      const timeRecordIn = DateTimeUtils.timeSecondsToUnits(state.timeRecord[0]?.date);
                      if (state.schedule.isPremium === true) {
                        return timeRecordIn < scheduleIn ? scheduleIn : timeRecordIn;
                      } else {
                        return state.schedule?.timeOut ? scheduleOut : undefined;
                      }
                    })(),
                    true,
                  ),

                  UtilsDisplay.DisplayFieldOnlyInput(
                    handle.isInputCheck!,
                    STRINGS.OTRequestFieldIV,
                    state.timeRecord.length > 1
                      ? DateTimeUtils.timeSecondsToUnits(state.timeRecord[state.timeRecord?.length - 1]?.date)
                      : undefined,
                    true,
                  ),

                  UtilsDisplay.DisplayFieldWithIcon(
                    handle.isInputCheck!,
                    STRINGS.OTRequestFieldV,
                    state.reqTimeIn,
                    true,
                    DateTimeUtils.timeSecondsToUnits(state.reqTimeIn),
                    STRINGS.styledPlaceholderTime,
                    () => setHandle({ isTimeFromPicker: true }),
                    'time',
                  ),

                  UtilsDisplay.DisplayFieldWithIcon(
                    handle.isInputCheck!,
                    STRINGS.OTRequestFieldVI,
                    state.reqTimeOut,
                    true,
                    DateTimeUtils.timeSecondsToUnits(state.reqTimeOut),
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
                    FieldLimit.reason.maxLength,
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
        (date: string) => onHandleOTDate(date),
        () => setHandle({ isDatePicker: false }),
        state.date ? DateTimeUtils.dateToDate(state.date) : DateTimeUtils.dayToDate(),
      )}

      {UtilsDisplay.DisplayDateTimePicker(
        handle.isTimeFromPicker!,
        'time',
        (time: string) => onHandleOTFrom(time),
        () => setHandle({ isTimeFromPicker: false }),
        (() => {
          const scheduleIn = DateTimeUtils.timeToDate(state.schedule?.timeIn);
          const timeRecord = DateTimeUtils.timeToDate(state.timeRecord[0]?.date);
          const scheduleOut = DateTimeUtils.timeToDate(state.schedule?.timeOut);
          if (state.schedule.isPremium === true) {
            return timeRecord < scheduleIn ? scheduleIn : timeRecord;
          } else {
            return state.schedule?.timeOut ? scheduleOut : DateTimeUtils.dayToDate();
          }
        })(),
      )}

      {UtilsDisplay.DisplayDateTimePicker(
        handle.isTimeToPicker!,
        'time',
        (time: string) => onHandleOTTo(time),
        () => setHandle({ isTimeToPicker: false }),
        state.timeRecord[0]?.date
          ? DateTimeUtils.timeToDate(state.timeRecord[state.timeRecord?.length - 1]?.date)
          : DateTimeUtils.dayToDate(),
      )}
    </View>
  );
};

export default OTRequest;
