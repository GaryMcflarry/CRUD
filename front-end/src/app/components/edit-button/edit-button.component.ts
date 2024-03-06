import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { EditClientComponent } from '../edit-client/edit-client.component';


// export interface DialogData {
//   name: string;
//   surname: string;
//   contact: string;
// }

/**
//   @title Dialog Overview
 */
@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
})
export class EditButtonComponent {
  // name!: string;
  // surname!: string;
  // contact!: string;
  @Input() data: any

  constructor(public dialog: MatDialog) {}

   openDialog() {
    const dialogRef =  this.dialog.open(EditClientComponent,
      {
        data: this.data
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
}

// @Component({
//   selector: 'app-edit-client',
//   templateUrl: '../edit-client/edit-client.component.html',
// })

// // C:\Users\Master\Projects\CRUD\front-end\src\app\components\edit-button\edit-button.component.ts
// // C:\Users\Master\Projects\CRUD\front-end\src\app\components\edit-client\edit-client.component.html
// export class EditClientComponent {
//   // constructor(
//   //   public dialogRef: MatDialogRef<EditClientComponent>,
//   //   @Inject(MAT_DIALOG_DATA) public data: DialogData,
//   // ) {}

//   // onNoClick(): void {
//   //   this.dialogRef.close();
//   // }
// }
