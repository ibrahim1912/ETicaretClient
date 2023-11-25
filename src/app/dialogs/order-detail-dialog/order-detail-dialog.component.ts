import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { Single_Order } from 'src/app/contracts/order/single_order';


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
  ) {
    super(dialogRef);
  }

  singleOrder:Single_Order;

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice:number;
  dataSource1=[]
  dataSource2 = []

   

  async  ngOnInit()   {
    this.singleOrder = await this.orderService.getByIdOrder(this.data as string)
    this.dataSource =this.singleOrder.basketItems;

    this.totalPrice = this.singleOrder.basketItems
        .map((basketItem,index) => basketItem.price * basketItem.quantity)
        .reduce((price,current) => price + current);
  }
}


export enum OrderDetailDialogDeleteState {
  Close,
  OrderComplete,
}




 
