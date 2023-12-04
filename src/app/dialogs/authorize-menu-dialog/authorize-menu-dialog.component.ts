import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/common/models/role.service';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { MatSelectionList } from '@angular/material/list';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss'],
})

export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService:RoleService,
    private authorizationEndpointService:AuthorizationEndpointService,
    private spinner:NgxSpinnerService
  ) {
    super(dialogRef);
    
  }
  
  roles: { datas: List_Role[], totalCount: number };
  assignedRoles: Array<string>;
  listRoles: { name: string, selected: boolean }[];

  async ngOnInit() {
    this.assignedRoles = await this.authorizationEndpointService.getRolesToEndpoint(this.data.code, this.data.menuName);

    this.roles = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.roles.datas.map((r: any) => {
      return {
        name: r.name,
        selected: this.assignedRoles?.indexOf(r.name) > -1
      }
    });
  }

  assignRoles(rolesComponent:MatSelectionList){
    const roles:string[] =  rolesComponent.selectedOptions.selected.map(o=>o._elementRef.nativeElement.innerText);
    this.spinner.show(NgxSpinerType.BallAtom);
    this.authorizationEndpointService.assignRoleEndpoint(roles,this.data.code as string,this.data.menuName as string,
      () => {
        this.spinner.hide(NgxSpinerType.BallAtom);
      }, error => {

      });

  };
}

export enum AuthorizeMenuState {
  Yes,
  No,
}
 