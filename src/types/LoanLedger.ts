/**
 * @project      HRDotNet-Mobile
 * @description  Loan Ledger Context hold the states, handles and function for Loan Ledger
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 09-26-2024
 */

import React from 'react';

// Loan Ledger Types
export type LoanLedgerHandles = {
  isLoading: boolean;
  isRefreshing: boolean;
  isClicked: boolean;
  isLoadMore: boolean;
  isDetailsLoading: boolean;

  scrollViewRef?: React.PropsWithRef<any>;
};

export type LoanLedgerState = {
  data: LoanLedgerResponse;
  filterText: string;
  totalCount: number;
  statusCount: number;
  paymentHistory: PaymentHistory;
};

export type LoanLedgerResponse = {
  items: {
    id: number;
    code: string;
    name: string;
    companyId: number;
    branchId: number;
    departmentId: number;
    filing: {
      id: number;
      guid: string;
      loanClassification: {
        code: string;
        id: number;
        name: string;
      };
      loanSource: {
        id: number;
        name: string;
      };
      loanType: {
        id: number;
        name: string;
      };
      cycle: {
        id: number;
        name: string;
      };
      disbursedAmount: number;
      loanAmount: number;
      terms: number;
      perMonth: number;
      perCutOff: number;
      totalAmount: number;
      balance: number;
      dateGranted: string;
      dateFirstGranted: string;
      documentNo: string;
      existingDocument: {
        id: number;
        documentNo: string | null;
      };
      filingStatus: {
        id: number;
        name: string;
      };
      referenceNo: string;
      reason: string;
      description: string;
      dateTransaction: string;
      paymentHistory: {
        id: number;
        guid: string;
        referenceNo: string;
        description: string;
        dateTransaction: string;
        totalLoanAmount: number;
        balance: number;
        payment: number;
      };
      isActive: boolean;
    };
  }[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type PaymentHistory = {
  id: number;
  guid: string;
  referenceNo: string;
  description: string;
  dateTransaction: string;
  totalLoanAmount: number;
  balance: number;
  payment: number;
};

// Loan Ledger Const
export const ValuesLoanLedger = {
  State: {
    data: {
      items: [],
      page: 0,
      pageSize: 0,
      pageCount: 0,
      total: 0,
    },
    filterText: '',
    totalCount: 0,
    statusCount: 0,
    paymentHistory: {
      balance: 0,
      dateTransaction: '',
      description: '',
      guid: '',
      id: 0,
      payment: 0,
      referenceNo: '',
      totalLoanAmount: 0,
    },
  } satisfies LoanLedgerState,

  Handle: {
    isLoading: true,
    isRefreshing: false,
    isLoadMore: false,
    isClicked: false,
    isDetailsLoading: false,

    scrollViewRef: () => React.useRef(null),
  } satisfies LoanLedgerHandles,
};

// Loan Ledger Interfaces
export interface LoanLedgerInterface {
  code: string;
  name: string;
  companyId: number;
  branchId: number;
  departmentId: number;
  filing: {
    id: number;
    guid: string;
    loanClassification: {
      code: string;
      id: number;
      name: string;
    };
    loanSource: {
      id: number;
      name: string;
    };
    loanType: {
      id: number;
      name: string;
    };
    cycle: {
      id: number;
      name: string;
    };
    disbursedAmount: number;
    loanAmount: number;
    terms: number;
    perMonth: number;
    perCutOff: number;
    totalAmount: number;
    balance: number;
    dateGranted: string;
    dateFirstGranted: string;
    documentNo: string;
    existingDocument: {
      id: number;
      documentNo: string | null;
    };
    filingStatus: {
      id: number;
      name: string;
    };
    referenceNo: string;
    reason: string;
    description: string;
    dateTransaction: string; // or Date if you parse it
    paymentHistory: PaymentHistories[]; // Adjust if needed
    isActive: boolean;
  };
}

export interface PaymentHistories {
  id: number;
  guid: string;
  referenceNo: string;
  description: string;
  dateTransaction: string;
  totalLoanAmount: number;
  balance: number;
  payment: number;
}
