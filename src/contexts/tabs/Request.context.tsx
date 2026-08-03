// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import React, { createContext, useReducer } from 'react';
import { useNavigation } from '@react-navigation/native';

import { ValuesRequest } from 'src/constants/Values';
import { useFetch } from 'src/hooks/useFetch';
import { StateApplications, TypeHandle, TypeNavStack } from 'src/types/Types';

type TypeContext = {
  state: StateApplications;
  setState: React.Dispatch<Partial<StateApplications>>;
  handle: TypeHandle;
  setHandle: React.Dispatch<Partial<TypeHandle>>;

  onHandlePress: (index: number) => void;
  onHandleEffectI: () => void;
  onHandleEffectII: () => void;
  onHandleEffectIII: () => void;
};

export const Context = createContext<TypeContext>({
  state: ValuesRequest.State,
  setState: () => { },
  handle: ValuesRequest.Handle,
  setHandle: () => { },

  onHandlePress: () => { },
  onHandleEffectI: () => { },
  onHandleEffectII: () => { },
  onHandleEffectIII: () => { },
});

export const CtxRequest = ({ children }: { children: React.ReactNode }) => {
  const navigation: TypeNavStack['navigation'] = useNavigation();

  const [state, setState] = useReducer(
    (state: StateApplications, newState: Partial<StateApplications>) => ({ ...state, ...newState }),
    ValuesRequest.State,
  );

  const [handle, setHandle] = useReducer(
    (state: TypeHandle, newState: Partial<TypeHandle>) => ({ ...state, ...newState }),
    ValuesRequest.Handle,
  );

  const onHandlePress = (index: number) => {
    setHandle({ isLoading: true });
    setState({ data: [], selectedButton: index });
  };

  const onHandleEffectI = async () => {
    setState({ urlQuery: `${process.env.EXPO_PUBLIC_REQUEST_DEFAULTPARAMS}` });
  };

  const onHandleEffectII = async () => {
    setState({ data: [], page: 1 });
    setHandle({ isLoadMore: true, isWaiting: true });
  };

  const onHandleEffectIII = async () => {
    const interval = setTimeout(async () => {
      try {
        await useFetch.Request(navigation, state, setState, handle, setHandle);

      } catch (error) {
        console.error(error);

      } finally {
        setHandle({ isLoading: false, isWaiting: false });
      }
    }, 50);
    return () => clearTimeout(interval);
  };

  return (
    <Context.Provider
      value={{
        state,
        setState,
        handle,
        setHandle,

        onHandlePress,
        onHandleEffectI,
        onHandleEffectII,
        onHandleEffectIII,
      }}
    >
      {children}
    </Context.Provider>
  );
};
