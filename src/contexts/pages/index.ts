// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import { useContext } from 'react';
import { Context as CtxTimeOff } from './TimeOff.context';
import { Context as CtxTimesheet } from './Timesheet.context';
import { Context as CtxCamera } from './use/Camera.context';
import { Context as CtxApprovals } from './approver/Approvals.context';
import { Context as CtxReviewals } from './approver/Reviewals.context';
import { Context as CtxTeams } from './home/Teams.context';
import { Context as CtxContacts } from './home/Contacts.context';
import { Context as CtxLoanLedger } from './home/LoanLedger.context';
import { Context as CtxPendings } from './home/Pending.context';
import { Context as CtxNotification } from './home/Notification.context';

const useTimeOff = () => useContext(CtxTimeOff);
const useTimesheet = () => useContext(CtxTimesheet);
const useCamera = () => useContext(CtxCamera);
const useApprovals = () => useContext(CtxApprovals);
const useReviewals = () => useContext(CtxReviewals);
const useTeams = () => useContext(CtxTeams);
const useContacts = () => useContext(CtxContacts);
const useLoanLedger = () => useContext(CtxLoanLedger);
const usePending = () => useContext(CtxPendings);
const useNotification = () => useContext(CtxNotification);

export {
  useTimeOff,
  useTimesheet,
  useCamera,
  useApprovals,
  useReviewals,
  useTeams,
  useContacts,
  useLoanLedger,
  usePending,
  useNotification,
};
