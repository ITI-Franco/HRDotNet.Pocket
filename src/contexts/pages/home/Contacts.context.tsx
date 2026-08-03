import React from 'react';
import { ContactsStates, ValuesContacts } from 'src/types/Contacts';

type ContactsContext = {
  state: ContactsStates;
  setState: React.Dispatch<Partial<ContactsStates>>;
  search: () => void;
  fetchContacts: () => void;
};

export const Context = React.createContext<ContactsContext>({
  state: ValuesContacts.State,
  setState: () => { },
  search: () => { },
  fetchContacts: () => { },
});

export const CtxContacts = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useReducer(
    (state: ContactsStates, newState: Partial<ContactsStates>) => ({ ...state, ...newState }),
    ValuesContacts.State,
  );

  const search = () => {

  }

  const fetchContacts = async () => {
    // simulating api calls
    setState({ isFetching: true })

    const contacts = [
      {
        id: 1,
        name: 'Alejandro Alcanar',
        position: 'Customer Service Specialist',
        picture: 'https://via.placeholder.com/50',
        email: 'alejandro.alcanar@example.com',
        contact: '+1-555-0101'
      },
      {
        id: 2,
        name: 'Brian Noel Cruz',
        position: 'Training Specialist',
        picture: 'https://via.placeholder.com/50',
        email: 'brian.cruz@example.com',
        contact: '+1-555-0102'
      },
      {
        id: 3,
        name: 'Christine Joy Reyes',
        position: 'Quality Assurance Specialist',
        picture: 'https://via.placeholder.com/50',
        email: 'christine.reyes@example.com',
        contact: '+1-555-0103'
      },
      {
        id: 4,
        name: 'Christine Anne Delgado',
        position: 'QA Manager',
        picture: 'https://via.placeholder.com/50',
        email: 'christine.delgado@example.com',
        contact: '+1-555-0104'
      },
      {
        id: 5,
        name: 'Dave Andrew Carandang',
        position: 'Messenger',
        picture: 'https://via.placeholder.com/50',
        email: 'dave.carandang@example.com',
        contact: '+1-555-0105'
      },
      {
        id: 6,
        name: 'Henry Balani Valerio',
        position: 'Quality Assurance Specialist',
        picture: 'https://via.placeholder.com/50',
        email: 'henry.valerio@example.com',
        contact: '+1-555-0106'
      },
      {
        id: 7,
        name: 'Ian Miguel Cartalla',
        position: 'Administrative Assistant',
        picture: 'https://via.placeholder.com/50',
        email: 'ian.cartalla@example.com',
        contact: '+1-555-0107'
      },
    ];


    let filteredContacts = contacts;
    let search = state.search
    if (search !== "") {
      filteredContacts = contacts.filter((contact) => {
        const name = contact.name.toLowerCase();
        const position = contact.position.toLowerCase();
        const searchQuery = search.toLowerCase();
        return name.includes(searchQuery) || position.includes(searchQuery);
      });
    }

    setTimeout(() => {
      setState({ contacts: filteredContacts, isFetching: false });
    }, 500);
  };


  return (
    <Context.Provider
      value={{
        state,
        setState,
        search,
        fetchContacts
      }}
    >
      {children}
    </Context.Provider>
  );
};

