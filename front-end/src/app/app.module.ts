// Used for importing modules that are used in the front-end
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ClientsComponent } from './pages/operations/operations.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { DelClientComponent } from './components/del-client/del-client.component';
import { ClientsModule} from "./pages/operations/operations.module";
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserComponent } from './components/user/user.component';
import {MatTabsModule} from '@angular/material/tabs';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DelUserComponent } from './components/del-user/del-user.component';
import { UsersComponent } from './pages/users/users.component';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
    declarations: [
        AppComponent,
        ClientsComponent,
       DelClientComponent,
       DelUserComponent,
       UsersComponent,
      
       

    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
           }
    ],
    bootstrap: [AppComponent],
    entryComponents: [EditClientComponent, DelClientComponent],
    imports: [
        ReactiveFormsModule,
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
        MatSlideToggleModule,
        MatCheckboxModule,
        MatTableModule,
        ClientsModule
    ],

})
export class AppModule { }
