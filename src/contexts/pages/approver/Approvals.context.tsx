// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { createContext, useReducer } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ValuesApprovals } from 'src/constants/Values';
import {
  ParamsRequestApplication,
  StateApplications,
  TypeHandle,
  TypeNavStack,
  SchemaRequestApplications,
} from 'src/types/Types';
import { useFetch } from 'src/hooks/useFetch';

type TypeContext = {
  params: ParamsRequestApplication | undefined;
  state: StateApplications;
  setState: React.Dispatch<Partial<StateApplications>>;
  handle: TypeHandle;
  setHandle: React.Dispatch<Partial<TypeHandle>>;

  onHandleCheckbox: (data: SchemaRequestApplications, value: boolean) => void;
  onHandleSelectAll: (value?: boolean) => void;
  onHandleApprovals: (action: number) => void;
  onHandleClosePrompt: () => void;
  onHandleCancelPrompt: () => void;
  onHandleApprovePrompt: () => void;
  onHandlePress: (index: number) => void;
  onHandleRefreshControl: () => void;
  onHandleSetReachedEnd: () => void;
  onHandleEffectI: () => void;
  onHandleEffectII: () => void;
  onHandleEffectIII: () => void;
  onHandleEffectIV: () => void;
  ApprovalCount: () => void;
};

export const Context = createContext<TypeContext>({
  params: undefined,
  state: ValuesApprovals.State,
  setState: () => {},
  handle: ValuesApprovals.Handle,
  setHandle: () => {},

  onHandleCheckbox: () => {},
  onHandleSelectAll: () => {},
  onHandleApprovals: () => {},
  onHandleClosePrompt: () => {},
  onHandleCancelPrompt: () => {},
  onHandleApprovePrompt: () => {},
  onHandlePress: () => {},
  onHandleRefreshControl: () => {},
  onHandleSetReachedEnd: () => {},
  onHandleEffectI: () => {},
  onHandleEffectII: () => {},
  onHandleEffectIII: () => {},
  onHandleEffectIV: () => {},
  ApprovalCount: () => {},
});

export const CtxApprovals = ({ children }: { children: React.ReactNode }) => {
  const navigation: TypeNavStack['navigation'] = useNavigation();
  const params = useRoute().params as ParamsRequestApplication;

  const [state, setState] = useReducer(
    (state: StateApplications, newState: Partial<StateApplications>) => ({ ...state, ...newState }),
    ValuesApprovals.State,
  );

  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesApprovals.Handle,
  );

  const onHandleCheckbox = async (data: SchemaRequestApplications, value: boolean) => {
    const newData = state.data.map((item) =>
      item.filing.id === data.filing.id ? { ...item, isChecked: value } : item,
    );
    const checkedCount = newData.reduce((acc, item) => acc + (item.isChecked ? 1 : 0), 0);

    setState({
      count: checkedCount,
      data: newData,
    });
  };

  const onHandleSelectAll = (value?: boolean) => {
    setState({
      count: value ? state.data.length : 0,
      data: state.data.map((item) => ({
        ...item,
        isChecked: state.data.every((item) => item.isChecked) ? false : true,
      })),
    });
  };

  const onHandleApprovals = (action: number) => {
    setHandle({ ...handle, isVisible: true, isAction: action });
  };

  const onHandleCancelPrompt = () => {
    setHandle({ ...handle, isVisible: false });
  };

  const onHandleClosePrompt = () => {
    setHandle({ isSuccess: false });

    state.failedList!.length <= 0 || state.successList!.length > 0
      ? setHandle({ refreshing: !handle.refreshing, isLoading: true })
      : setState({
          successList: [],
          failedList: [],
        });
  };

  const onHandleApprovePrompt = async () => {
    setHandle({ isVisible: false });

    await useFetch.BatchApprovals(navigation, state, setState, handle, setHandle).then(() => {
      setHandle({ isLoading: false });
    });
  };

  const onHandlePress = (index: number) => {
    setHandle({ isLoading: true });
    setState({ selectedButton: index, data: [], urlQuery: `${process.env.EXPO_PUBLIC_APPROVALS_DEFAULTPARAMS}` });
  };

  const onHandleRefreshControl = () => {
    setHandle({ isLoading: true, refreshing: !handle.refreshing });
    setState({ page: 1 });
  };

  const onHandleSetReachedEnd = () => {
    setState({ page: state.page + 1 });
  };

  const onHandleEffectI = () => {
    setState({ count: 0 });
  };

  const onHandleEffectII = () => {
    setState({ urlQuery: `${process.env.EXPO_PUBLIC_REQUEST_DEFAULTPARAMS}` });
  };

  const onHandleEffectIII = () => {
    setState({ data: [], page: 1, count: 0 });
    setHandle({ isLoadMore: true, isWaiting: true });
  };

  const onHandleEffectIV = () => {
    const interval = setTimeout(async () => {
      await useFetch.Approvals(navigation, state, setState, handle, setHandle);
    }, 50);

    return () => clearTimeout(interval);
  };

  const ApprovalCount = () => {
    setState({
      count: state.totalCount ?? 0,
      data: [...state.data],
    });
  };

  return (
    <Context.Provider
      value={{
        params,
        state,
        setState,
        handle,
        setHandle,

        onHandleCheckbox,
        onHandleSelectAll,
        onHandleApprovals,
        onHandleClosePrompt,
        onHandleApprovePrompt,
        onHandleCancelPrompt,
        onHandlePress,
        onHandleRefreshControl,
        onHandleSetReachedEnd,
        onHandleEffectI,
        onHandleEffectII,
        onHandleEffectIII,
        onHandleEffectIV,
        ApprovalCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};
