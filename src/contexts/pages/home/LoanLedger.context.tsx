/**
 * @project      HRDotNet-Mobile
 * @description  Loan Ledger Context hold the states, handles and function for Loan Ledger
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 09-25-2024
 */

//-- React Component
import React from 'react';
//-- Project Component
import { LoanLedgerHandles, LoanLedgerState, ValuesLoanLedger } from 'src/types/LoanLedger';
import { useLoanFetch } from 'src/hooks/useLoanFetch';
import { UtilsFetch } from 'src/utils/UtilsFetch';
import { APIMethods, ContentTypes } from 'src/constants/Values';

//--- Types
type TypeContext = {
  state: LoanLedgerState;
  setState: React.Dispatch<Partial<LoanLedgerState>>;
  handle: LoanLedgerHandles;
  setHandle: React.Dispatch<Partial<LoanLedgerHandles>>;

  onDisplayLoanLedger: () => void;
  onDisplayLoanDetails: (document: string) => void;
  onHandleRefreshControl: () => void;
};

//--- Contexts
export const Context = React.createContext<TypeContext>({
  state: ValuesLoanLedger.State,
  setState: () => {},
  handle: ValuesLoanLedger.Handle,
  setHandle: () => {},

  onDisplayLoanLedger: () => {},
  onDisplayLoanDetails: () => {},
  onHandleRefreshControl: () => {},
});

export const CtxLoanLedger = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useReducer(
    (state: LoanLedgerState, newState: Partial<LoanLedgerState>) => ({ ...state, ...newState }),
    ValuesLoanLedger.State,
  );

  const [handle, setHandle] = React.useReducer(
    (handle: LoanLedgerHandles, newHandle: Partial<LoanLedgerHandles>) => ({ ...handle, ...newHandle }),
    ValuesLoanLedger.Handle,
  );

  const onDisplayLoanLedger = () => {
    const loanLedger = setTimeout(async () => {
      await useLoanFetch.LoansLedger(state, setState, handle, setHandle);
    }, 50);

    return () => clearTimeout(loanLedger);
  };

  const onHandleRefreshControl = () => {
    setHandle({ isRefreshing: !handle.isRefreshing });
  };

  const onDisplayLoanDetails = (document?: string) => {
    (async () => {
      try {
        const response = await UtilsFetch.connect(
          APIMethods.GET,
          ContentTypes.JSON,
          `${process.env.EXPO_PUBLIC_LOAN_LEDGER}/${document}/payment-history`,
        );
        setState({
          paymentHistory: response.data.filing.paymentHistory,
        });
        setHandle({ isLoadMore: false, isLoading: false });
      } catch (error) {
        console.error(error);
        setHandle({ isLoadMore: false, isLoading: false });
      }
    })();
  };

  return (
    <Context.Provider
      value={{
        state,
        setState,
        handle,
        setHandle,

        onDisplayLoanLedger,
        onHandleRefreshControl,
        onDisplayLoanDetails,
      }}
    >
      {children}
    </Context.Provider>
  );
};
