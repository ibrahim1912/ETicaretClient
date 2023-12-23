import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { Single_Product } from 'src/app/contracts/single_product';
import { DialogService } from 'src/app/services/common/dialog.service';
import { NgxSpinerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UpdatedProductDialogComponent, UpdatedProductDialogComponentState } from '../updated-product-dialog/updated-product-dialog.component';

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.scss']
})
export class UpdateProductDialogComponent extends BaseDialog<UpdateProductDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner:NgxSpinnerService,
    private productService:ProductService,
    private toastrService:CustomToastrService,
    private dialogService:DialogService,
    private alertify:AlertifyService
     
  ) {
    super(dialogRef);
  }
  @ViewChild('txtName', { static: true }) txtName: ElementRef;
  @ViewChild('txtStock', { static: true }) txtStock: ElementRef;
  @ViewChild('txtPrice', { static: true }) txtPrice: ElementRef;
  singleProduct:Single_Product;
 
  async  ngOnInit()   {
     
    this.singleProduct = await this.productService.getProductById(this.data as string)
  }

  async update(
    name: HTMLInputElement,
    price: HTMLInputElement,
    stock: HTMLInputElement
  ) {
    this.spinner.show(NgxSpinerType.BallAtom);
    const update_product: Single_Product = this.singleProduct;
    update_product.id = this.singleProduct.id;
    update_product.name = name.value;
    update_product.price = parseFloat(price.value);
    update_product.stock = parseInt(stock.value);
    await this.productService.updateProduct2(update_product.id,update_product.name,update_product.stock,update_product.price, () => {
      this.spinner.hide(NgxSpinerType.BallAtom);
       
    //   this.alertify.message('Ürün başarıyla güncellenmiştir.', {
    //     dismissOthers: true,
    //     messageType: MessageType.Success,
    //     position: Position.BottomRight,
    //   });
      
    // }, errorMessage => {
    //   this.alertify.message('Hata oldu.' , {
    //     dismissOthers: true,
    //     messageType: MessageType.Error,
    //     position: Position.BottomRight,
    //   });
    });
  }

  updated( name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement,){
    this.dialogService.openDialog({
      componentType:UpdatedProductDialogComponent,
      data:UpdatedProductDialogComponentState.Yes,
      afterClosed: async ()=>{
        this.spinner.show(NgxSpinerType.BallAtom)
        await this.update(name,stock,price)
        this.spinner.hide(NgxSpinerType.BallAtom)
        this.alertify.message('Ürün başarıyla güncellenmiştir.', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });

        setTimeout(() => {
            window.location.reload();
        }, 1300);
       
        
      }
    });
  }
}

 
