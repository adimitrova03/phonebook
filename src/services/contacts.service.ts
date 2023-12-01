import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContactsModel } from "../models/contacts.model";
import { ContactModel } from "../models/contact.model";
import * as contactsStore from '../store/contacts.reducer';
import { Store } from "@ngrx/store";
import { getContactsArray,  } from "../store/contacts.selector";

@Injectable({providedIn: 'root'})

export class ContactsService {
    private getContactsUrl = 'assets/requests/contacts-data.json';

    constructor(
        private http: HttpClient,
        private store: Store<contactsStore.ContactsState>
    ) {}

    getContacts(): Observable<ContactsModel>{
        return this.http.get<ContactsModel>(this.getContactsUrl, {
            headers: {header: ["Access-Control-Allow-Origin", "*", "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"]}
        });
    }

    getContactsData(): Observable<ContactModel[]> {
        return this.store.select(getContactsArray);
    }
}