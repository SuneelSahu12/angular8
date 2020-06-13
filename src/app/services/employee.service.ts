import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee-model';
import { HttpClient } from '@angular/common/http';
import { observable, Subject, Observable } from 'rxjs';
import { Department } from '../models/department-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  empFormData: Employee;

  readonly APIUrl = "http://localhost/WebAPI/api";

  getEmpList() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.APIUrl+'/Employee');
  }
  addEmployee(dep:Employee){
    return this.http.post(this.APIUrl+'/Employee', dep);
  }

  
  deleteEmployee(id: number)
  {
    return this.http.delete(this.APIUrl+'/Employee/'+id);
  }

  updateEmployee(dep: Employee){
    return this.http.put(this.APIUrl+'/Employee', dep);
  }

  getDepDropDownValues(): Observable<any>{
    return this.http.get<Department[]>(this.APIUrl+'/Department');
  }

  private _listners = new Subject<any>();
    listen(): Observable<any>
    {
      return this._listners.asObservable();
    }
    filter(filterBy: string){
      this._listners.next(filterBy);
    }
}
 