// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { ARRAY, ERRORS, STRINGS } from 'src';
import {
  StateCOSRequest,
  StateLVRequest,
  StateMLRequest,
  StateOBRequest,
  StateOTOFFRequest,
  SchemaRequestApplications,
  SchemaApprovalsManager,
  TypePanel,
  TypeReqAction,
  TypeApprovalPromptItem,
  TypeError,
  UtilsCatchEvent,
} from 'src/types/Types';
import { ApprovalsType, FilingStatus, StatusCode } from 'src/constants/Values';
import { FilingPanel } from 'src/constants/Enum';

const [onPanel] = ARRAY.panel as TypePanel[];
const [onReqAction] = ARRAY.reqAction as TypeReqAction[];

export const UtilsFetch = {
  panelApprovalsFormData: async (panel: number, data: SchemaRequestApplications) => {
    let dataSet: Array<unknown> = [];
    const formData: any | FormData = new FormData();

    switch (panel) {
      case 0:
        dataSet = ARRAY.requestBodyCOS(data);
        break;

      case 1:
        dataSet = ARRAY.requestBodyOB(data);
        break;

      case 2:
      case 3:
        dataSet = ARRAY.reqBodyOTOFF(data);
        break;

      case 4:
        dataSet = ARRAY.reqBodyLV(data);
        break;

      case 5:
        dataSet = ARRAY.reqBodyML(data);

        break;

      default:
        break;
    }

    dataSet.map((data) => {
      const typedData = data as { title: string; value: string | number | boolean };
      formData.append(typedData.title, typedData.value);
    });

    return formData;
  },

  approvalsEndpoint: async (panel: number, type?: number, filingId?: number) => {
    let url: string | undefined = '';

    const onCheckFilingStatus = async (approval: string, reviewal: string, cancel?: string) => {
      if (type === ApprovalsType.Single) {
        if (filingId === FilingStatus.Reviewed) {
          url = approval;
          return;
        } else if (filingId === FilingStatus.Filed) {
          url = reviewal;
          return;
        }
      } else if (filingId === FilingStatus.Approved) {
        url = approval;
        return;
      } else if (filingId === FilingStatus.Reviewed) {
        url = reviewal;
        return;
      } else if (filingId === FilingStatus.Cancelled) {
        url = cancel;
        return;
      }

      url = '';
    };

    switch (panel) {
      case 0:
        await onCheckFilingStatus(
          process.env.EXPO_PUBLIC_APPROVAL_COS!,
          process.env.EXPO_PUBLIC_REVIEW_COS!,
          process.env.EXPO_PUBLIC_CANCEL_COS!,
        );
        break;

      case 1:
        await onCheckFilingStatus(
          process.env.EXPO_PUBLIC_APPROVAL_OB!,
          process.env.EXPO_PUBLIC_REVIEW_OB!,
          process.env.EXPO_PUBLIC_CANCEL_OB!,
        );
        break;

      case 2:
        await onCheckFilingStatus(
          process.env.EXPO_PUBLIC_APPROVAL_OT!,
          process.env.EXPO_PUBLIC_REVIEW_OT!,
          process.env.EXPO_PUBLIC_CANCEL_OT!,
        );
        break;

      case 3:
        await onCheckFilingStatus(
          process.env.EXPO_PUBLIC_APPROVAL_OFF!,
          process.env.EXPO_PUBLIC_REVIEW_OFF!,
          process.env.EXPO_PUBLIC_CANCEL_OFF!,
        );
        break;

      case 4:
        await onCheckFilingStatus(
          process.env.EXPO_PUBLIC_APPROVAL_LV!,
          process.env.EXPO_PUBLIC_REVIEW_LV!,
          process.env.EXPO_PUBLIC_CANCEL_LV!,
        );
        break;

      case 5:
        await onCheckFilingStatus(
          process.env.EXPO_PUBLIC_APPROVAL_ML!,
          process.env.EXPO_PUBLIC_REVIEW_ML!,
          process.env.EXPO_PUBLIC_CANCEL_ML!,
        );
        break;

      default:
        url = '';
        break;
    }
    return url;
  },

  singleApprovals: async (panel: number, filingId: number) => {
    let apiEndpoint: string | undefined;

    switch (panel) {
      case FilingPanel.COS:
        apiEndpoint = process.env.EXPO_PUBLIC_APPROVAL_COS;
        break;
      case FilingPanel.OB:
        apiEndpoint = process.env.EXPO_PUBLIC_APPROVAL_OB;
        break;
      case FilingPanel.OT:
        apiEndpoint = process.env.EXPO_PUBLIC_APPROVAL_OT;
        break;
      case FilingPanel.OFF:
        apiEndpoint = process.env.EXPO_PUBLIC_APPROVAL_OFF;
        break;
      case FilingPanel.LV:
        apiEndpoint = process.env.EXPO_PUBLIC_APPROVAL_LV;
        break;
      case FilingPanel.ML:
        apiEndpoint = process.env.EXPO_PUBLIC_APPROVAL_ML;
        break;
      default:
        throw new Error('Invalid panel value');
    }
    return `${apiEndpoint}`;
  },

  singleReviews: async (panel: number, filingId: number) => {
    let apiEndpoint: string | undefined;

    switch (panel) {
      case FilingPanel.COS:
        apiEndpoint = process.env.EXPO_PUBLIC_REVIEW_COS;
        break;
      case FilingPanel.OB:
        apiEndpoint = process.env.EXPO_PUBLIC_REVIEW_OB;
        break;
      case FilingPanel.OT:
        apiEndpoint = process.env.EXPO_PUBLIC_REVIEW_OT;
        break;
      case FilingPanel.OFF:
        apiEndpoint = process.env.EXPO_PUBLIC_REVIEW_OFF;
        break;
      case FilingPanel.LV:
        apiEndpoint = process.env.EXPO_PUBLIC_REVIEW_LV;
        break;
      case FilingPanel.ML:
        apiEndpoint = process.env.EXPO_PUBLIC_REVIEW_ML;
        break;
      default:
        throw new Error('Invalid panel value');
    }

    return `${apiEndpoint}`;
  },

  panelApprovalsReviewURL: async (panel: number) => {
    let url: string | undefined = '';

    switch (panel) {
      case 0:
        url = process.env.EXPO_PUBLIC_SINGLEREVIEW_COS!;
        break;

      case 1:
        url = process.env.EXPO_PUBLIC_REVIEW_OB!;
        break;

      case 2:
        url = process.env.EXPO_PUBLIC_REVIEW_OT!;
        break;

      case 3:
        url = process.env.EXPO_PUBLIC_REVIEW_OFF!;
        break;

      case 4:
        url = process.env.EXPO_PUBLIC_REVIEW_LV!;
        break;

      case 5:
        url = process.env.EXPO_PUBLIC_REVIEW_ML!;
        break;

      default:
        url = undefined;
        break;
    }

    return url;
  },
  // For New Request Form Data
  panelNewRequestFormData: async (panel: number, parsed: unknown) => {
    let dataSet: Array<unknown> = [];

    switch (panel) {
      case onPanel.COS:
        dataSet = ARRAY.formDataCOS(parsed as StateCOSRequest);
        break;

      case onPanel.OB:
        dataSet = ARRAY.formDataOB(parsed as StateOBRequest);
        break;

      case onPanel.OT:
        dataSet = ARRAY.formDataOTAndOFF(parsed as StateOTOFFRequest);
        break;

      case onPanel.OFF:
        dataSet = ARRAY.formDataOTAndOFF(parsed as StateOTOFFRequest);
        break;

      case onPanel.LV:
        dataSet = ARRAY.formDataLV(parsed as StateLVRequest);
        break;

      case onPanel.ML:
        dataSet = ARRAY.formDataML(parsed as StateMLRequest);

        break;

      default:
        break;
    }

    return dataSet;
  },

  panelUpdateRequestFormData: (panel: number, params: unknown) => {
    let dataFiling: unknown;
    const data = params as SchemaRequestApplications;
    const ReasonAndFiling = ARRAY.ReasonAndFileAttachment(data);

    switch (panel) {
      case onPanel.COS:
        dataFiling = { ...(ARRAY.formDataFilingCOS(data) as StateCOSRequest), ...ReasonAndFiling };
        break;

      case onPanel.OB:
        dataFiling = { ...(ARRAY.formDataFilingOB(data) as StateOBRequest), ...ReasonAndFiling };
        break;

      case onPanel.OT:
        dataFiling = { ...(ARRAY.formDataFilingOTAndOFF(data) as StateOTOFFRequest), ...ReasonAndFiling };
        break;

      case onPanel.OFF:
        dataFiling = { ...(ARRAY.formDataFilingOTAndOFF(data) as StateOTOFFRequest), ...ReasonAndFiling };
        break;

      case onPanel.LV:
        dataFiling = { ...(ARRAY.formDataFilingLV(data) as StateLVRequest), ...ReasonAndFiling };
        break;

      case onPanel.ML:
        dataFiling = { ...(ARRAY.formDataFilingML(data) as StateMLRequest), ...ReasonAndFiling };
        break;

      default:
        break;
    }

    return dataFiling;
  },

  panelNewRequestURL: (panel: number, reqAction?: number, data?: SchemaRequestApplications) => {
    let url: string | undefined = '';
    let getId: string =
      reqAction !== onReqAction.Update
        ? `/${data?.filing?.id}/${STRINGS.cancel}`
        : `/${data?.filing?.id}/${STRINGS.update}`;

    const envUrl = (env: string) => {
      return (url = reqAction === undefined ? env : reqAction !== onReqAction.New ? env + getId : env);
    };

    switch (panel) {
      case onPanel.COS:
        envUrl(process.env.EXPO_PUBLIC_REQUEST_COS!);
        break;

      case onPanel.OB:
        envUrl(process.env.EXPO_PUBLIC_REQUEST_OB!);
        break;

      case onPanel.OT:
        envUrl(process.env.EXPO_PUBLIC_REQUEST_OT!);
        break;

      case onPanel.OFF:
        envUrl(process.env.EXPO_PUBLIC_REQUEST_OFF!);
        break;

      case onPanel.LV:
        envUrl(process.env.EXPO_PUBLIC_REQUEST_LV!);
        break;

      case onPanel.ML:
        envUrl(process.env.EXPO_PUBLIC_REQUEST_ML!);
        break;

      case onPanel.CTO:
        envUrl(process.env.EXPO_PUBLIC_REQUEST_ML!);
        break;

      default:
        url = undefined;
        break;
    }
    return url;
  },

  panelApprovalsURL: (panel: number, reqAction?: number, data?: SchemaRequestApplications) => {
    let url: string | undefined = '';
    let getId: string =
      reqAction !== onReqAction.Update
        ? `/${data?.filing?.id}/${STRINGS.cancel}`
        : `/${data?.filing?.id}/${STRINGS.update}`;

    const envUrl = (env: string) => {
      return (url = reqAction === undefined ? env : reqAction !== onReqAction.New ? env + getId : env);
    };

    switch (panel) {
      case onPanel.COS:
        envUrl(process.env.EXPO_PUBLIC_APPROVAL_COS!);
        break;

      case onPanel.OB:
        envUrl(process.env.EXPO_PUBLIC_APPROVAL_OB!);
        break;

      case onPanel.OT:
        envUrl(process.env.EXPO_PUBLIC_APPROVAL_OT!);
        break;

      case onPanel.OFF:
        envUrl(process.env.EXPO_PUBLIC_APPROVAL_OFF!);
        break;

      case onPanel.LV:
        envUrl(process.env.EXPO_PUBLIC_APPROVAL_LV!);
        break;

      case onPanel.ML:
        envUrl(process.env.EXPO_PUBLIC_APPROVAL_ML!);
        break;

      default:
        url = undefined;
        break;
    }

    return url;
  },

  panelReviewalsURL: (panel: number, reqAction?: number, data?: SchemaRequestApplications) => {
    let url: string | undefined = '';
    let getId: string =
      reqAction !== onReqAction.Update
        ? `/${data?.filing?.id}/${STRINGS.cancel}`
        : `/${data?.filing?.id}/${STRINGS.update}`;

    const envUrl = (env: string) => {
      return (url = reqAction === undefined ? env : reqAction !== onReqAction.New ? env + getId : env);
    };

    switch (panel) {
      case onPanel.COS:
        envUrl(process.env.EXPO_PUBLIC_REVIEW_COS!);
        break;

      case onPanel.OB:
        envUrl(process.env.EXPO_PUBLIC_REVIEW_OB!);
        break;

      case onPanel.OT:
        envUrl(process.env.EXPO_PUBLIC_REVIEW_OT!);
        break;

      case onPanel.OFF:
        envUrl(process.env.EXPO_PUBLIC_REVIEW_OFF!);
        break;

      case onPanel.LV:
        envUrl(process.env.EXPO_PUBLIC_REVIEW_LV!);
        break;

      case onPanel.ML:
        envUrl(process.env.EXPO_PUBLIC_REVIEW_ML!);
        break;

      default:
        url = undefined;
        break;
    }

    return url;
  },

  interceptors: () => {
    axios.interceptors.request.use(async function (config) {
      config.headers.Authorization = `Bearer ${JSON.parse((await AsyncStorage.getItem('AT')) || '{}')}`;
      config.headers.Accept = 'text/plain';
      return config;
    });
  },

  connect: async (method: string, type: string, url: string, data?: FormData | unknown, cookie?: string) => {
    return await axios({
      method: method,
      url: url,
      headers: {
        'Content-Type': type,
        Cookie: cookie ? cookie : undefined,
      },
      timeout: 10000,
      data: data ? data : undefined,
    });
  },

  connectAll: async (
    request: Array<{ method: string; type: string; url: string; data?: unknown; cookie?: string }>,
  ) => {
    return await axios.all(
      request.map((item: { method: string; type: string; url: string; data?: unknown; cookie?: string }) =>
        axios({
          method: item.method,
          url: item.url,
          headers: {
            'Content-Type': item.type,
            Cookie: item.cookie ? item.cookie : undefined,
          },
          timeout: 10000,
          data: item.data ? item.data : undefined,
        }),
      ),
    );
  },

  requestError: (code: number, parsed: string, exceptionErr: string) => {
    return exceptionErr ? exceptionErr.split(': ')[1] : parsed ? parsed : code === 0 ? ERRORS.connFailed : ERRORS.error;
  },

  handleErrorException: (res: string | undefined, val: string) => {
    return (
      res!.split('\n').find((line: string) => line.includes(`HRDotNet.Shared.ErrorHandling.Exception.${val}`)) ??
      ('' as string)
    );
  },

  checkBatchApprovalsStatus: async (data: SchemaApprovalsManager) => {
    const { filings } = data;

    let errors: Array<TypeApprovalPromptItem> = [];
    let success: Array<TypeApprovalPromptItem> = [];

    await Promise.all(
      filings.map(async (filing: any) => {
        if (filing.errors && filing.errors.length > 0) {
          errors.push({
            documentNo: filing.documentNo,
            message: filing.errors[0]?.message,
          });
        } else {
          success.push({
            documentNo: filing.documentNo,
          });
        }
      }),
    );

    return { errors, success };
  },

  catchErrors: async (error: TypeError) => {
    const code = error.request.status || 0;
    const response = error.request._response;
    const parsed: string = error.request._response!.includes('{')
      ? JSON.parse(error.request._response!)?.title
      : undefined;

    return { code, response, parsed };
  },

  catchEvent: async ({ error, onRefresh, setHandle, toastSet, toastMessage, moreHandle }: UtilsCatchEvent) => {
    const errors = await UtilsFetch.catchErrors(error);

    if (errors.code === StatusCode.Unauthorized) {
      onRefresh && onRefresh();
    } else {
      setHandle &&
        setHandle({
          isToast: {
            show: true,
            set: toastSet || 0,
            message: toastMessage || '',
          },
        });

      moreHandle && moreHandle();
    }
  },
};
