import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  message(message: string,options :Partial<AlertifyOption>) {
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    const msj = alertify[options.messageType](message);
    if (options.dismissOthers) {
      msj.dismissOthers();
    }
  }

  dismiss() {
    alertify.dismissAll();
  }
}

export class AlertifyOption {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.BottomRight;
  delay: number = 3;
  dismissOthers: boolean = false;
}
export enum MessageType {
  Error = 'error',
  Message = 'message',
  Notify = 'notify',
  Success = 'success',
  Warning = 'warning',
}

export enum Position {
  TopCenter = 'top-center',
  BottomRight = 'bottom-right',
  TopRight = 'top-right'
}
