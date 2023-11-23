import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService:HttpClientService,
    private toastrService:CustomToastrService ) { }

  async login(userNameOrEmail:string,password:string, callBackFunction?: () => void): Promise<any>{
    const observable : Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller:"auth",
      action:"login"
    },{userNameOrEmail,password})

     const tokenResponse :TokenResponse = await firstValueFrom(observable) as TokenResponse;
     if(tokenResponse){
        localStorage.setItem("accessToken",tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
        this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır." , "Giriş Başarılı" , {
          messageType:ToastrMessageType.Success,
          positon:ToastrPosition.BottomRight
      })
     }
     callBackFunction();
  }

  async refreshTokenLogin(refreshToken:string, callBackFunction?: (state) => void): Promise<any>{
    const observable : Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller:"auth",
      action:"refreshTokenLogin"
    },{refreshToken:refreshToken})

    try {
      const tokenResponse :TokenResponse = await firstValueFrom(observable) as TokenResponse;
      if(tokenResponse){
         localStorage.setItem("accessToken",tokenResponse.token.accessToken);
         localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
      }
      callBackFunction(tokenResponse ? true : false); //içini state i sonradan verdik eğer oturum kapalıysa sepete eklemesin 
    } catch{
      callBackFunction(false)
    }
    
  }

  async googleLogin(user:SocialUser, callBackFunction? : () => void):Promise<any>{
    const observable : Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller:"auth",
      action:"google-login"
      
    }, user);

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
    }

      this.toastrService.message("Google üzerinden giriş başarıyla sağlanmıştır.","Giriş Başarılı", {
        messageType:ToastrMessageType.Success,
        positon:ToastrPosition.BottomRight
      });

      callBackFunction();
  }

  async facebookLogin(user:SocialUser, callBackFunction? : () => void):Promise<any>{
    const observable : Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller:"auth",
      action:"facebook-login"
      
    }, user);

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
    }

      this.toastrService.message("Facebook üzerinden giriş başarıyla sağlanmıştır.","Giriş Başarılı", {
        messageType:ToastrMessageType.Success,
        positon:ToastrPosition.BottomRight
      });

      callBackFunction();

  }
}
