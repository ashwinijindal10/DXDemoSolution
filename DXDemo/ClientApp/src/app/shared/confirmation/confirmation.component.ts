import { Component,  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CofirmationDialogData, ActionStatus } from '../../models/model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  get ActionStatusType(){
   return ActionStatus;
  }

  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: CofirmationDialogData) { }


  onClick(result:ActionStatus){
    this.data.Result=result
    this.dialogRef.close(this.data);
  }

}
