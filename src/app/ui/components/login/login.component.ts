import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, NgxSpinerType } from 'src/app/base/base.component';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent extends BaseComponent implements OnInit {
  constructor(private userAuthService: UserAuthService, spinner: NgxSpinnerService,
    private authService:AuthService,private actiavedRoute:ActivatedRoute,
    private router:Router,
    private socialAuthService:SocialAuthService) {
      super(spinner);
      this.socialAuthService.authState.subscribe(async (user:SocialUser) => {
        this.showNgxSpinner(NgxSpinerType.BallAtom);
        switch(user.provider){
          case "GOOGLE":
            await userAuthService.googleLogin(user, () => {
              this.authService.idendityCheck();
              this.router.navigate([""]);
              this.hideNgxSpinner(NgxSpinerType.BallAtom);
            })
            break;
          case "FACEBOOK":
            await userAuthService.facebookLogin(user, () => {
              this.authService.idendityCheck();
              this.router.navigate([""]);
              this.hideNgxSpinner(NgxSpinerType.BallAtom);
            })
            break;
        }
        
    });
  }

  ngOnInit(): void {
    //this.showNgxSpinner(NgxSpinerType.BallSpinFadeRotating);
  }

  async login(userNameOrEmail: string, password: string) {
    this.showNgxSpinner(NgxSpinerType.BallSpinFadeRotating);
    await this.userAuthService.login(userNameOrEmail, password, () => {
      this.authService.idendityCheck();
      this.router.navigate([""]);
      this.actiavedRoute.queryParams.subscribe(params => {
        const returnUrl:string = params["returnUrl"];
          if(returnUrl)
            this.router.navigate([returnUrl]);
      })
      this.hideNgxSpinner(NgxSpinerType.BallSpinFadeRotating);
      });
    }

    facebookLogin(){
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
 }

