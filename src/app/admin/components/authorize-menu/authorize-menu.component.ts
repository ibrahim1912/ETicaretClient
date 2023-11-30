import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import {FlatTreeControl} from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AuthorizeService } from 'src/app/services/common/models/authorize.service';
import { Authorize_Menu } from 'src/app/contracts/authorize-configurations/authorize_menu';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AuthorizeMenuDialogComponent } from 'src/app/dialogs/authorize-menu-dialog/authorize-menu-dialog.component';


@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.scss']
})
export class AuthorizeMenuComponent extends BaseComponent implements OnInit{

  constructor(spinner:NgxSpinnerService,
    private authorizeService:AuthorizeService,
    private dialogService:DialogService){
    super(spinner)
    
  }

  async ngOnInit() {
    this.dataSource.data = await (await this.authorizeService.getAuthorizeDefinitionEndpoints())
      .map(m=> {
        const treeMenu:ITreeMenu = {
          name : m.name,
          authorizeActions : m.authorizeActions.map(a => {
            const _treeManu : ITreeMenu = {
              name : a.definition,
              code : a.code
            }
            return _treeManu;
          })
        };
        return treeMenu;
      });
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    (menu: ITreeMenu, level: number) => {
      return {
        expandable: menu.authorizeActions?.length > 0,
        name: menu.name,
        level: level,
        code: menu.code
      };
    },
    menu => menu.level,
    menu => menu.expandable,
    menu => menu.authorizeActions
    
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  assignRole(code:string,name:string){
    this.dialogService.openDialog({
      componentType:AuthorizeMenuDialogComponent,
      data:{code:code,name:name},
      options:{
        width:"750px",
       
      },
      afterClosed:() => {

      }
    });
  }
}



interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface ITreeMenu{
  name?:string,
  authorizeActions?:ITreeMenu[],
  code?:string
}
// interface FoodNode {
//   name: string;
//   children?: FoodNode[];
// }

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruit',
//     children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
//   },
//   {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
//       },
//       {
//         name: 'Orange',
//         children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
//       },
//     ],
//   },
// ];