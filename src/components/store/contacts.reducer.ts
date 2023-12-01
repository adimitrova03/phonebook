import { Action, createReducer, on } from '@ngrx/store';
import { addContact, deleteContact, editContact, searchContacts, setContacts } from './contacts.actions';
import { ContactModel } from '../../models/contact.model';

export const featureKey = 'createContactsStore';

export interface ContactsState {
    readonly contacts: ContactModel[];
    readonly initialCollection: ContactModel[];
}

export const initialState: ContactsState = {
    contacts: [],
    initialCollection: []
};

const reducer = createReducer(
  initialState,

  on(setContacts, (state, action) => {
    let test = [...action.contacts]
    test.sort((a, b) => a.fullName.localeCompare(b.fullName))

    return {
      ...state,
      contacts: test,
      initialCollection: test
    }
  }),

  on(searchContacts, (state, action) => {
    const filteredContacts = state.initialCollection.filter(item => item.fullName.toLowerCase().includes(action.query.toLowerCase())
     || item.mobile.includes(action.query) || item.home.includes(action.query))

    return {
        ...state,
        contacts: filteredContacts
    }
  }),

  on(deleteContact, (state, action) => {
    const newContacts = state.initialCollection.filter(item => item.id !== action.contactId);

    return {
        ...state,
        contacts: newContacts,
        initialCollection: newContacts
    }
  }),

  on(addContact, (state, action) => {
    const newContacts = [...state.initialCollection,
      {
        ...action.contact,
        id: Math.random().toString(),
        fullName: action.contact.firstName + ' ' + action.contact.lastName,
      }]
    
    return {
        ...state,   
        contacts: newContacts,
        initialCollection: newContacts
      }
  }),

  on(editContact, (state, action) => {
    const newContacts = [...state.initialCollection?.map(contact => contact.id === action.contact.id ? action.contact : contact)]
    
    return {
        ...state,   
        contacts: newContacts,
        initialCollection: newContacts
      }
  })
)

export function contactsReducer(state: ContactsState | undefined, action: Action): ContactsState {
  return reducer(state, action);
}