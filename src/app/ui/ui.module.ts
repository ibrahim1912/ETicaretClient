import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports:[
    ComponentsModule //ana sayfada app-basket kullanmak için bunu ekledik
  ]
    
})
export class UiModule { }
