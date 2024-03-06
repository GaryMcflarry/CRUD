// Used for importing modules that are used in the front-end
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DelClientComponent } from 'src/app/components/del-client/del-client.component';
import { ClientsComponent } from './operations.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ButtonComponent } from 'src/app/components/add-button/button.component';
import { ClientComponent } from 'src/app/components/client/client.component';
import { AddTaskComponent } from 'src/app/components/add-client/add-task.component';
import { EditClientComponent } from 'src/app/components/edit-client/edit-client.component';
import { EditButtonComponent } from 'src/app/components/edit-button/edit-button.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';
import { UserComponent } from 'src/app/components/user/user.component';
import {MatTabsModule} from '@angular/material/tabs';
import { EditUserComponent } from 'src/app/components/edit-user/edit-user.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@NgModule({  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    HeaderComponent,
    ButtonComponent,
    ClientComponent,
    EditClientComponent,
    AddTaskComponent,
    EditButtonComponent,
    LoginPageComponent,
    UserComponent,
    EditUserComponent,
    SignUpComponent
   
   
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule


  ],
  providers: [

  ],
  bootstrap: [ClientsComponent],
  entryComponents: [EditClientComponent, DelClientComponent], exports:[HeaderComponent, ClientComponent]
})
export class ClientsModule { }
