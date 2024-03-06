// Nothing is being done here
import { Component } from '@angular/core';
import { StorageService } from './allServices/storage.service';
import { Router, Routes } from '@angular/router';
import { ClientsComponent } from './pages/operations/operations.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client Information';

  constructor(private store: StorageService, private router: Router) {
    console.log("here")
    console.log(this.store.getItem('user'))

    const user = this.store.getItem('user');
    // checking to see if user info war retrieved before (basically the log out button has not been clicked yet)
    //if exists then it allows access to these routes 
    if (user) {
      this.router.navigateByUrl('clients')
    }


  }
}
