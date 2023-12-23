import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, NgxSpinerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,
    private userAuthService:UserAuthService,
    private activatedRoute:ActivatedRoute,
    private alertyService:AlertifyService,
    private userService:UserService,
    private router:Router){
    super(spinner)
  }

  // state:boolean = false;

  state:any;

  ngOnInit(): void {
    this.showNgxSpinner(NgxSpinerType.BallAtom);
    this.activatedRoute.params.subscribe({
      next:async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        
        this.state = await this.userAuthService.verifyResetToken(resetToken,userId, () => {
          this.hideNgxSpinner(NgxSpinerType.BallAtom);
        })
 
      }
    });
  }

  updatePassword(password:string,passwordConfirm:string){
    this.showNgxSpinner(NgxSpinerType.BallAtom);
    if(password != passwordConfirm){
      this.alertyService.message("Şİfreleri doğrulayınız... ",{
        messageType:MessageType.Error,
        position:Position.TopRight
      });
      this.hideNgxSpinner(NgxSpinerType.BallAtom);
      return;
    }

    this.activatedRoute.params.subscribe({
      next:async params =>{
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        await this.userService.updatePassword(resetToken,userId,password,passwordConfirm, 
          () => {
            this.alertyService.message("Şifre başarıyla güncellenmiştir",{
              messageType:MessageType.Success,
              position:Position.TopRight
            })
           
        }, 
        error => {
          console.log(error)
        });

        this.hideNgxSpinner(NgxSpinerType.BallAtom);
        this.router.navigate(["/login"])
      }
    })
    
  }

}
