import { Component, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/task.service';
import {MatDialog} from '@angular/material/dialog';
import { UiService } from 'src/app/services/ui.service';
import { MatTableDataSource } from '@angular/material/table';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DelUserComponent } from '../del-user/del-user.component';
import { Router } from '@angular/router';

export interface PeriodicElement {
  position: number;
  user: string;
  admin: Boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [

]

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  displayedColumns: string[] = ['position', 'user','Admin','dateCreated', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  showEditUser: boolean = false;
  subscription!: Subscription;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  @Input() data: any

  constructor(private taskService: TaskService,public ui: UiService, public dialog: MatDialog, private router: Router) {
  }



  openEditDialog(element : any) {
    const dialogRef =  this.dialog.open(EditUserComponent,
      {
        data: element
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
      console.log(result)
      // console.log('The dialog was closed');
      // this.name = result;
      // this.surname = result;
      // this.contact = result;
    });
  }

  openDelDialog(element:any) {
    const dialogRef =  this.dialog.open(DelUserComponent,
      {
        data: element
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`)
        console.log(result)
        // console.log('The dialog was closed');
        // this.name = result;
        // this.surname = result;
        // this.contact = result;
      });
    }

      ngOnInit() {
        console.log(this.data)
        this.taskService.displayUser().subscribe((data: any) => {
    
          console.log(data)
          this.dataSource = new MatTableDataSource(data)
        },error => {
            this.router.navigateByUrl('login')
            this.ui.openSnackBar("Session timed out!!!")
        });
    
      }
    
      deleteClient(data: any) {
        console.log(data)
        const url = `users/${data._id}`
        this.taskService.deleteUser(data._id).subscribe((data: any) => {
          console.log(data)
    
        });
    
    
      }
    
    };

  

