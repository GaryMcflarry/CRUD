import { Component } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { UiService } from 'src/app/services/ui.service';
import { Router} from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Token } from '@angular/compiler';
import jwtDecode from 'jwt-decode';
import { userService } from 'src/app/allServices/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
  }
}


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
user!: string;
password!: string;
authFail!:string;
newUser = {
  username: '',
  password: '',
}


userFormControl = new FormControl('', [Validators.required]);
passwordFormControl = new FormControl('', [Validators.required]);

matcher = new MyErrorStateMatcher();

  constructor(private ui: UiService, private userService: userService, private taskService: TaskService, public router: Router) {}

  loginUser() {
    if(this.newUser.username == '' || this.newUser.password == '') {
      return;
    }
    this.taskService.loginUser(this.newUser).subscribe((response: any) => {
      if(response.success == true) {
      this.userService.setUser(response.data)
      
      this.newUser
      this.ui.openSnackBar('Authorization Successful')
      this.router.navigate(['/clients'])

        

      
    } 
    console.log("response", response);
  }, error => {
      this.authFail =  error.error.message
      console.log("error", error.error.message);
    })

  }






}
