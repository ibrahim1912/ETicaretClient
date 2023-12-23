 
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, NgxSpinerType } from 'src/app/base/base.component';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { Single_Order } from 'src/app/contracts/order/single_order';
import { List_User } from 'src/app/contracts/users/list_user';
import { Single_User } from 'src/app/contracts/users/single_user';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDeleteState, ShoppingCompleteDialogComponent } from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent implements OnInit {
 
  constructor(spinner:NgxSpinnerService,
    private userService:UserService,
    private toastrService:CustomToastrService,
    private router:Router,
    private dialogService:DialogService
    ) {
    super(spinner);
    
  }
  
  @ViewChild('txtNameSurname', { static: true }) txtNameSurname: ElementRef;
  @ViewChild('txtUserName', { static: true }) txtUserName: ElementRef;
  @ViewChild('txtEmail', { static: true }) txtEmail: ElementRef;
user:Single_User;

 async ngOnInit(){
 
  const token: string = localStorage.getItem("accessToken");
  if(token != null){
    this.user = await this.userService.getByIdUser(token);
  }
}

public isModalOpen = true; // Modalın açık/kapalı durumunu takip eden değişken

closeModal() {
  this.isModalOpen = false; // Modalı kapat
  window.location.reload();
  
}

  async updateUser(
    nameSurname: HTMLInputElement,
    userName: HTMLInputElement,
    email: HTMLInputElement)
    {
      this.showNgxSpinner(NgxSpinerType.BallAtom);
      const update_user: Single_User = this.user
      update_user.id = this.user.id;
      update_user.nameSurname = nameSurname.value;
      update_user.userName = userName.value;
      update_user.email = email.value;
      await this.userService.updateUser(this.user.id,update_user.nameSurname,update_user.userName,update_user.email, () => {
        this.hideNgxSpinner(NgxSpinerType.BallAtom);
        this.toastrService.message("Kİşisel Bilgiler Başarıyla Güncelleştirildi","Güncelleştirme Başarılı!",{
          messageType:ToastrMessageType.Success,
          positon:ToastrPosition.BottomRight
        });
        this.closeModal()
      })
    }
  
}



