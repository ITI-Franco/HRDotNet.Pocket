/**
 * @project      HRDotNet-Mobile
 * @description  Loan Ledger Context hold the states, handles and function for Loan Ledger
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 09-27-2024
 * @date_updated
 */

//--- Modules
import { APIMethods, ContentTypes } from 'src/constants/Values';
import { LoanLedgerHandles, LoanLedgerResponse, LoanLedgerState } from 'src/types/LoanLedger';
import { StateHome } from 'src/types/Types';
import { UtilsFetch } from 'src/utils/UtilsFetch';

export const useLoanFetch = {
  LoansLedger: async (
    state: LoanLedgerState,
    setState: React.Dispatch<Partial<LoanLedgerState>>,
    handle: LoanLedgerHandles,
    setHandle: React.Dispatch<Partial<LoanLedgerHandles>>,
  ) => {
    setHandle({
      isLoading: true,
      isLoadMore: true,
    });

    await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, `${process.env.EXPO_PUBLIC_LOAN_LEDGER}?SortBy=%2BfilingStatus`)
      .then((response: { data: LoanLedgerResponse }) => {
        const status = response.data.items
          .filter((item: any) => item.filing.filingStatus.name === 'Approved')
          .map((item: any) => item.filing.loanType.name);

        setState({
          data: response.data,
          totalCount: response.data.items.length,
          statusCount: status.length,
        });
      })
      .catch(async () => {
        setHandle({
          isLoading: false,
        });
      })
      .finally(() => setHandle({ isLoading: false }));
  },

  LoansBadge: async (state: StateHome, setState: React.Dispatch<Partial<StateHome>>) => {
    await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, `${process.env.EXPO_PUBLIC_LOAN_LEDGER}`)
      .then((response: { data: LoanLedgerResponse }) => {
        const status = response.data.items
          .filter((item: any) => item.filing.filingStatus.name === 'Filed')
          .map((item: any) => item.filing.loanType.name);
        setState({
          loanCount: status.length,
        });
      })
      .catch(async (error: TypeError) => {})
      .finally(() => {});
  },

  PendingsBadge: async (state: StateHome, setState: React.Dispatch<Partial<StateHome>>) => {
    await UtilsFetch.connect(APIMethods.GET, ContentTypes.JSON, `${process.env.EXPO_PUBLIC_PENDING}`)
      .then((response: { data: any }) => {
        setState({
          approvalCount: response.data.totalCount,
        });
      })
      .catch(async (error: TypeError) => {})
      .finally(() => {});
  },
};
