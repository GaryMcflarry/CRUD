// Imports from the app module
import { Component, Output, EventEmitter} from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/task.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/pages/login-page/login-page.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
name!: string;
surname!: string;
contact!: string;
empty = '';
showAddClient!: boolean;
subscription: Subscription;
durationInSeconds = 3;
newUser = {
  name: '',
  surname: '',
  contact: ''
}

newForm = [
  {
    title: 'Name',
    value: this.newUser.name,
    name: 'name'
  },
  {
    title: 'Surname',
    value: this.newUser.surname,
    name: 'surname'
  },
  {
    title: 'Contact',
    value: this.newUser.contact,
    name: 'contact'
  }
]

clientNameFormControl = new FormControl('', [Validators.required]);
clientSurnameFormControl = new FormControl('', [Validators.required]);
clientContactFormControl = new FormControl('', [Validators.required]);

matcher = new MyErrorStateMatcher();

// <mat-form-field class="addClientInput">
// <mat-label>Name</mat-label>
//  <input matInput type="text" [(ngModel)]="value1" #clientName name="name" [(ngModel)]="newUser.name" placeholder="Insert name...">
//     <button *ngIf="value1" matsuffix mat-icon-button aria-label="Clear" (click)="value1=''">
//     <mat-icon>x</mat-icon>
//     </button>
//   </mat-form-field>

// The constructor is a Typescript feature used to instantiate the Typescript class. 
// In most Angular projects about the only thing that should ever be done in the constructor is to inject services.
constructor(private ui: UiService, private taskService: TaskService, private _snackBar: MatSnackBar, private router: Router) {
  this.subscription = this.ui.onToggle().subscribe
  (value => this.showAddClient = value)
}


// This is to allow a user to add a new client to the mongo db database
createNewClient() {
  if(this.newUser.name == '' || this.newUser.surname == '' || this.newUser.contact == '') {
    return;
  }
  this.taskService.createClient(this.newUser).subscribe((response: any) => {
    // data: {
    //   clientNameInput = this.name;
    //   clientSurnameInput = this.surname;
    //   clientContactInput = this.contact
    // }
    // if its successful the submit button must take away the form and a snackbar must show
    if(response.success == true) {
      this.btnClick.emit();
     this.ui.openSnackBar('Client was added')
    }else {
        this.router.navigateByUrl('login')
        this.ui.openSnackBar("Session timed out!!!")
    }
    console.log(response);

  });

}

/**
 * 
 * @param message message to display
 * @example this.openSnackBar("Hello world")
 */
// @Output() butClick = this.openSnackBar(); 
@Output() btnClick = new EventEmitter();
}

