import { Component, ViewChild } from '@angular/core';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
import { ComponentType, DinamicLoadComponentService } from './services/common/dinamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { UserService } from './services/common/models/user.service';
import { state } from '@angular/animations';


declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ETicaretClient';

  @ViewChild(DynamicLoadComponentDirective, {static : true})
  dynamicLoadComponentDirective:DynamicLoadComponentDirective;
 
  constructor(
    private toastrService: CustomToastrService,
    public authService: AuthService,
    private router: Router,
    private httpClientService: HttpClientService,
    public userService:UserService,
    private dynamicLoadComponentService:DinamicLoadComponentService
   
  ) {

    //test için kullandık
    // httpClientService.put({
    //   controller:"baskets"
    // },{
    //   basketItemId:"24023425-af4d-41e3-b4d6-a3caf12e2c87",
    //   quantity:57
    // }).subscribe(data => {
    //   debugger
    // });
 
    authService.idendityCheck();
    // authService.getUserName();
     

  }
  signOut() {
    localStorage.removeItem('accessToken');
    sessionStorage.clear();
    this.authService.idendityCheck();
    //window.location.reload();
    this.router.navigate(['']);
    this.toastrService.message('Oturum kapatıtlmıştır.', 'Oturum kapatıldı', {
      messageType: ToastrMessageType.Warning,
      positon: ToastrPosition.BottomRight,
    });
  }

  loadComponent(){
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketsComponent,
      this.dynamicLoadComponentDirective.viewcontainerRef) 
  
  }

  removeAccessToken(){
    localStorage.removeItem('accessToken');
    sessionStorage.clear();
  }

  updateUser(){
    this.dynamicLoadComponentService.loadComponent(ComponentType.UserComponent,
      this.dynamicLoadComponentDirective.viewcontainerRef) 
  }

  
  

}
