import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contracts/list_product_image';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent extends BaseDialog<FileUploadDialogComponent> {
  
  constructor(dialogRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileUploadDialogState) {
    super(dialogRef);
    
  }
  
 
  
}

export enum FileUploadDialogState{
  Yes,
  No
} 
