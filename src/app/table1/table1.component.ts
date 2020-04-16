import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
// import { Component, OnInit, ViewChild } from '@angular/core';
   import { Item, EntityVariables, EntityVariablesItems } from './tableConfigData';

   
import { Columns, API, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';
import { GenericService } from '../services/generic.service';
import {TableFunctionsService} from './table-functions';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class Table1Component {
  @ViewChild('table', { static: true }) table: APIDefinition;
  public columns: Columns[] = [];
  public entKeyField: string = "id";
  public data: any[] = [];
  public configuration: Config;
  public items: Item[] = EntityVariables.entityListItems;
  public selectedItem: Item = this.items[0];
  public entity: string;
  public currentItem: any;
  public currentItemUpdate: any;
  public currentItemCloneFields: any;
  public currentDataArray: any = [];
  public currentItemIndex: any;
  public currentItemFieldSequence: any = [];
  public currentItemKeys: string[] = [];
  //public currentRowData: any;


  constructor(private genericService: GenericService, private tableFunctions: TableFunctionsService, private toastrService: ToastrService) {
    var test = this.table;
      }
  ngOnInit(): void {
 
    this.configuration = { ...DefaultConfig };
    this.configuration.rows = 2;
    this.configuration.paginationEnabled = false;
    this.configuration.infiniteScroll = true;
    this.configuration.tableLayout.striped = true;
    this.entity = "tbl_contacts";
  //  this.LoadItems("tbl_contacts");

    var ret = this.tableFunctions.DoChangeColumns(this.entity);
    this.columns = ret.columns;
    this.entKeyField = ret.keyField;
    this.LoadItems(this.selectedItem.name);

  }

  LoadItems(entName: string) {

    this.genericService.getItems(entName).subscribe((data) => {

    // this.data = data.result;
     this.data = data;
      this.currentItemFieldSequence = this.data[0];

      this.currentItem = this.data[0];
      this.currentItemCloneFields = Object.assign({}, this.currentItem);
      let currItemKeys = Object.keys(this.currentItem);
     this.currentItemKeys= [];
     for (var prop of currItemKeys) { 
       this.currentItemKeys.push(prop);
     }


      this.doAdd();
    }),
      err => {
        console.log(err);
      }
  }
  onChange(name: string): void {
    this.table.apiEvent({
      type: API.onGlobalSearch, value: name,
    });
  }
  onSelect(productId) { 
    this.selectedItem = null;
    for (var i = 0; i < this.items.length; i++)
    {
      if (this.items[i].id == productId) {
        this.selectedItem = this.items[i];
      }
    }
    this.entity = this.selectedItem.name;
    
    var ret = this.tableFunctions.DoChangeColumns(this.selectedItem.name);
    this.columns = ret.columns;
    this.entKeyField = ret.keyField;
        this.LoadItems(this.selectedItem.name);
        console.log(this.selectedItem);
}
eventEmitted($event: { event: string, value: any }): void {
 // this.clicked = JSON.stringify($event, null, 2);
 if($event.value.row) {
  this.currentItem = $event.value.row;
  //this.currentItemArray =[];
 // this.currentItemArray.push(this.currentItem);

 this.currentItemCloneFields = Object.assign({}, this.currentItem);
 let currItemKeys = Object.keys(this.currentItem);
this.currentItemKeys= [];
for (var prop of currItemKeys) { 
  this.currentItemKeys.push(prop);
}

  this.currentItemIndex = $event.value.rowId;
  console.log('$event', $event);
}
}
trackByFn(index: any, item: any) {
  return index;
}

doSave(entName:string, id:any){
  var test = this.currentItem;
  this.UpdateItem(entName,id,'id',test);

}
doDelete(index:any){
  var testIndex= this.currentItemIndex
  var test = this.currentItem;
  var ent = this.entity;
  let curId = this.currentItem[this.entKeyField];
  this.deleteItem(ent,curId,this.entKeyField,test, index);
  this.toastrService.error('Have a nice day.', "Item Deleted.", {timeOut: 3000});
}
doAdd(){

  let currItemKeys = Object.keys(this.currentItem);
  //this.currentItem = null;

  this.currentItemKeys= [];
  for (var prop of currItemKeys) { 
    this.currentItemKeys.push(prop);
  }
  this.currentItem = new Object();

 this.currentItem[this.entKeyField] = "0";

}
UpdateItem(ent: string, id: string, fldName:string, dataEdit:any) {
  ent = this.entity;

  this.genericService.updateItem(ent, id, fldName, dataEdit).subscribe((data) => {
   var test = data;
//this.currentDataArray = test;
this.currentItemUpdate = test;
let curId = this.currentItemUpdate[this.entKeyField];
   //this.currentRowData = data;
   var curRowItem = this.data[this.currentItemIndex];
   if(id=="0"){
    this.addRow(test);
    this.toastrService.info('Have a nice day.', "Item Added.", {timeOut: 3000});
   } else {
    let obj = this.data.find(obj => obj[this.entKeyField] == curId);
    let objIndex = this.data.indexOf(obj);

   this.setTableItem(objIndex);
   this.toastrService.success('Have a nice day.', "Item Saved.", {timeOut: 3000});
   }
   
  }),
    err => {
      console.log(err);
    }
}
deleteItem(ent: string, id: string, fldName:string, data:any, index:any) {
  ent = this.entity;

  this.genericService.deleteItem(ent, id, fldName, data).subscribe((data) => {
   var test = data;
    this.remove(this.currentItemIndex);
   
  }),
    err => {
      console.log(err);
    }
}
setTableItem(editIndex: number): void {
  this.data = [...this.data.map((obj, index) => {
    if (index === editIndex) {
  //  obj = updatedItem;
     return this.currentItemUpdate;
    }

  return obj;
  })];
 // this.currentItemIndex =-1
}

addRow(addedItem:any): void {
  this.data = [
    ...this.data,
    
    addedItem,
  ];
}
remove(rowIndex: number): void {
  this.data = [...this.data.filter((_v, k) => k !== rowIndex)];
}

}
