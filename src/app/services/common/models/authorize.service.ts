import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Authorize_Menu } from 'src/app/contracts/authorize-configurations/authorize_menu';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor(private httpClientService:HttpClientService
    ) { }

  async getAuthorizeDefinitionEndpoints(){
    const observable : Observable<Authorize_Menu[]> = this.httpClientService.get<Authorize_Menu[]>({
      controller:"AuthorizeServices",
     
    });

    return await firstValueFrom(observable)
  }
}
