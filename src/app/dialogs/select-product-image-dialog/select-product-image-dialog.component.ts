import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinerType } from 'src/app/base/base.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';

declare var $:any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss'],
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit{
  
  constructor(
    dialog: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService)  {
    super(dialog);
  }

  @Output() options : Partial<FileUploadOptions> = {
    accept : ".png, .jpg, jpeg, .gif",
    action :"upload",
    controller:"products",
    explanation: "Ürün resmini seçin veya buraya sürükleyin... ",
    isAdminPage:true,
    queryString:`id=${this.data}`
  };

  images : List_Product_Image[];
  
  async ngOnInit() {
    this.spinner.show(NgxSpinerType.BallAtom)
     this.images =  await this.productService.readImages(this.data as string, 
      () => this.spinner.hide(NgxSpinerType.BallAtom));
  }

  async deleteImage(imageId:string,event:any){
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data : DeleteState.Yes,
      afterClosed : async () => {
        this.spinner.show(NgxSpinerType.BallAtom)
        await this.productService.deleteImage(this.data as string, imageId, () => 
          this.spinner.hide(NgxSpinerType.BallAtom));
          var card = $(event.srcElement).parent().parent().parent();
          card.fadeOut(700);
      }
    });
  }

  showCase(imageId:string){
    //alert("ImageId: " + imadeId +" " + "ProductId : " + this.data)
    this.spinner.show(NgxSpinerType.BallAtom)
    this.productService.changeShowcaseImage(imageId,this.data as string,() => {
      this.spinner.hide(NgxSpinerType.BallAtom);
    });
  }

}

export enum SelectProductImageState {
  Close
}
