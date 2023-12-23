import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent } from './shopping-complete-dialog/shopping-complete-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CompleteOrderDailogComponent } from './complete-order-dailog/complete-order-dailog.component';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';
import { QrcodeDialogComponent } from './qrcode-dialog/qrcode-dialog.component';
import { QrcodeReadingDialogComponent } from './qrcode-reading-dialog/qrcode-reading-dialog.component';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { UpdateProductDialogComponent } from './update-product-dialog/update-product-dialog.component';
import { UpdatedProductDialogComponent } from './updated-product-dialog/updated-product-dialog.component';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
 

@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    BasketItemRemoveDialogComponent,
    ShoppingCompleteDialogComponent,
    OrderDetailDialogComponent,
    CompleteOrderDailogComponent,
    AuthorizeMenuDialogComponent,
    AuthorizeUserDialogComponent,
    QrcodeDialogComponent,
    QrcodeReadingDialogComponent,
    UpdateProductDialogComponent,
    UpdatedProductDialogComponent
    
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    FileUploadModule,
    MatBadgeModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    NgxScannerQrcodeModule,
    FormsModule,
    MatRadioModule
    
  ],
})
export class DialogModule {}
