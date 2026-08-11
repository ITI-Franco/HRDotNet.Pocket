// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import PageHeader from 'src/components/header/PageHeader';
import { STRINGS, DateTimeUtils, STYLES, ARRAY } from 'src';
import { Utils } from 'src/utils/Utils';
import { UtilsDisplay } from 'src/utils/UtilsDisplay';
import { UtilsFetch } from 'src/utils/UtilsFetch';
import { FieldLimit, ValuesCOSRequest } from 'src/constants/Values';
import {
  StateCOSRequest,
  TypeHandle,
  TypeNavProp,
  ParamsRequestApplication,
  TypePanel,
  TypeReqAction,
} from 'src/types/Types';

const COSRequest: React.FC<TypeNavProp> = ({ navigation }) => {
  const styles = STYLES.NewRequest;
  const [onPanel] = useState<TypePanel[]>(ARRAY.panel)[0];
  const [onReqAction] = useState<TypeReqAction[]>(ARRAY.reqAction)[0];

  const params = useRoute()?.params as ParamsRequestApplication;
  const currParams: ParamsRequestApplication = {
    onPanel: onPanel.COS,
    onReqAction: params?.onReqAction,
    requested: params?.requested,
    image: params?.image,
    data: params?.data,
  };

  const [state, setState] = useReducer(
    (state: StateCOSRequest, newState: Partial<StateCOSRequest>) => ({ ...state, ...newState }),
    ValuesCOSRequest.State,
  );

  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesCOSRequest.Handle,
  );

  useEffect(() => {
    const stateFilingData = setState(
      UtilsFetch.panelUpdateRequestFormData(currParams.onPanel, currParams.data) as StateCOSRequest,
    );
    const handleFilingData = setHandle({ checkSelect: params?.data?.filing?.requested?.isRestDay === true ? 1 : 0 });

    (currParams.onReqAction !== onReqAction.Update
      ? (setState({}), stateFilingData, handleFilingData)
      : stateFilingData,
      handleFilingData);
  }, []);

  useEffect(() => {
    currParams?.requested && setState({ requested: currParams?.requested });
    currParams?.image && setState({ attachment: currParams?.image });
  }, [params]);

  const onStartDateChange = (date: string) => {
    setHandle({ isDateFromPicker: false });
    setState({ endDate: '', startDate: DateTimeUtils.isoToDateDash(date) });
  };

  const onEndDateChange = (date: string) => {
    setHandle({ isDateToPicker: false });
    setState({ endDate: DateTimeUtils.isoToDateDash(date) });
  };

  const onHandleCheck = (item: string, index: number) => {
    if (handle.checkSelect === index) {
      setHandle({ checkSelect: null });
      setState({ restDay: 0 });
    } else {
      setHandle({ checkSelect: index });
      setState({ restDay: 1 });
    }
  };

  const onNextHandler = async () => {
    await Utils.checkHaveValueRequest(
      onPanel.COS,
      currParams.onReqAction,
      Utils.trimData(state),
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
        return '';
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

  useEffect(() => {
    console.log("Sss", state.startDate)
  }, [state.startDate])
  return (
    <View style={styles.mainView}>
      <PageHeader name={Utils.panelPageHeaderTitle(currParams.onPanel, currParams.onReqAction)} />

      <ScrollView style={styles.container}>
        {currParams.onReqAction === onReqAction.Cancel ||
          currParams.onReqAction === onReqAction.Review ||
          currParams.onReqAction === onReqAction.Approve
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
              stateToUse || '',
              true,
              setStateToUse,
              true,
              FieldLimit.reason.maxLength,
              STRINGS.placeholderReason,
              true,
            ),
          ]
          : [
            UtilsDisplay.DisplayFieldWithIcon(
              handle.isInputCheck!,
              STRINGS.COSRequestFieldI,
              state.startDate,
              true,
              DateTimeUtils.dateDefaultToWord(state.startDate),
              STRINGS.styledPlaceholderDateRange.startDate,
              () => setHandle({ isDateFromPicker: true }),
              'calendar',
              true
            ),

            UtilsDisplay.DisplayFieldWithIcon(
              handle.isInputCheck!,
              STRINGS.COSRequestFieldII,
              state.endDate,
              true,
              DateTimeUtils.dateDefaultToWord(state.endDate),
              STRINGS.styledPlaceholderDateRange.endDate,
              () => setHandle({ isDateToPicker: true }),
              'calendar',
              true
            ),

            UtilsDisplay.DisplayButtonField(
              true,
              handle.isInputCheck!,
              STRINGS.COSRequestFieldIII,
              state.requested.name || '',
              state.requested?.name,
              STRINGS.tapSelectPlaceholder('Schedule'),
              () =>
                navigation.navigate(STRINGS.pathSelectionList, {
                  currParams,
                  action: STRINGS.selectionListCOSRequest,
                }),
              false,
              true
            ),

            UtilsDisplay.DisplayFieldCheckbox(
              state.checkbox,
              true,
              handle.isInputCheck!,
              handle.checkSelect!,
              state.requested.name || '',
              STRINGS.COSRequestFieldIIV,
              (item, index) => onHandleCheck(item as string, index as number),
              false,
            ),

            UtilsDisplay.DisplayFieldTextInput(
              handle.isInputCheck!,
              STRINGS.requrestFieldReferenceNo,
              state.referenceNo || '',
              true,
              (text: string) => setState({ referenceNo: text }),
              true,
              14,
              STRINGS.placeholderReferenceNo
            ),

            UtilsDisplay.DisplayFieldTextInput(
              handle.isInputCheck!,
              STRINGS.requestFieldReason,
              state.reason,
              true,
              (text: string) => setState({ reason: text }),
              true,
              FieldLimit.reason.maxLength,
              STRINGS.placeholderReason,
              true,
            ),

            UtilsDisplay.DisplayFieldAttachment(
              handle.isInputCheck!,
              STRINGS.fileAttachment,
              state.attachment.uri || state.attachment.url!,
              true,
              () => navigation.navigate(STRINGS.pathCamera, currParams),
              () => Utils.fileAttach(setState),
              () => currParams,
              true
            ),
          ]}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={onNextHandler}>
        <Text style={styles.textButton}>{STRINGS.next}</Text>
      </TouchableOpacity>

      {UtilsDisplay.DisplayDateTimePicker(
        handle.isDateFromPicker!,
        'date',
        (date: string) => onStartDateChange(date),
        () => setHandle({ isDateFromPicker: false }),
        state.startDate ? DateTimeUtils.dateDefaultToDate(state.startDate) : DateTimeUtils.dayToDate(),
      )}

      {UtilsDisplay.DisplayDateTimePicker(
        handle.isDateToPicker!,
        'date',
        (date: string) => onEndDateChange(date),
        () => setHandle({ isDateToPicker: false }),
        undefined,
        state.endDate ? DateTimeUtils.dateDefaultToDate(state.endDate) : DateTimeUtils.dayToDate(),
      )}
    </View>
  );
};

export default COSRequest;
