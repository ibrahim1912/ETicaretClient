import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { DialogService } from 'src/app/services/common/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { NgxSpinerType } from 'src/app/base/base.component';

const RESOURCE_URL = 'resourceUrl';

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrls: ['./qrcode-dialog.component.scss']
})


export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner:NgxSpinnerService,
    private qrCodeService:QrCodeService,
    private domSanitizer:DomSanitizer
  ) {
    super(dialogRef);
  }

  qrCodeSafeUrl:SafeUrl;


  async ngOnInit() {
    this.spinner.show(NgxSpinerType.BallAtom);
    const qrCodeBlob:Blob = await this.qrCodeService.generateQrCode(this.data); //byte dizisi değil blob olarak elde edilcek

    //url e dönüştürcez png byte dizi olarak cliente dönülüyor.Biz object url e dönüştürcez.
    //Bunu htmlin image nesnesinde source olarak kullancaz

    const url = URL.createObjectURL(qrCodeBlob);
    //this.qrCodeSafeUrl = this.domSanitizer.bypassSecurityTrustHtml(url); //güvenilir safe url dönmüş olcak
    this.qrCodeSafeUrl= this.domSanitizer.bypassSecurityTrustResourceUrl(url)

    this.spinner.hide(NgxSpinerType.BallAtom);
  }
}


 