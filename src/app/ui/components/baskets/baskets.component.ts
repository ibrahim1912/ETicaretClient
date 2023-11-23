import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, NgxSpinerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDeleteState, ShoppingCompleteDialogComponent } from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $:any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})

export class BasketsComponent extends BaseComponent implements OnInit {
 
  constructor(spinner:NgxSpinnerService,
    private basketService:BasketService,
    private orderService:OrderService,
    private toastrService:CustomToastrService,
    private router:Router,
    private dialogService:DialogService
    ) {
    super(spinner);
    
  }
  basketItems:List_Basket_Item[];

  async ngOnInit():Promise<void> {
   this.showNgxSpinner(NgxSpinerType.BallAtom)
   this.basketItems = await this.basketService.get(); //her yüklemede istek yapılması lazım dinamikcomponenet teknik ile yapılcak
   this.hideNgxSpinner(NgxSpinerType.BallAtom);
  }

  async changeQuantity(object:any){
    this.showNgxSpinner(NgxSpinerType.BallAtom);
    const basketItemId:string = object.target.attributes["id"].value;
    const quantity:number = object.target.value;
    const basketItem:Update_Basket_Item = new Update_Basket_Item();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem);
    this.hideNgxSpinner(NgxSpinerType.BallAtom);
  }

 removeBasketItem(basketItemId:string){
  $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      componentType:BasketItemRemoveDialogComponent,
      data:BasketItemDeleteState.Yes,
      afterClosed: async () =>{
        this.showNgxSpinner(NgxSpinerType.BallAtom);
        await this.basketService.remove(basketItemId); //db de gerçekleştirdik
        $("." + basketItemId).fadeOut(500, () => this.hideNgxSpinner(NgxSpinerType.BallAtom)); //arayüzden sildik jqueryden yardım aldık
        $("#basketModal").modal("show");
      }
    })
    
  }

  shoppingComplete(){
    $("#basketModal").modal("hide");
    
    this.dialogService.openDialog({
      componentType:ShoppingCompleteDialogComponent,
      data:ShoppingCompleteDeleteState.Yes,
      afterClosed: async () => {
        this.showNgxSpinner(NgxSpinerType.BallAtom);
        const order : Create_Order = new Create_Order();
        order.address = "Yeni Address";
        order.description = "Bilgiler .....";
        await this.orderService.create(order);
        this.hideNgxSpinner(NgxSpinerType.BallAtom)
        this.toastrService.message("Sipariş alınmıştır","Sipariş Oluşturuldu!",{
          messageType:ToastrMessageType.Info,
          positon:ToastrPosition.TopRight
        });
        this.router.navigate(["/"]);
      }
    });
   
  }
}
