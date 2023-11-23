import { Component,OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {BaseComponent, NgxSpinerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
 
  constructor(spinner:NgxSpinnerService) {
    super(spinner);
    
  }
  ngOnInit(): void {
   this.showNgxSpinner(NgxSpinerType.BallSpinFadeRotating)
  }
} 