import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, NgxSpinerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Product } from 'src/app/contracts/list_product';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent  implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRouted: ActivatedRoute,
    private fileService:FileService,
    private basketService:BasketService,
    private toastrService:CustomToastrService,
    spinner:NgxSpinnerService
  ) {
    super(spinner)
  }

  products: List_Product[];
  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  baseUrl:BaseUrl;



  // async ngOnInit()  {
  //   this.baseUrl = await this.fileService.getBaseStorageUrl();
  //   this.activatedRouted.params.subscribe(async (params) => {
  //     this.currentPageNo = parseInt(params['pageNo'] ?? 1);

  //     const data: { totalProductCount: number; products: List_Product[] } =
  //       await this.productService.read(
  //         this.currentPageNo - 1,
  //         this.pageSize,
  //         () => {},
  //         (errorMessage) => {}
  //       );
      
     
  //     this.products = data.products;
       

  //     this.products = this.products.map<List_Product>(p=> {
  //       this.fileService.getBaseStorageUrl().then(url => {

  //       });
         
  //       const listProduct :List_Product ={
  //         id:p.id,
  //         createdDate:p.createdDate,
  //         updatedDate:p.updatedDate,
  //         name:p.name,
  //         stock:p.stock,
  //         price:p.price,
  //         imagePath: p.productImageFiles.length ? 
  //           p.productImageFiles.find(img => img.showCase)?.path : "aa",
         
  //         productImageFiles:p.productImageFiles

          
  //       };
  //       console.log('imagePath:', listProduct.imagePath)
  //       return listProduct;
  //     });
     
  //     debugger
      
  //     this.totalProductCount = data.totalProductCount;
  //     this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

  //     this.pageList = [];
  //     console.log(this.currentPageNo);
  //     console.log("totalPageCount " + this.totalPageCount);
  //     console.log("totalProductCount " + this.totalProductCount);
  //     if (this.currentPageNo - 3 <= 0)
  //     for (let i = 1; i <= 7; i++){
  //       console.log("if " + this.currentPageNo);
  //       this.pageList.push(i);
  //       }
        

  //   else if (this.currentPageNo + 3 >= this.totalPageCount)
  //     for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++){
  //       console.log("else if " + this.currentPageNo);
  //       this.pageList.push(i);
  //     }
       

  //   else
  //     for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++){
  //       console.log("else " + this.currentPageNo);
  //       this.pageList.push(i);
  //     }
       

  //     /*console.log(this.currentPageNo);
  //     console.log("totalPageCount " + this.totalPageCount);
  //     console.log("totalProductCount " + this.totalProductCount);

  //     if (this.currentPageNo - 3 <= 0) {
  //       for (let i = 1; i <= 7; i++) {
  //         console.log("if " + this.currentPageNo);
  //         this.pageList.push(i);
  //       }
  //     } else if (this.currentPageNo + 3 >= this.totalPageCount) {
  //       for (let i = this.totalPageCount - 3; i <= this.totalPageCount + 3; i++) {
  //         console.log("else if " + this.currentPageNo);
  //         this.pageList.push(i);
  //       }
  //     } else {
  //       for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
  //         console.log("else " + this.currentPageNo);
  //         this.pageList.push(i);
  //       }
  //     }*/
  //   });

     
     
      
  // }

  async ngOnInit() {

    this.baseUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRouted.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);

      const data: { totalProductCount: number, products: List_Product[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize,
        () => {

        },
        errorMessage => {

        });

      this.products = data.products;

      this.products = this.products.map<List_Product>(p => {

        const listProduct: List_Product = {
         
          id: p.id,
          createdDate: p.createdDate,
          imagePath : p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles
          
        };
        
         
         
        

        return listProduct;
      });

      // this.products.forEach((product,i) => {
        
      //   let p: any = {
      //     id: product.id,
      //     createdDate: product.createdDate,
      //     imagePath: product.productImageFiles.length ? product.productImageFiles.find(p => p.showCase).path : "",
      //     name: product.name,
      //     price: product.price,
      //     stock: product.stock,
      //     updatedDate: product.updatedDate,
      //     productImageFiles: product.productImageFiles
      //   };
         
         
      // })
       
      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];

      if (this.currentPageNo - 3 <= 0)
        for (let i = 1; i <= 7; i++)
          this.pageList.push(i);

      else if (this.currentPageNo + 3 >= this.totalPageCount)
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
          this.pageList.push(i);

      else
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
          this.pageList.push(i);
    });

  }

  async addToBasket(product:List_Product){
    this.showNgxSpinner(NgxSpinerType.BallAtom);
    let _basketItem:Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = product.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
    this.hideNgxSpinner(NgxSpinerType.BallAtom);
    this.toastrService.message("Ürün sepete eklenmiştir","Sepete Eklendi",{
      messageType:ToastrMessageType.Success,
      positon:ToastrPosition.BottomRight
    });
  }
}
