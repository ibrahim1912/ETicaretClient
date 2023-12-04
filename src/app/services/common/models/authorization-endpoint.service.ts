import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private httpClientService:HttpClientService) { }


  async assignRoleEndpoint(roles:string[],code:string, authorizeMenu:string, successCallBack? : () => void,
   errorCallBack?: (error) => void){
    const observable:Observable<any> = await this.httpClientService.post({
      controller: "AuthorizationEndpoints"
    },{
      roles:roles,
      code:code,
      authorizeMenu :authorizeMenu
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
    .catch(error => errorCallBack(error));

    // const promiseData = observable.subscribe({
    //   next:successCallBack,
    //   error:errorCallBack
    // })
    
    return await promiseData;
  }
  

  async getRolesToEndpoint(code:string,authorizeMenu:string,successCallBack? : () => void, errorCallBack?: (error) => void)
  {
    const observable:Observable<any> = await this.httpClientService.post({
      controller: "AuthorizationEndpoints",
      action:"GetRolesToEndpoint"
    },{
      code:code,
      authorizeMenu:authorizeMenu
    });
      
  const promiseData = firstValueFrom(observable);
  promiseData.then(value => successCallBack())
  .catch(error => errorCallBack(error));

  return (await promiseData).roles;
  }

} 