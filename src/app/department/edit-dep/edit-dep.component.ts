import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/department.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-dep',
  templateUrl: './edit-dep.component.html',
  styleUrls: ['./edit-dep.component.css']
})
export class EditDepComponent implements OnInit {

  constructor(
    public dialogbox: MatDialogRef<EditDepComponent>,
    public service:DepartmentService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  resetForm(form?:NgForm){
    if(form != null)
      form.resetForm();

      this.service.formData = {
        DepartmentID:0,
        DepartmentName:null
      }
  }
  onClose()
  {
    this.dialogbox.close();
    this.service.filter('Register click');
  }
  onSubmit(form: NgForm){
   this.service.updateDepartment(form.value).subscribe(res => {
   //  this.resetForm(form);
     this.snackBar.open(res.toString(),'',{ duration:5000, verticalPosition:'top' });
     //alert(res);
   })
  }
}
