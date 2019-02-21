import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { CofirmationDialogData } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private mDialog: MatDialog) { }

  showPopup(component,inputData, callback ){
    const dialogRef = this.mDialog.open(component, {
      width: '400px',
      data: inputData
    });
    dialogRef.updatePosition({ top: '5%' });

    dialogRef.afterClosed().subscribe(callback);
  }

  showConfirmation(title:string,message:string,callback){
    const dialogRef = this.mDialog.open(ConfirmationComponent, {
      data: <CofirmationDialogData>{ Title:title, Message:message}
    });
    dialogRef.afterClosed().subscribe(callback);
  }

}
