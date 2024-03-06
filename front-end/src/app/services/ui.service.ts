import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'

import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {
    private showAddClient: boolean = false;
    private subject = new Subject<any>();

    editedClient = null

  constructor(private snack: MatSnackBar) { }
 
  toggleAddClient(): void {
    console.log(123)
    this.showAddClient = !this.showAddClient;
    this.subject.next(this.showAddClient)
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  openSnackBar(message = '', duration=3) {
this.snack.open(message, '', {
  duration: duration * 1000
})
  }
}
