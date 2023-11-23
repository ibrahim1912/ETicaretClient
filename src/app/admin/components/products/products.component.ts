import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, NgxSpinerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,private httpClientService:HttpClientService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showNgxSpinner(NgxSpinerType.BallAtom);
  }


  @ViewChild(ListComponent) listComponent:ListComponent;

  createdProduct(createdProduct:Create_Product){
    this.listComponent.getProducts();
  }
}
    /*this.httpClientService.get<Create_Product[]>({
      controller:"products"
    }).subscribe(data => console.log(data));*/

    /*this.httpClientService.post({
      controller:"products"
    },{
      name:"Kalem",
      stock:100,
      price:25
    }).subscribe();
    this.httpClientService.post({
      controller:"products"
    },{
      name:"Silgi",
      stock:500,
      price:2.5
    }).subscribe();*/

    /*
    this.httpClientService.put({
      controller:"products"
    },{
      id:"6a9ba328-b5f2-4c55-89a7-46c5920593cb",
      name:"Rengarek Silgi",
      price:70,
      stock:500
    }).subscribe();*/

    /*this.httpClientService.delete({
      controller:"products"
    },"8d77c1ca-8b29-4f8f-80f6-0e4dd7ad9237").subscribe();*/


    /*this.httpClientService.get({
      baseUrl:"https://jsonplaceholder.typicode.com",
      controller:"posts"
    }).subscribe(data => console.log(data));*/

   /* this.httpClientService.get({
      fullEndPoint:"https://jsonplaceholder.typicode.com/posts",
      
    }).subscribe(data => console.log(data));*/
  



