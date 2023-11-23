import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { BaseComponent, NgxSpinerType } from 'src/app/base/base.component';
import { SignalRService } from 'src/app/services/common/signal-r.service';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { HubUrls } from 'src/app/constants/hub-urls';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertify:AlertifyService,spinner:NgxSpinnerService, 
    private signalRService:SignalRService){
    super(spinner)
    
  }

  ngOnInit():void{
    this.showNgxSpinner(NgxSpinerType.BallAtom)

    this.signalRService.on(HubUrls.ProductHub,ReceiveFunctions.ProductAddedMessageReceiveFunciton,message => {
      //alert(message)
      this.alertify.message(message,{
        messageType:MessageType.Notify,
        position:Position.TopCenter
      })
    });

    this.signalRService.on(HubUrls.OrderHub,ReceiveFunctions.OrderAddedMessageReceiveFunciton,message => {
      //alert(message)
      this.alertify.message(message,{
        messageType:MessageType.Notify,
        position:Position.TopCenter
      })
    });
  }

  m(){
    this.alertify.message("Merhaba",{
      messageType:MessageType.Success,
      delay:5
    })
  }

  d(){
    this.alertify.dismiss()
  }
  md(){
    this.alertify.message("Merhaba",{messageType:MessageType.Error,dismissOthers:true})
  }
}
