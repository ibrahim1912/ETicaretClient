import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
 
import { RegisterModule } from './register/register.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { UserComponent } from './user/user.component';
import { UserModule } from './user/user.module';

 



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ProductsModule,
    BasketsModule,
    HomeModule,
    RegisterModule,
    PasswordResetModule,
    UpdatePasswordModule

  ],
  exports:[
    BasketsModule, //ana sayfada app-basket kullanmak için bunu ekledik,
    UserModule
  ]
})
export class ComponentsModule { }
