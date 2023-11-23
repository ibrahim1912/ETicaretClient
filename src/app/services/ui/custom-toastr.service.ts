import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr:ToastrService) { }
  
  message(message:string,title:string,toastrOptions:Partial<ToastrOption>){
    this.toastr[toastrOptions.messageType](message,title,{
      positionClass:toastrOptions.positon
    })
  }
}

export class ToastrOption{
  messageType:ToastrMessageType;
  positon:ToastrPosition = ToastrPosition.BottomRight;
}

export enum ToastrMessageType{
  Success ="success",
  Error = "error",
  Warning = "warning",
  Info="info"
}

export enum ToastrPosition{
  BottomRight="toast-bottom-right",
  TopRight ="toast-top-right",
  TopCenter="toast-top-center"
}
