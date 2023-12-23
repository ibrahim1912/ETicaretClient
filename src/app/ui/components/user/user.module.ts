import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:UserComponent}
    ]),
    FormsModule
  ],
  exports:[
    UserComponent //ana sayfada app-baskets kullandık o yuzden bunu ekledik
  ]
})
export class UserModule { }
