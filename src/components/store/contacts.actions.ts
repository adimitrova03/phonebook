import { createAction, props } from '@ngrx/store';
import { ContactModel } from '../../models/contact.model';

export const setContacts = createAction(
    '[Contacts] SET_CONTACTS',
    props<{
        contacts: ContactModel[]
    }>(),
);

export const addContact = createAction(
    '[Contacts] ADD_CONTACT',
    props<{
        readonly contact: ContactModel
    }>(),
);

export const deleteContact = createAction(
    '[Contacts] DELETE_CONTACT',
    props<{
        readonly contactId: string
    }>(),
);

export const searchContacts = createAction(
    '[Contacts] SEARCH_CONTACTS',
    props<{
        readonly query: string
    }>(),
);

export const editContact = createAction(
    '[Contacts] EDIT_CONTACT',
    props<{
        readonly contact: ContactModel
    }>(),
);