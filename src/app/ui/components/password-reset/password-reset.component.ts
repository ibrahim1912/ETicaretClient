import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, NgxSpinerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends BaseComponent  {
 
 constructor(spinner:NgxSpinnerService,
  private userAuthService:UserAuthService,
  private alertifyService:AlertifyService,
  private router:Router
  ){
  super(spinner)
 }
 
 passwordReset(email:string){
  this.showNgxSpinner(NgxSpinerType.BallAtom);
  this.userAuthService.passwordReset(email, ()=> {
    this.hideNgxSpinner(NgxSpinerType.BallAtom)
    this.alertifyService.message("Mail başarıyla gönderilmiştir.",{
      messageType:MessageType.Success,
      position:Position.BottomRight
    });
    this.router.navigate([""]);
  });
 }
 

}
