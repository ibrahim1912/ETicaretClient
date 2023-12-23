import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create-user';
import { Observable, firstValueFrom } from 'rxjs';
 
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';
import { List_User } from 'src/app/contracts/users/list_user';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Single_User } from 'src/app/contracts/users/single_user';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService,
    private toastrService:CustomToastrService,
    private   httpClient: HttpClient,
    private jwtHelper:JwtHelperService ) { }

     state:boolean

  async create(user:User):Promise<Create_User>{
    const observable : Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller:"users"
    },user);

    return await firstValueFrom(observable) as Create_User;
  }

  async updatePassword(userId:string,resetToken:string,password:string,passwordConfirm:string,
    successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable:Observable<any> = this.httpClientService.post({
      controller:"users",
      action:"update-password"
    },{
      userId:userId,
      resetToken:resetToken,
      password:password,
      passwordConfirm:passwordConfirm
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
    .catch(error => errorCallBack(error));
    await promiseData;
  }
 
  async getAllUsers(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalUsersCount: number; users: List_User[] }> {
    const observable: Observable<{ totalUsersCount: number; users: List_User[] }> = this.httpClientService.get({
      controller: "users",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }

  async assignRoleToUser(id: string, roles: string[], successCallBack?: () => void, errorCallBack?: (error) => void) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "assign-role-to-user"
    }, {
      userId: id,
      roles: roles
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack())
      .catch(error => errorCallBack(error));

    await promiseData;
  }

  async getRolesToUser(userId: string, successCallBack?: () => void, errorCallBack?: (error) => void): 
    Promise<{userRoles: string[]}> {
    const observable: Observable<{ userRoles: string[] }> = this.httpClientService.get({
      controller: "users",
      action: "get-roles-to-user"
    }, userId);

    const promiseData = firstValueFrom(observable);
    promiseData.then(() => successCallBack())
      .catch(error => errorCallBack(error));

    return await promiseData;
  }

  async hasUserRole(token: string) :Promise<boolean>  {
 
    const observable: Observable<any> = this.httpClientService.post({
      controller: "users",
      action: "has-role-user"
    }, {token:token});

      const state:boolean = await firstValueFrom(observable);
      return state;
  }

  async getByIdUser(token: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<Single_User> = this.httpClientService.get<Single_User>({
      controller: "users"
    }, token);

    const promiseData = firstValueFrom(observable);
    // promiseData.then(value => successCallBack())
    //   .catch(error => errorCallBack(error))

    return await promiseData;
  }

  async updateUser(id:string,nameSurname:string,userName:string,email:string, successCallBack?: () => void,errorCallBack?: (errorMessage :string) => void) :
  Promise<void>{
    const observable = this.httpClientService.put({
      controller:"users",
       
    },{
      id:id,nameSurname:nameSurname,userName:userName,email:email
    });
    
    await firstValueFrom(observable);
    successCallBack();
  }
}
 
 

 