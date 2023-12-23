import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { Single_Order } from 'src/app/contracts/order/single_order';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CompleteOrderDailogComponent, CompleteOrderState } from '../complete-order-dailog/complete-order-dailog.component';
import { async } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinerType } from 'src/app/base/base.component';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';


@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss'],
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogDeleteState | string,
    private orderService:OrderService,
    private dialogService:DialogService,
    private spinner:NgxSpinnerService,
    private toastrService:CustomToastrService
  ) {
    super(dialogRef);
  }

  singleOrder:Single_Order;

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice:number;
   

  async  ngOnInit()   {
    this.singleOrder = await this.orderService.getByIdOrder(this.data as string)
    this.dataSource =this.singleOrder.basketItems;

    this.totalPrice = this.singleOrder.basketItems
        .map((basketItem,index) => basketItem.price * basketItem.quantity)
        .reduce((price,current) => price + current);
  }

  completeOrder(){
    this.dialogService.openDialog({
      componentType:CompleteOrderDailogComponent,
      data:CompleteOrderState.Yes,
      afterClosed: async ()=>{
        this.spinner.show(NgxSpinerType.BallAtom)
        await this.orderService.completeOrder(this.data as string)
        this.spinner.hide(NgxSpinerType.BallAtom)
        this.toastrService.message("Sipariş başarıyla tamamlanmıştır! Müşteriye bilgi verilmiştir." ,"Sipariş tamamlandı!",{
          messageType:ToastrMessageType.Success,
          positon:ToastrPosition.BottomRight
        });

        setTimeout(() => {
           window.location.reload();
           
        }, 1000); 
        
        
      }
    });
  }
}


export enum OrderDetailDialogDeleteState {
  Close,
  OrderComplete,
}




 
function output(): (target: OrderDetailDialogComponent, propertyKey: "completed") => void {
  throw new Error('Function not implemented.');
}

