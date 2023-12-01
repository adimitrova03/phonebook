import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as contactsStore from './contacts.reducer';
import { ContactsModel } from "../../models/contacts.model";

// const selectFeature = createFeatureSelector<contactsStore.ContactsState>(contactsStore.featureKey)

// export const getContactsArray = createSelector(
//     selectFeature,
//     (state: contactsStore.ContactsState) => state.contacts
// )

// export const isLoading = createSelector(
//     selectFeature,
//     (state: contactsStore.ContactsState) => state.isLoading
// )

export const getContactsArray = createSelector((state: contactsStore.ContactsState) => (state.contacts as unknown as ContactsModel)?.contacts, value => value)
