import { createSelector } from "@ngrx/store";
import * as contactsStore from './contacts.reducer';
import { ContactsModel } from "../models/contacts.model";

export const getContactsArray = createSelector((state: contactsStore.ContactsState) => (state.contacts as unknown as ContactsModel)?.contacts, value => value)
