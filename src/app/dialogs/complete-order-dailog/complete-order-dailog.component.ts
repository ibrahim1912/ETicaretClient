import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/base/base.component';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-complete-order-dailog',
  templateUrl: './complete-order-dailog.component.html',
  styleUrls: ['./complete-order-dailog.component.scss']
})
export class CompleteOrderDailogComponent extends BaseDialog<CompleteOrderDailogComponent> {

  constructor(
    dialogRef: MatDialogRef<CompleteOrderDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompleteOrderState
  ) {
    super(dialogRef);
  }

  complete(){

  }
}

export enum CompleteOrderState{
  Yes,
  No
}