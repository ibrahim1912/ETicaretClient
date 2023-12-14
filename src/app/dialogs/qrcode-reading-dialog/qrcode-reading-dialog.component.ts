import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrCodeService } from 'src/app/services/common/qr-code.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinerType } from 'src/app/base/base.component';

declare var $ :any;

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.scss'],
})
export class QrcodeReadingDialogComponent
  extends BaseDialog<QrcodeReadingDialogComponent>
  implements OnInit, OnDestroy
{
  scanInterval: number = 2000;
  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private spinner: NgxSpinnerService,
   private toastrService:CustomToastrService,
   private productService:ProductService
  ) {
    super(dialogRef);
  }

  @ViewChild('scanner', { static: true }) scanner: NgxScannerQrcodeComponent;
  @ViewChild('txtStock', { static: true }) txtStock: ElementRef;

  ngOnInit(): void {
    this.scanner.start();
  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }

  onEvent(e) {
    this.spinner.show(NgxSpinerType.BallAtom)
    const data:any= (e[0] as { value: string }).value;
    const jsonData = JSON.parse(data);
    const stockValue = (this.txtStock.nativeElement as HTMLInputElement).value;
    this.disableScannerForAWhile(2000);

    this.productService.updateStockQrCodeToProduct(jsonData.Id,parseInt(stockValue), () => {
      this.toastrService.message(`${jsonData.Name} ürünün stok bilgisi   ${jsonData.Stock}  olarak güncellenmiştir`,"Stok Başarıyla Güncellendi", {
        messageType:ToastrMessageType.Success,
        positon:ToastrPosition.TopRight
      });

      this.spinner.hide(NgxSpinerType.BallAtom)
    });
  }

  disableScannerForAWhile(time: number): void {
    // Scanner'ı belirli bir süre boyunca devre dışı bırak
    this.scanner.pause();
    setTimeout(() => {
      // Belirli süre sonra scanner'ı tekrar etkinleştir
      this.scanner.play();
    }, time); // Örneğin, 2 saniye sonra tekrar etkinleştir
  }
}
