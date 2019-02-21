import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActionStatus } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor( private snackbar: MatSnackBar) { }

  ShowMsg(msg:string, type:ActionStatus){
    const refSnackbar = this.snackbar.open(msg, "UNDO", {
      horizontalPosition: 'end',
      duration: 2500
    });

    refSnackbar.onAction().subscribe(() => {
      console.log('undo that saved');
    });
  }
}
