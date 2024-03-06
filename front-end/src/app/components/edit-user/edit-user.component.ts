import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from 'src/app/services/ui.service';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  color: ThemePalette = 'warn';
  public results: any; // Change it private to public
  public mymessage: any;

durationInSeconds= 3;  


constructor(public ui: UiService,
  public dialogRef: MatDialogRef<EditUserComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private taskService: TaskService, private _snackBar: MatSnackBar
) {
  console.log('data',this.data)
}

editUsers() {
  if(this.data.user == '') {
    return;
  }

  const url = `users/edit/${this.data.id}`
this.taskService.editUser(this.data).subscribe((data: any) => {
  this.ui.openSnackBar('User was modified')
  console.log(data)
  this.dismiss()
});
}

dismiss() {
  this.dialogRef.close(this.data)
}

}
