import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updated-product-dialog',
  templateUrl: './updated-product-dialog.component.html',
  styleUrls: ['./updated-product-dialog.component.scss']
})
export class UpdatedProductDialogComponent extends BaseDialog<UpdatedProductDialogComponent> {

  constructor(
    dialogRef: MatDialogRef<UpdatedProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdatedProductDialogComponentState
  ) {
    super(dialogRef);
  }

  updated(){

  }
}

export enum UpdatedProductDialogComponentState{
  Yes,No
}
