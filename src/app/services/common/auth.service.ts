import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './models/user.service';
import { Single_User } from 'src/app/contracts/users/single_user';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper:JwtHelperService ,private userService:UserService) { }

  state:any
  single_User:Single_User;

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

      this.single_User = await this.userService.getByIdUser(token);
      _userName = this.single_User.userName;
     
     }
  }

  // async getUserName(){

  //   const token: string = localStorage.getItem("accessToken");
  //   if(token != null){
  //     this.single_User = await this.userService.getByIdUser(token);
  //     _userName = this.single_User.userName;
  //   }
    
  // }

  get isAuthenticated():boolean{
    return _isAuthenticated;
  }

  get roleController():boolean{
    return _roleController;
  }

 get userName():string{
    return _userName;
 }

 

}

export let _isAuthenticated:boolean;
export let _roleController:boolean;
export let _userName:string;
 
 