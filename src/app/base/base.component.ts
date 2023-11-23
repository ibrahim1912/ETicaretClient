import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {
  constructor(private spinner:NgxSpinnerService) { }
  
  showNgxSpinner(ngxSpinnerNameType:NgxSpinerType){
    this.spinner.show(ngxSpinnerNameType);

    setTimeout(() => this.hideNgxSpinner(ngxSpinnerNameType),2000);
  }

  hideNgxSpinner(ngxSpinnerNameType:NgxSpinerType){
    this.spinner.hide(ngxSpinnerNameType);
  }
 

}

export enum NgxSpinerType{
  BallAtom="atom",
  BallScaleMultiple = "scale",
  BallSpinFadeRotating = "fade"

}


