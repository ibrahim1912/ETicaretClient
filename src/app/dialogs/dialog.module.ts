import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from "../services/common/file-upload/file-upload.module";
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent } from './shopping-complete-dialog/shopping-complete-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CompleteOrderDailogComponent } from './complete-order-dailog/complete-order-dailog.component';



@NgModule({
    declarations: [
        DeleteDialogComponent,
         
        SelectProductImageDialogComponent,
                  BasketItemRemoveDialogComponent,
                  ShoppingCompleteDialogComponent,
                  OrderDetailDialogComponent,
                  CompleteOrderDailogComponent,
    ],
    imports: [
        CommonModule,
        MatDialogModule,MatCardModule,MatButtonModule,MatTableModule,MatToolbarModule,
        FileUploadModule,
        
        
    ]
})
export class DialogModule { }
