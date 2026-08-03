/**
 * @project      HRDotNet-Mobile
 * @description  Proflie contains the types, interface, const and Values for Personal and Payslip Item
 * @author       Hersvin Fred Labastida, Jessie Cuerda
 * @date_created 10-03-2024
 * @modified     10-22-2024
 */

import { ValuesSchemaPersonal } from 'src/constants/Values';
import { TypeObjectValues, TypeSchemaPersonal } from './Types';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

//--- Personal States
export type PersonalStates = {
  bottomSheetOption: boolean;
  data: TypeSchemaPersonal;
  details: Array<TypeObjectValues>;
  uri: string;
  isUpdatingProfile: boolean;
};

//--- Profile Handles
export type ProfileHandle = {
  isLoading: boolean;
  isLoadingPayslip: boolean;
  isLoadingPersonal: boolean;
  isLoadMoreHistory: boolean;
  isLoadingPayslipDetails: boolean;
  isModalVisible: boolean;
};
//--- Payslip States
export type PaySlipStates = {
  data: PayslipData;
  item: PayslipDetailsItems;
  filterText: string;
  page: number;
  pageSize: number;
  totalEarning: number;
  philHealth: string;
  sss: string;
  totalLoans: string;
  totalDeductions: string;
  totalOvertime: string;
  totalAllowances: string;
  totalEarnings: string;
};

export type PayslipData = {
  items: PayslipItems[];
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type PayslipDetailsItems = {
  id: number;
  guid: string;
  payrollId: number;
  timekeeping: Timekeeping;
  employees: Employees[];
  dateGenerated: string;
};

type Timekeeping = {
  id: number;
  documentNo: string;
  cutOff: CutOff;
};

type Employees = {
  id: number;
  code: string;
  name: string;
  positionLevel: LookUpResponse;
  basicPay: number;
  absence: number;
  undertime: number;
  tardy: number;
  overtime: number;
  ndndot: number;
  holiday: number;
  serviceCharge: number;
  otherEarnings: number;
  grossPay: number;
  ssses: number;
  phicee: number;
  hdmfee: number;
  wispee: number;
  tax: number;
  sssLoan: number;
  hdmfLoan: number;
  otherDeduction: number;
  netPay: number;
  payrollDetails: PayrollDetails[];
  timekeepingDetails: TimekeepingDetails[];
};

type PayrollDetails = {
  id: number;
  payrollId: number;
  payrollItem: LookUpResponse;
  description: string;
  workDate: null;
  amount: number;
  rate: number;
  hours: number;
  isDeducted: boolean;
};

type TimekeepingDetails = {
  id: number;
  timekeepingId: number;
  schedule: LookUpResponse;
  workDate: string;
  actualTimeIn: string;
  actualTimeOut: string;
  leave: Leave;
  deduction: Deduction;
  dayType: DayType;
  dateProcessed: string;
  isProcessed: boolean;
};

type Leave = {
  leave: string;
  count: number;
};

type Deduction = {
  absences: number;
  undertime: number;
  tardy: number;
};

type DayType = {
  type: string;
  hourType: HourType;
};

type HourType = {
  regular: number;
  overtime: number;
  nightDifferential: number;
  nightDifferentialOvertime: number;
};

type CutOff = {
  id: number;
  companyId: number;
  branchId: number;
  countryId: number;
  name: string;
  dateRange: DateRange;
  period: LookUpResponse;
  paymentFrequency: string;
  datePayoutSchedule: string;
};

type DateRange = {
  dateFrom: string;
  dateTime: string;
};

type LookUpResponse = {
  id: number;
  code: string;
  name: string;
};

//--- Const Initial States for Payslip
const LookUpResponseI: LookUpResponse = {
  id: 0,
  code: '',
  name: '',
};

const DateRangeI: DateRange = {
  dateFrom: '',
  dateTime: '',
};

const CutOffI: CutOff = {
  id: 0,
  companyId: 0,
  branchId: 0,
  countryId: 0,
  name: '',
  dateRange: DateRangeI,
  period: LookUpResponseI,
  paymentFrequency: '',
  datePayoutSchedule: '',
};

const HourTypeI: HourType = {
  regular: 0,
  overtime: 0,
  nightDifferential: 0,
  nightDifferentialOvertime: 0,
};

const DayTypeI: DayType = {
  type: '',
  hourType: HourTypeI,
};

const DeductionI: Deduction = {
  absences: 0,
  undertime: 0,
  tardy: 0,
};

const LeaveI: Leave = {
  leave: '',
  count: 0,
};

const TimekeepingDetailsI: TimekeepingDetails = {
  id: 0,
  timekeepingId: 0,
  schedule: LookUpResponseI,
  workDate: '',
  actualTimeIn: '',
  actualTimeOut: '',
  leave: LeaveI,
  deduction: DeductionI,
  dayType: DayTypeI,
  dateProcessed: '',
  isProcessed: true,
};

const PayrollDetailsI: PayrollDetails = {
  id: 0,
  payrollId: 0,
  payrollItem: LookUpResponseI,
  description: '',
  workDate: null,
  amount: 0,
  rate: 0,
  hours: 0,
  isDeducted: false,
};

const EmployeesI: Employees = {
  id: 0,
  code: '',
  name: '',
  positionLevel: LookUpResponseI,
  basicPay: 0,
  absence: 0,
  undertime: 0,
  tardy: 0,
  overtime: 0,
  ndndot: 0,
  holiday: 0,
  serviceCharge: 0,
  otherEarnings: 0,
  grossPay: 0,
  ssses: 0,
  phicee: 0,
  hdmfee: 0,
  wispee: 0,
  tax: 0,
  sssLoan: 0,
  hdmfLoan: 0,
  otherDeduction: 0,
  netPay: 0,
  payrollDetails: [PayrollDetailsI],
  timekeepingDetails: [TimekeepingDetailsI],
};

const TimekeepingI: Timekeeping = {
  id: 0,
  documentNo: '',
  cutOff: CutOffI,
};

const PayslipDetailsItemsI: PayslipDetailsItems = {
  id: 0,
  guid: '',
  payrollId: 0,
  timekeeping: TimekeepingI,
  employees: [EmployeesI],
  dateGenerated: '',
};

const PayslipDataI: PayslipData = {
  items: [PayslipDetailsItemsI],
  page: 0,
  pageSize: 0,
  pageCount: 0,
  total: 0,
};

//--- Values for States and Handles
export const ValuesProfile = {
  StatePersonal: {
    data: ValuesSchemaPersonal,
    details: [{ title: '', value: '' }],
    bottomSheetOption: false,
    uri: '',
    isUpdatingProfile: false,
  } satisfies PersonalStates,

  StatePayslip: {
    data: PayslipDataI,
    item: PayslipDetailsItemsI,
    filterText: '',
    page: 1,
    pageSize: 10,
    totalEarning: 0,
    philHealth: '',
    sss: '',
    totalLoans: '',
    totalDeductions: '',
    totalOvertime: '',
    totalAllowances: '',
    totalEarnings: '',
  } satisfies PaySlipStates,

  Handle: {
    isLoading: false,
    isLoadingPayslip: false,
    isLoadingPersonal: true,
    isLoadMoreHistory: false,
    isLoadingPayslipDetails: false,
    isModalVisible: false,
  } satisfies ProfileHandle,
};

export type PayslipItems = {
  id: number;
  payrollId: number;
  timekeeping: Timekeeping;
  employees: Employees[];
  dateGenerated: string;
};

//--- Other Types
export type ProfileTabStack = {
  navigation: StackNavigationProp<ParamListBase>;
};

export type PayslipStack = {
  navigation: StackNavigationProp<ParamListBase>;
  item: PayslipData;
};

export type PayHistoryStack = {
  onHandleMore: () => void;
  data: PayslipItems;
};

export type PayslipDetailsStack = {
  item?: PayslipData;
};
