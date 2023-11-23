import { Component,OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, NgxSpinerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
 
  constructor(spinner:NgxSpinnerService) {
    super(spinner);
    
  }
  ngOnInit(): void {
   this.showNgxSpinner(NgxSpinerType.BallSpinFadeRotating)
  }
}
