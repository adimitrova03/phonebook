import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactModel } from '../../models/contact.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Store } from '@ngrx/store';
import { ContactsModel } from '../../models/contacts.model';
import { deleteContact, editContact, addContact } from '../store/contacts.actions';


@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactEditComponent {
  public contactForm = new FormGroup({
    firstName: new FormControl<string>('', { nonNullable: true }),
    lastName: new FormControl<string>('', { nonNullable: true }),
    home: new FormControl<string>('', { nonNullable: true }),
    mobile: new FormControl<string>('', { nonNullable: true }),
    id: new FormControl<string>('', { nonNullable: true }),
    fullName: new FormControl<string>('', { nonNullable: true })
  });

  constructor(
    public dialogRef: MatDialogRef<ContactEditComponent>,
    private readonly contactsService: ContactsService,
    private store: Store<{ contacts: ContactsModel }>,
    @Inject(MAT_DIALOG_DATA) public data: ContactModel
  ) {}

  ngOnInit(): void {
    this.data && this.contactForm.patchValue(this.data);
  }

  addContact(): void {
    const newData = this.contactForm.getRawValue();

    if (this.data && this.data.id) {
      this.store.dispatch(editContact({contact: newData}));
    } else {
      this.store.dispatch(addContact({contact: newData}));
    }

    this.dialogRef.close();
  }

  deleteContact(): void {
    this.store.dispatch(deleteContact({contactId: this.data.id}));
    this.dialogRef.close();
  }
}
