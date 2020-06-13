import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from 'src/app/models/department-model';
import { DepartmentService } from 'src/app/services/department.service';
import { AddDepComponent  } from 'src/app/department/add-dep/add-dep.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDepComponent } from '../edit-dep/edit-dep.component';
import { MatSort } from '@angular/material/sort'

// export interface PeriodicElement {
//   Options: number;
//   DepartmentID: number;
//   DepartmentName: string;
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   { Options: 1, DepartmentID: 1, DepartmentName: 'IT'},
//   { Options: 2, DepartmentID: 2, DepartmentName: 'Finance'}
 
// ];

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(
    private service: DepartmentService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) {
    this.service.listen().subscribe(m=>{
      console.log(m);
      this.refreshDepList();
    })

   }
  
  displayedColumns: string[] = ['Options', 'DepartmentID', 'DepartmentName'];
  //dataSource = ELEMENT_DATA;
   listData = new MatTableDataSource<any>();
  // displayedColumns : string[] = ['Option', 'DepartmentID', 'DepartmentOptions'];
@ViewChild(MatSort,{ static: false}) sort:MatSort;

  ngOnInit(): void {
    this.refreshDepList();
  }

    refreshDepList()
    {
      this.service.getDepList().subscribe(data => {
        this.listData = new MatTableDataSource(data);
        this.listData.sort = this.sort;
      });
      // var dummyData =  [
      //     { Options: 1, DepartmentID: 1, DepartmentName: 'IT'},
      //      { Options: 2, DepartmentID: 2, DepartmentName: 'Finance'}
      //   ];
      //   this.listData = new MatTableDataSource(dummyData);
    }
    onEdit(dep: Department){
      this.service.formData = dep;
      const dialogconfig = new MatDialogConfig();
      dialogconfig.disableClose = true;
      dialogconfig.autoFocus = true;
      dialogconfig.width = "70%";
      this.dialog.open(EditDepComponent,dialogconfig);
    }
    onDelete(id: number){
      if (confirm('Are you sure to delete ??')) {
        this.service.deleteDepartment(id).subscribe(res=> {
            this.refreshDepList();
            this.snackBar.open(res.toString(),'',{ duration:3000, verticalPosition:'top' });
        })
      }
    }

    onAdd(){
      const dialogconfig = new MatDialogConfig();
      dialogconfig.disableClose = true;
      dialogconfig.autoFocus = true;
      dialogconfig.width = "70%";
      this.dialog.open(AddDepComponent,dialogconfig);
    }
}
