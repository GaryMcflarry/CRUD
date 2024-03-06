import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {
  
public results: any; // Change it private to public
 public mymessage: any;


durationInSeconds= 3;  

  constructor(public ui: UiService,
    public dialogRef: MatDialogRef<EditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private taskService: TaskService, private _snackBar: MatSnackBar, private router: Router
  ) {
    console.log('data',this.data)
  }

  editClient() {
    if(this.data.name == '' || this.data.surname == '' || this.data.contact == '') {
      return;
    }

    const url = `clients/edit/${this.data.id}`
  this.taskService.editClient(this.data).subscribe((data: any) => {
    this.ui.openSnackBar('Client was modified')
    console.log(data)
    this.dismiss()
  }, error => {
    this.router.navigateByUrl('login')
    this.ui.openSnackBar("Session timed out!!!")
});
  }
    

  dismiss() {
    this.dialogRef.close(this.data)
  }
    
   
  }


  





