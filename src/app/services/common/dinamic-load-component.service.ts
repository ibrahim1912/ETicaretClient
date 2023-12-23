import {  ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class DinamicLoadComponentService { //uygulama üzerüinde dinmamik olarak bir componenti yüklemek istedğimizde devreye girecek herhangi bir component için

  constructor( /*private componentFactoryResolver:ComponentFactoryResolver,*/ 
  /*private viewContainer: ViewContainerRef*/) { }

  async loadComponent(component:ComponentType,viewContainerRef: ViewContainerRef){
    let _component:any=null;
    
    switch(component){
      case ComponentType.BasketsComponent:
        _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
        break;
      case ComponentType.UserComponent:
        _component = (await import("../../ui/components/user/user.component")).UserComponent;
        break;
    }

    viewContainerRef.clear();
    //return viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(_component));
    return viewContainerRef.createComponent(_component);
  }
}

export enum ComponentType{
  BasketsComponent,
  UserComponent
}