// HRDotNet-Mobile
// Developed by: Hersvin Fred De La Cruz Labastida, Jessie Cuerda

import { DateTimeUtils } from 'src/utils/DateTimeUtils';

const today = new Date();
const formattedDate = DateTimeUtils.isoToDateSlash(today.toDateString());

export type TeamsStates = {
  teamList: Array<string>;
  count: number;
  page: number;
  selectedDate: string;
  todayDate: string;
  search: string;

  data?: string;
  teamsData: Array<TeamSchema>;
  teamMembers: TeamMember[];

  selectedMember: TeamSchema;
  direction?: 'left' | 'right' | '';
  clickActive?: Array<Date>;
  today?: Array<Date>;
  currentWeek?: Array<Date> | undefined;
  teamDataArray: TeamSchema[];

  // getCurrentWeek
  startDate?: Array<Date>;
  endDate?: string;
  currentDay?: Array<Date>;
  currentDate?: Array<Date>;
  weekDates?: Array<string>;
  // getPreviousWeek
  prevStartDate?: Array<Date>;
  preEndDate?: string;
  previousStartDate?: Array<Date>;
  previousEndDate?: Array<Date>;
  previousWeeksDates?: Array<string>;
  // getNextWeek
  nexStartDate?: Array<Date>;
  nexEndDate?: string;
  nextStartDate?: Array<Date>;
  nextPreviousDate?: Array<Date>;
  nextWeekDates?: Array<string>;

  firsDate?: string | any;
  month: string;
  year: number;
  members:Array<TeamSchema>;
  name: string;
  date: string;
  branchId: number;
  companyId: number;
  memberId: number;
  department: string;
  departmentId: string;
  position: {
    name: string;
  };
  branch: number;
  company: number;
  member: number;
  dateFrom: string,
  dateTo: string,
};

export type TeamsHandles = {
  isLoading: boolean;
  isDisabled: boolean;
  isShowed: boolean;
  isClosed: boolean;
  isSelected: boolean;
  isSwiping: boolean;
  isWaiting: boolean;
};

// @ts-ignore
export const ValuesTeams = {
  State: {
    teamList: [],
    count: 0,
    page: 0,
    selectedDate: '',
    todayDate: today.toDateString(),
    search: '',
    data: formattedDate,
    teamMembers: [],
    direction: '',
    currentWeek: [] as DateArray,
    firsDate: '',
    month: 'January',
    year: 0,
    teamsData: [],
    teamDataArray: [],
    members: [],
    name: '',
    date: '',
    branchId: 0,
    branch: 0,
    companyId: 0,
    memberId: 0,
    department: '',
    departmentId: '',
    company: 0,
    member: 0,
    position:{
      name: '',
    },
    dateFrom: '',
    dateTo: '',
    selectedMember: {
      name: '',
      position: {
        name: '',
      },
      status: 'Present',
      photo: '',
      date: '',
      id: 0, 
      branch: {
        id: 0,
      }, 
      memberId:0 , 
      company: {
        id: 0,
      },
      department:{
        name: '',
        id: 0,
      },
    },
    
  } satisfies TeamsStates,

  Handle: {
    isLoading: true,
    isDisabled: false,
    isShowed: true,
    isSelected: false,
    isClosed: false,
    isSwiping: false,
    isWaiting: false,
  } satisfies TeamsHandles,
};

export interface DateArray extends Array<Date> {
  [index: number]: Date;
}

export interface MonthYear {
  onGet: (monthValue: string, yearValue: number) => void;
}

export interface InitialDate {
  initialDate: string;
}

export type Team = {
  date: string;
  items: TeamMember[];
};

export type TeamMember = {
  data: TeamSchema[]
};

export type TeamSchema = {
  memberId: number;
  
  company: {
    id: number;
  };

  branch: {
    id: number;
  };

  department: {
    name: string,
    id: number,
  }

  // calendarDate: {
  //   date: string,
  //   schedule: {
  //     documentNo: number,
  //     dateTimeRange: {
  //       dateFrom: string,
  //       dateTo: string
  //     },
  //   },
  // },
  
  date: string;
  id: number,
  name: string;
  position: {
    name: string,
  };
  status: 'Present' | 'Absent';
  departmentId?: string;
  photo: string;
  // dateFrom: string,
  // dateTo: string
}