import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from 'src/app/services/department.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.css']
})
export class AddDepComponent implements OnInit {

  constructor(
    public dialogbox: MatDialogRef<AddDepComponent>,
    public service:DepartmentService,
    public snackBar: MatSnackBar
    )
     { }

  ngOnInit(): void {
    this.resetForm();
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
   this.service.addDeparment(form.value).subscribe(res => {
     this.resetForm(form);
     this.snackBar.open(res.toString(),'',{ duration:3000, verticalPosition:'top' });
     //alert(res);
   })
  }
}
