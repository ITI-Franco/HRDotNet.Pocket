import { DateTimeUtils } from 'src/utils/DateTimeUtils';

const today = new Date();
const formattedDate = DateTimeUtils.isoToDateSlash(today.toDateString());

export type ContactsStates = {
  search: string;
  refreshing: boolean,
  isFetching: boolean,
  contacts: contact[];
  selectectedContact: contact,
};

export interface contact {
  id: number,
  name: string,
  position: string,
  email: string,
  contact: string,
  picture: string,
}

export type Section   = {
  title: string;
  data: contact[];
};


export const ValuesContacts = {
  State: {
    search: '',
    contacts: [],
    isFetching: false,
    refreshing: false,
    selectectedContact: {
      id: 0,
      name: '',
      position: '',
      email: '',
      contact: '',
      picture: '',
    },
  } satisfies ContactsStates,

};