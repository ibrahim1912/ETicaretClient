import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, NgxSpinerType } from 'src/app/base/base.component';
import {  List_Product } from 'src/app/contracts/list_product';
import { QrcodeDialogComponent } from 'src/app/dialogs/qrcode-dialog/qrcode-dialog.component';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { UpdateProductDialogComponent } from 'src/app/dialogs/update-product-dialog/update-product-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent  extends BaseComponent implements OnInit {
  
  constructor(
    spinner:NgxSpinnerService,
    private productService:ProductService, 
    private alertify:AlertifyService,
    private dialogService:DialogService ) {
    super(spinner)
  }

  displayedColumns: string[] = ['name', 'price', 'stock', 'createdDate',
  'updatedDate','photos','qrcode','edit','delete'];
  dataSource:MatTableDataSource<List_Product> = null
  @ViewChild(MatPaginator) paginator: MatPaginator;


  async getProducts( ) {
    this.showNgxSpinner(NgxSpinerType.BallAtom);
    
    const allProducts :{totalProductCount:number; products:List_Product[]} = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5, () => this.hideNgxSpinner(NgxSpinerType.BallAtom), errorMessage => 
        this.alertify.message(errorMessage,{
          dismissOthers:true,
          messageType:MessageType.Error,
          position:Position.BottomRight
        }));

    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length=allProducts.totalProductCount;
  console.log(allProducts.totalProductCount)
  }

  // delete(id:string,event){
  //   const img : HTMLImageElement = event.srcElement;
  //   $(img.parentElement.parentElement).fadeOut(2000);

  // }

  addProductImages(id:string){ //id=> productIdsi
    this.dialogService.openDialog({
      componentType :SelectProductImageDialogComponent,
      data:id,
      options:{
        width:"1400px"
      }
    });
  }

  async pageChanged(){
    await this.getProducts();
     
  }

  async ngOnInit() {
    await this.getProducts();
     
  }

  showQRCode(productId:string){
    this.dialogService.openDialog({
      componentType:QrcodeDialogComponent,
      data:productId,
      afterClosed:() => {},
     
    });
  }

  updateProduct(id:string){
    this.dialogService.openDialog({
      componentType:UpdateProductDialogComponent,
      data:id,
      options:{
        width:"800px"
      },
      afterClosed:() =>{}
    });
  }
}
