import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
 // readonly rootURL = 'http://localhost:53520/api';
//readonly rootURL = 'https://localhost:44317/api';
// readonly rootURL = 'https://genericcrudwebapp.azurewebsites.net/api';
readonly rootURL = 'https://gencrudcore31apiapp.azurewebsites.net/api';

 constructor(private http: HttpClient) { }



 getItem(id: number) {
   const headers = new HttpHeaders().set('Content-Type', 'application/json');
   headers.append("access-control-allow-methods", "POST, PUT, DELETE, GET, OPTIONS");

   var url = this.rootURL + '/Generic/GetItemById?id=' + id;

   var ret = this.http.get<any>(url);

   return ret;
 }

 getItems(entName: string) {
   const headers = new HttpHeaders().set('Content-Type', 'application/json');
   headers.append("access-control-allow-methods", "POST, PUT, DELETE, GET, OPTIONS");
   var url = this.rootURL + '/Generic/GetItems?entName=' + entName;

   var ret = this.http.get<any>(url);

   return ret;
 }

 getItemsSql(ent: string, id: string) {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  headers.append("access-control-allow-methods", "POST, PUT, DELETE, GET, OPTIONS");

  var obj = new ApiSend();
  obj.p_entity = ent;
  obj.p_entity_sql = ent;
  obj.p_sqlWhere = "id = " + id;
  obj.p_entity_sql = ent;

  var url = this.rootURL + '/Generic/GetItemsSQL';
  var ret = this.http.post<any>(url,obj);

  return ret;
}

updateItem(ent: string, id: string, fldName:string, data:any) {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  var headers2 = new HttpHeaders().set('Content-Type', 'application/json');
  headers.append("access-control-allow-methods", "POST, PUT, DELETE, GET, OPTIONS");
  let options = {
    headers: headers
}; 
  var obj = new ApiSendSave();

  obj.p_entity=ent;
  obj.p_recId=id;
  obj.p_primeKey=fldName;
  obj.record = data
  var url2 = this.rootURL + '/Generic/UpdateItem';

  var ret = this.http.post(url2,obj,options);
  return ret;
}
deleteItem(ent: string, id: string, fldName:string, data:any) {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  var headers2 = new HttpHeaders().set('Content-Type', 'application/json');
  headers.append("access-control-allow-methods", "POST, PUT, DELETE, GET, OPTIONS");
  let options = {
    headers: headers
}; 
  var obj = new ApiSendSave();

  obj.p_entity=ent;
  obj.p_recId=id;
  obj.p_primeKey=fldName;
  obj.record = data
  var url2 = this.rootURL + '/Generic/DeleteItem';

  var ret = this.http.post(url2,obj,options);
  return ret;
}

updateItem2(ent: string, id: string, fldName:string, data:any) {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  headers.append("access-control-allow-methods", "POST, PUT, DELETE, GET, OPTIONS");

  var obj = new ApiSend();
  obj.p_entity = ent;
  obj.p_entity_sql = ent;
  obj.p_sqlWhere = "id = " + id;
  obj.p_entity_sql = ent;

  var url = this.rootURL + '/Generic/GetItemsSQL';
  var ret = this.http.post<any>(url,obj);

  return ret;
}




}



export class ApiSend  {

  p_entity: string;
  p_entity_sql: string;
  p_sqlWhere: string;
  p_sqlOrder: string;
  p_returnTarget: string;
}
export class ApiSendSave  {

  p_entity: string;
  p_recId: string;
  // p_fldName: string;
  p_primeKey: string;
  // p_returnTarget: string;
  record: any
}
