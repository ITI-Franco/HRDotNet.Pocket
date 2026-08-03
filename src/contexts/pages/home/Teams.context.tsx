// HRDotNet-Mobile
// Developed by: Hersvin Fred De La Cruz Labastida, Jessie Cuerda

import React from 'react';
import { ARRAY } from 'src/constants/Array';
import * as Animatable from 'react-native-animatable';
import { DateArray, TeamMember, TeamsHandles, TeamsStates, ValuesTeams } from 'src/types/Teams';
import { useFetch } from 'src/hooks/useFetch';

type TeamsContext = {
  state: TeamsStates;
  setState: React.Dispatch<Partial<TeamsStates>>;
  handle: TeamsHandles;
  setHandle: React.Dispatch<Partial<TeamsHandles>>;

  showMemberDetails: (date: string) => void;
  onHandleNextWeek?: () => void;
  onHandlePrevWeek?: () => void;
  animateWeekView: (direction: 'left' | 'right') => void;
};

export const Context = React.createContext<TeamsContext>({
  state: ValuesTeams.State,
  setState: () => {},
  handle: ValuesTeams.Handle,
  setHandle: () => {},

  showMemberDetails: () => {},
  onHandleNextWeek: () => {},
  onHandlePrevWeek: () => {},
  animateWeekView: () => {},
});

export const CtxTeams = ({ children }: { children: React.ReactNode }) => {
  const teams = ARRAY.teams;
  const weekViewRef = React.createRef<Animatable.View>();

  const [state, setState] = React.useReducer(
    (state: TeamsStates, newState: Partial<TeamsStates>) => ({ ...state, ...newState }),
    ValuesTeams.State,
  );

  const [handle, setHandle] = React.useReducer(
    (state: TeamsHandles, newState: Partial<TeamsHandles>) => ({ ...state, ...newState }),
    ValuesTeams.Handle,
  );

  // -- for team's information fetching and mapping
  React.useEffect(() => {
    (async () => {
      await useFetch.TeamMembers(state, setState);
      const teamData = state.teamsData.map((team) =>  state.teamsData);
      setState({ 
        teamMembers: teamData as unknown as TeamMember[],
        count: state.teamsData.length || 0
       });
      setTimeout(() => {
        setHandle({ isLoading: state.count === 0 ? false : !teamData });
      }, 500);
    })();
  }, [state.data, handle.isLoading]);

  const showMemberDetails = (date: string) => {
    setState({
      data: date,
    });
  };

  const animateWeekView = (direction: 'left' | 'right') => {
    const animation = direction === 'left' ? 'slideInLeft' : 'slideInRight';
    weekViewRef.current?.animate(animation, 200);
  };

  return (
    <Context.Provider
      value={{
        state,
        setState,
        handle,
        setHandle,

        showMemberDetails,
        animateWeekView,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const getCurrentWeek = (): DateArray => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const startDate = new Date(currentDate.getTime() - currentDay * 24 * 60 * 60 * 1000);
  // const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    weekDates.push(date);
  }

  return weekDates;
};

export const getPreviousWeek = (currentWeek: DateArray): DateArray => {
  const startDate = currentWeek[0];
  // const endDate = currentWeek[6];
  const previousStartDate = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  // const previousEndDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  const previousWeekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(previousStartDate.getTime() + i * 24 * 60 * 60 * 1000);
    previousWeekDates.push(date);
  }

  return previousWeekDates;
};

export const getNextWeek = (currentWeek: DateArray): DateArray => {
  const startDate = currentWeek[0];
  // const endDate = currentWeek[6];
  const nextStartDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  // const nextEndDate = new Date(endDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const nextWeekDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(nextStartDate.getTime() + i * 24 * 60 * 60 * 1000);
    nextWeekDates.push(date);
  }

  return nextWeekDates;
};
