import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/task.service';
import {MatDialog} from '@angular/material/dialog';
import { DelClientComponent } from '../del-client/del-client.component';
import { UiService } from 'src/app/services/ui.service';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  position: number;
  name: string;
  surname: string;
  contact: string;  
}

const ELEMENT_DATA: PeriodicElement[] = [

]

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

  // selectedClientId: string;

export class ClientComponent {
    displayedColumns: string[] = ['position', 'name', 'surname', 'contactNr', 'dateCreated', 'actions'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    showEditClient: boolean = false;
    subscription!: Subscription;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



    displayUser= {
      name: '',
      surname: '',
      contact: '',
    }
    
    @Input() data: any

    constructor(private taskService: TaskService,public ui: UiService, public dialog: MatDialog) {
    }

    openDialog(element:any) {
      const dialogRef =  this.dialog.open(DelClientComponent,
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
      this.taskService.displayClient().subscribe((data: any) => {

        console.log('Client data', data)
        this.dataSource = new MatTableDataSource(data)
      });

    }

    deleteClient(data: any) {
      console.log(data)
      const url = `clients/${data._id}`
      this.taskService.deleteClient(data._id).subscribe((data: any) => {
        console.log(data)

      });


    }

    openSnackBar() {
      this.ui.openSnackBar('Congrats you Yeeted')
    }




    }

