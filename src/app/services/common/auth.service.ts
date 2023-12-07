import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './models/user.service';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper:JwtHelperService ,private userService:UserService) { }

  state:any
  async idendityCheck(){
    const token: string = localStorage.getItem("accessToken");

    let expired: boolean;
   
     
    try {
      expired = this.jwtHelper.isTokenExpired(token);
       
    } catch {
      expired = true;
    }
 
    
     _isAuthenticated = (token != null && !expired) 

     if(token != null){
      this.state = await this.userService.hasUserRole(token)
      _roleController = this.state.state
     }
  }

  get isAuthenticated():boolean{
    return _isAuthenticated;
  }

  get roleController():boolean{
    return _roleController;
  }

 



}

export let _isAuthenticated:boolean;
export let _roleController:boolean;
 
 
 