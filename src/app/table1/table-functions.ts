import { Injectable } from '@angular/core';
import { Item, EntityVariables, EntityVariablesItems, EntityData } from './tableConfigData';


@Injectable({
  providedIn: 'root'
})
export class TableFunctionsService {

  constructor() { 

    this.columns = EntityVariables.entityGridColumns;
    this.retVal =  EntityVariables.entityGridColumns;
 
  }

  public entKeyField: any;
  public columns:any;  
  public retVal: any;


  DoChangeColumns(entName: string){

    
    var ret = new retObject();
    let obj = this.retVal.find(obj => obj["name"] == entName);
    ret.columns = obj.columns;
    ret.keyField = obj.entKeyField;
    return ret;
  }


}

export class retObject {
keyField: string;
columns: any;

}
