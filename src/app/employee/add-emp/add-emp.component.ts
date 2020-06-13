import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/department.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatCalendar} from '@angular/material/datepicker';
 
@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  constructor(
    public dialogbox: MatDialogRef<AddEmpComponent>,
    public service:EmployeeService,
    public snackBar: MatSnackBar
   // public picker : MatDatepicker
  ) { }

  public listItems: Array<string> = [];

  ngOnInit(): void {
    this.resetForm();
    this.dropdownRefresh();
  }

dropdownRefresh(){
 this.service.getDepDropDownValues().subscribe(data => {
   data.forEach(element => {
    this.listItems.push(element["DepartmentName"]);     
   });
 }) 
}

  resetForm(form?:NgForm){
    if(form != null)
      form.resetForm();

      this.service.empFormData = {
        EmployeeID : 0, 
        EmployeeName:'',
        Department: '',
        MailID:'',
        DOJ : null
      }
  }
  onClose()
  {
    this.dialogbox.close();
    this.service.filter('Register click');
  }
  onSubmit(form: NgForm){
   this.service.addEmployee(form.value).subscribe(res => {
     this.resetForm(form);
     this.snackBar.open(res.toString(),'',{ duration:3000, verticalPosition:'top' });
     //alert(res);
   })
  }
}
