import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinerType } from 'src/app/base/base.component';
 

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  
  constructor(
    private httpClientService:HttpClientService,
    private alertify:AlertifyService,
    private toastr:CustomToastrService,
    private dialog:MatDialog,
    private dialogService:DialogService,
    private spinner:NgxSpinnerService ) { }
    
  public files: NgxFileDropEntry[];

  @Input() options:Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType:FileUploadDialogComponent,
      data:FileUploadDialogState.Yes,
      afterClosed : () => {
        this.spinner.show(NgxSpinerType.BallAtom)
        this.httpClientService.post({
          controller: this.options.controller,
          action:this.options.action,
          queryString:this.options.queryString,
          headers : new HttpHeaders({"responseType" : "blob"})
        }, fileData).subscribe(data => {
          const successMessage:string = "Dosyalar başarıyla yüklenmiştir.";

          this.spinner.hide(NgxSpinerType.BallAtom)
          if(this.options.isAdminPage){
            this.alertify.message(successMessage, {
              dismissOthers:true,
              messageType:MessageType.Success,
              position:Position.BottomRight
            })
          }else{
            this.toastr.message(successMessage,"Başarılı",{
              messageType:ToastrMessageType.Success,
              positon:ToastrPosition.BottomRight
            })
          }
          
        }, (errorResponse) => {
    
          const errorMessage:string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır.";
           if(this.options.isAdminPage){
            this.alertify.message(errorMessage,{
              dismissOthers:true,
              messageType:MessageType.Error,
              position:Position.BottomRight
            })
          }else{
            this.toastr.message(errorMessage,"Başarısız",{
              messageType:ToastrMessageType.Error,
              positon:ToastrPosition.BottomRight
            })
          }
        });
      }
    });
  }

 
}

  


export class FileUploadOptions{
  controller?:string;
  action?:string;
  queryString?:string;
  explanation?:string;
  accept?:string;
  isAdminPage?:boolean=false;
  
}