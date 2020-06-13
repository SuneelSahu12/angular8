import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {

  constructor(
    public dialogbox: MatDialogRef<EditEmpComponent>,
    public service:EmployeeService,
    public snackBar: MatSnackBar
  ) { }
  public listItems: Array<string> = [];
  ngOnInit(): void {
   // this.resetForm();
    this.dropdownRefresh();
  }
  resetForm(form?:NgForm){
    if(form != null)
      form.resetForm();

      this.service.empFormData = {
        EmployeeID:0,
        EmployeeName:'',
        Department:'',
        MailID:'',
        DOJ:null
      }
  }
  dropdownRefresh(){
    this.service.getDepDropDownValues().subscribe(data => {
      data.forEach(element => {
       this.listItems.push(element["DepartmentName"]);     
      });
    }) 
   }

  onClose()
  {
    this.dialogbox.close();
    this.service.filter('Register click');
  }
  onSubmit(form: NgForm){
   this.service.updateEmployee(form.value).subscribe(res => {
   //  this.resetForm(form);
     this.snackBar.open(res.toString(),'',{ duration:5000, verticalPosition:'top' });
     //alert(res);
   })
  }

}
