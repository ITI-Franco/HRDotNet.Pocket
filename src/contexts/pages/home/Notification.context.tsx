import React from 'react';
import { NotificationStates, ValuesNotification } from 'src/types/Notification';

type NotificationContext = {
  state: NotificationStates;
  setState: React.Dispatch<Partial<NotificationStates>>;
  fetchNotifications: () => void;
};

export const Context = React.createContext<NotificationContext>({
  state: ValuesNotification.State,
  setState: () => { },
  fetchNotifications: () => { },
});

export const CtxNotification = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useReducer(
    (state: NotificationStates, newState: Partial<NotificationStates>) => ({ ...state, ...newState }),
    ValuesNotification.State,
  );


  const fetchNotifications = async () => {
    // simulating api calls
    setState({ isFetching: true })

    const notifications = [
      {
        isRead: false,
        name: 'Approvals Update',
        date: '2022-09-020',
        message: 'You have new pending applications for approvals.',
        type: 'approvals_update',
        tags: ['Change of Schedule', 'Official Work', 'Overtime', 'Leave']
      },
      {
        isRead: false,
        name: 'Request Update',
        date: '2022-01-02',
        message: 'Your Emergency Leave Doc. No. LV223092216 has a new status. Please check the Request Page for more details.',
        type: 'request_update',
        tags: ['Change of Schedule', 'Official Work', ]
      },
      {
        isRead: false,
        name: 'Advisory',
        date: '2022-01-03',
        message: 'Intellismart, Stork Supersam, and Oppulence, which were under Intellismart Technology Inc, now have a tiktok accounts!',
        type: 'advisory',
        tags: ['Change of Schedule', ]
      },
      {
        isRead: true,
        name: 'Request Update',
        date: '2022-01-03',
        message: 'Your Sick leave Doc. No.LV2232209162 has a new status',
        type: 'request_update',
        tags: []
      },
      {
        isRead: true,
        name: 'Advisory',
        date: '2022-01-03',
        message: 'You have a new message!',
        type: 'advisory',
        tags: ['Change of Schedule', 'Official Work', 'Overtime', 'Leave']
      },
    ];
    setTimeout(() => {
      setState({ notifications: notifications, isFetching: false });
    }, 500);
  };


  return (
    <Context.Provider
      value={{
        state,
        setState,
        fetchNotifications
      }}
    >
      {children}
    </Context.Provider>
  );
};

