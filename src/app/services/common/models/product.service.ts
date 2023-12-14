import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { Single_Product } from 'src/app/contracts/single_product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(product:Create_Product, successCallBack?:any , errorCallBack?: (errorMessage:string) => void){
    this.httpClientService.post({
      controller:"products"
    },product).subscribe(result=>{
      successCallBack();
    }, (errorResponse:HttpErrorResponse) => {
      const _error : Array<{key :string, value:Array<string>}> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v,_index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallBack(message);
    });
  }

  async read(page: number=0, size:number =5,successCallBack? : () => void, errorCallBack?: (errorMessage :string) => void)
  :Promise<{totalProductCount:number; products:List_Product[]}>{
   const promiseData : Promise<{totalProductCount:number; products:List_Product[]}> =  
    this.httpClientService.get<{totalProductCount:number; products:List_Product[]}>({
      controller:"products",
      queryString : `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d=> successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }

 async  delete(id:string){
   const deleteObservable :Observable<any> = this.httpClientService.delete<any>({
      controller:"products"
    }, id)

    await firstValueFrom(deleteObservable)
  }

  async readImages(id:string, successCallBack?:() => void):Promise<List_Product_Image[]>{
    const getObservable:Observable<List_Product_Image[]>  = this.httpClientService.get<List_Product_Image[]>({
      action:"getproductimages",
      controller:"products"
     },id)

    const images :List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();
    return  images
  }

  /*async deleteImage(id:string, imageId:string, successCallBack?: () => void){
    const deleteObservable =this.httpClientService.delete({
      action:"deleteproductimage",
      controller:"products",
      queryString:`imageId=${imageId}`
    },id)
    await firstValueFrom(deleteObservable);
    successCallBack();
  }*/

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete({
      action: "deleteproductimage",
      controller: "products",
      queryString: `imageId=${imageId}`
    }, id)
    await firstValueFrom(deleteObservable);
    successCallBack();
  }

  async changeShowcaseImage(imageId:string, productId:string, successCallBack?: () => void) :
    Promise<void>{
      const changeShowcaseImageObservable = this.httpClientService.get({
        controller:"products",
        action:"ChangeShowcaseImage",
        queryString: `imageId=${imageId}&productId=${productId}`
      });
      await firstValueFrom(changeShowcaseImageObservable);
      successCallBack();
  }

  async updateStockQrCodeToProduct(productId:string, stock:number, successCallBack?: () => void) :
  Promise<void>{
    const observable = this.httpClientService.put({
      controller:"products",
      action:"qrcode",
    },{
      productId, stock
    });
    await firstValueFrom(observable);
    successCallBack();
  }

  async updateProduct(single_product:Single_Product, successCallBack?: () => void,errorCallBack?: (errorMessage :string) => void) :
  Promise<void>{
    const observable = this.httpClientService.put({
      controller:"products",
      action:"update-product",
    },{
      single_product
    });

    await firstValueFrom(observable);
    successCallBack();
  }

  async updateProduct2(id:string,name:string,stock:number,price:number, successCallBack?: () => void,errorCallBack?: (errorMessage :string) => void) :
  Promise<void>{
    const observable = this.httpClientService.put({
      controller:"products",
      action:"update-product",
    },{
      id:id,name:name,price:price,stock:stock
    });
    
    await firstValueFrom(observable);
    successCallBack();
  }

  async getProductById(id:string,successCallBack? : () => void, errorCallBack?: (errorMessage :string) => void) {
   const observable : Observable<Single_Product> =  
    this.httpClientService.get<Single_Product>({
      controller:"products",
       
    },id);

    const promiseData = firstValueFrom(observable);

    return await promiseData;
  }
}
 
 
