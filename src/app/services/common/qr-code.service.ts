import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private httpClientService:HttpClientService) { }

  async generateQrCode(productId:string){
    const observable: Observable<Blob> = this.httpClientService.get({
      controller:"products",
      action:"qrcode",
      responseType:'blob' //request neticesinde elde edilen veri blob dosyadır //json değil default json
    },productId);

    return await firstValueFrom(observable);
  }
}
