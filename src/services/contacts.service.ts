import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, take } from "rxjs";
import { ContactsModel } from "../models/contacts.model";
import { ContactModel } from "../models/contact.model";
import * as contactsStore from '../components/store/contacts.reducer';
import { Store } from "@ngrx/store";
import { getContactsArray,  } from "../components/store/contacts.selector";

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
    
    // checkIsLoading(): Observable<boolean> {
    //     return this.store.select(isLoading)
    // }

    // addContact(contact: ContactModel): Observable<ContactsModel>{
    //     return this.getContacts().pipe(map(contacts => {
    //         contact.id = Math.random().toString();
    //         contact.fullName = contact.firstName + ' ' + contact.lastName;
    //         contacts.contacts.push(contact);

    //         return contacts;
    //     }));
    // }

    // deleteContact(contactId: string): Observable<ContactsModel>{
    //     return this.http.post<ContactsModel>(this.getContactsUrl, contactId);
    // }

    // editContact(editedContact: ContactModel): Observable<ContactsModel>{
    //     const test = this.getContacts().pipe(map(contacts => {
    //         contacts = contacts.contacts.filter(item => item.id === editedContact.id).forEach(contact => contact = editedContact);

    //         return contacts;
    //     }));

    //     test.subscribe(resp => console.log(resp))
        
    //     return test;
    // }
}