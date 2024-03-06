import { Component } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { UiService } from 'src/app/services/ui.service';
import { Router} from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
  }
}



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  color: ThemePalette = 'primary';
authFail!: string;
user!: string;
password!: string;
admin!: Boolean

newUser = {
  username: '',
  password: '',
  admin: false
}

userFormControl = new FormControl('', [Validators.required]);
passwordFormControl = new FormControl('', [Validators.required]);

matcher = new MyErrorStateMatcher();

constructor(private ui: UiService, private taskService: TaskService, public router: Router) {}

createNewUser() {
  console.log(this.newUser)
  if(this.newUser.username == '' || this.newUser.password == '' ) {
    return;
  }

  this.taskService.createUser(this.newUser).subscribe((response: any) => {
    if(response.success == true) {
    
     this.ui.openSnackBar('User Created')
     this.router.navigate(['/clients'])
    }
    console.log(response);
  }, error => {
    console.log("error", error.error.message);
    this.authFail = error.error.message;
    

  })

}
}

