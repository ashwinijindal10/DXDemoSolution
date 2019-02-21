import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PersonType } from '../models/model';

export interface DialogData {
 type:PersonType
}

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  formGroup: FormGroup;
  title :string ;

  constructor( private formBuilder: FormBuilder,
     public dialogRef: MatDialogRef<AddPersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.title= ` Add ${ data.type == PersonType.Producer ? 'Producer' : 'Actor'}`;
    }

  ngOnInit() {
    this.createForm();
  }


 createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required]],
      'date_of_birth': [null],
      'gender': ['M',[Validators.required]],
      'bio': [null]
    });
  }


  save() {
    this.dialogRef.close(this.formGroup.value);
  }

  close() {
      this.dialogRef.close();
  }


}
