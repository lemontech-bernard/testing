//shared class(es) across multiple components


import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  //property instance of Employee Model class
  //this will be used to design the webform inside the employee component -- inject EmployeeService on app.module.ts under 'providers'
  formData: Employee;
  //property instance to hold the array of Employee Model class
  listData: Employee[];
  //readonly variable for WebAPI Controller URL
  readonly rootURL = 'http://localhost:58843/api';

  constructor( private http: HttpClient ) { }

  //CREATE: class method to use WebAPI Controller PostEmployee Method
  postEmployee(formData: Employee){
    //use HttpClient class: 
    // - first paramater: URL WebAPI Controller Method(s) e.g. line#73: POST: api/Employee
    // - second paramter: method object (e.g., employee)
    //this function returns an observable
    return this.http.post(this.rootURL+'/Employee', formData);
  }

  //UPDATE: class method to use WebAPI Controller PutEmployee Method
  putEmployee(formData: Employee){
    //use HttpClient class: 
    // - first paramater: URL WebAPI Controller Method(s) e.g. line#38: PUT: api/Employee/5
    // - second paramter: method object (e.g., employee)
    //this function returns an observable
    return this.http.put(this.rootURL+'/Employee/'+formData.EmpID, formData);
  }  

  //DELETE: class method to use WebAPI Controller PutEmployee Method
  deleteEmployee(id: number){
    //use HttpClient class: 
    // - first paramater: URL WebAPI Controller Method(s) e.g. line#88: DELETE: api/Employee/5
    // - second paramter: method object (e.g., employee)
    //this function returns an observable
    return this.http.delete(this.rootURL+'/Employee/'+id);    
  }

  //RETRIEVE: class method to use WebAPI Controller GetEmployee Method
  loadList(){
    //use HttpClient class: 
    // - first paramter: URL WebAPI Controller Method e.g., line#27: GET: api/Employee
    // - second paramter: method object
    this.http.get(this.rootURL+'/Employee')
    .toPromise().then( response => this.listData = response as Employee[])
  }
}
