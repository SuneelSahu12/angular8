import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatDialog , MatDialogConfig} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/employee-model';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';
import { AddEmpComponent } from '../add-emp/add-emp.component';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(
    private empService: EmployeeService,
    private empDialog : MatDialog,
    private empSnackBar: MatSnackBar
  ) { }

  empDisplayColumns: string[] = ['Options','EmployeeID', 'EmployeeName', 'Department', 'MailID', 'DOJ']
  empListData = new MatTableDataSource<any>();
  ngOnInit(): void {
    this.refreshEmpList();
  }
  refreshEmpList(){
    this.empService.getEmpList().subscribe(data => {
      this.empListData = new MatTableDataSource(data);
      //this.empListData.sort = this.sor
    })
  }

 
  onDelete(id: number){
    if (confirm('Are you sure to delete ??')) {
      this.empService.deleteEmployee(id).subscribe(res=> {
          this.refreshEmpList();
          this.empSnackBar.open(res.toString(),'',{ duration:3000, verticalPosition:'top' });
      })
    }
    
  }

  onAdd(){
    const dialogconfig = new MatDialogConfig();
      dialogconfig.disableClose = true;
      dialogconfig.autoFocus = true;
      dialogconfig.width = "70%";
      this.empDialog.open(AddEmpComponent,dialogconfig);
  }

  onEdit(dep: Employee){
    this.empService.empFormData = dep;
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = true;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "70%";
    this.empDialog.open(EditEmpComponent,dialogconfig);
  }
}
