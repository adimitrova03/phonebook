import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ContactModel } from '../../models/contact.model';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ContactEditComponent } from '../contact-edit/contact-edit.component';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatListModule, MatIconModule, MatDialogModule, ContactEditComponent],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsListComponent implements OnInit {
  @Input() public contacts!: ContactModel[];
  // public sortedContacts: ContactModel[] = []

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    // console.log('con', this.sortedContacts)
    // console.log('contacts', this.contacts.length, this.contacts)
    // Object.freeze(this.contacts)
    
    // this.sortedContacts =  this.contacts?.sort((a, b) => a.firstName.localeCompare(b.firstName))//.sort((a, b) => a.firstName.localeCompare(b.firstName));
  }

  selectedContact(contact: ContactModel): void {
    this.dialog.open(ContactEditComponent, {
      width: '320px',
      data: contact
    });
  }
}
