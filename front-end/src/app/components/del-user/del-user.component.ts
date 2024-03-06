import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/task.service';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-del-user',
  templateUrl: './del-user.component.html',
  styleUrls: ['./del-user.component.css']
})
export class DelUserComponent {




  constructor(public ui: UiService, private taskService: TaskService, public dialogRef: MatDialogRef<DelUserComponent>,  @Inject(MAT_DIALOG_DATA) public data: any, private router: Router
) {
  console.log('data',this.data)
}

deleteUser() {

  const url = `users/${this.data._id}`
  this.taskService.deleteUser(this.data.id).subscribe((data: any) => {
    this.ui.openSnackBar('User deleted')
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

openSnackBar() {
  this.ui.openSnackBar('message')
}
}