import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs';
import { ContactsModel } from '../../models/contacts.model';
import { ContactsService } from '../../services/contacts.service';
import { ContactsListComponent } from '../contacts-list/contacts-list.component';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ContactModel } from '../../models/contact.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { searchContacts, setContacts } from '../store/contacts.actions';
import * as contactsStore from '../store/contacts.reducer';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ContactEditComponent } from '../contact-edit/contact-edit.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, ContactsListComponent, MatButtonModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatDialogModule, ContactEditComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  contacts: Observable<ContactModel[]> = this.contactsService.getContactsData();

  private readonly search = new BehaviorSubject<string>('');
  private readonly searchObs = this.search.pipe(
    debounceTime(300),
    distinctUntilChanged()
  )
  
  constructor(
    readonly contactsService: ContactsService,
    private store: Store<contactsStore.ContactsState>,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.searchObs.subscribe((query) => this.store.dispatch(searchContacts({query})));

    this.contactsService.getContacts().subscribe((resp) => {
      resp.contacts.length && this.store.dispatch(setContacts(resp))
    })
  }

  onSearch(event: any): void {
    this.search.next(event.target.value);
  }

  addContact(): void {
    this.dialog.open(ContactEditComponent, {
      width: '320px',
      data: undefined
    });
  }
}
