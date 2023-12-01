import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { contactsReducer } from "./contacts.reducer";
import { isDevMode } from "@angular/core";

export interface State {}

export const reducers: ActionReducerMap<State> = {
    contacts: contactsReducer
}

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];