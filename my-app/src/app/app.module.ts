import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'; 
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { EditViewComponent } from './edit-view/edit-view.component';
import { EditPageComponent } from './edit/edit.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SecureSignPage } from './services/secure-sign-page';
import { AuthenticationService } from './services/authentication.service';
import { FlexLayoutModule } from '@angular/flex-layout';

//Firebase imports
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { AngularFireAuth } from '@angular/fire/auth';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AddFileComponent } from './add-file/add-file.component';
import { HomeComponent } from './home/home.component';
import { UserDataComponent } from './user-data/user-data.component';
import { DropZoneDirective } from './drop-zone.directive';
import { FileSizePipe } from './file-size.pipe';
import { EditorGuardService } from './services/editor-guard.service';
import { AdminComponent } from './admin-view/admin.component';
import { AdminGuardService } from './services/admin-guard.service';
import { AlertComponent } from './alert/alert.component';

const appRoutes: Routes =   [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent, canActivate: [SecureSignPage]},
  { path: 'sign-in', component: SignInComponent , canActivate: [SecureSignPage]},
  { path: 'sign-out', component: SignOutComponent , canActivate: [AuthGuardService]},
  { path: 'forgot-password', component: ForgotPasswordComponent , canActivate: [SecureSignPage]},
  { path: 'verify-email-address', component: VerifyEmailComponent , canActivate: [SecureSignPage]},
  { path: 'comments', component: CommentaireComponent,  canActivate: [AuthGuardService]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]  },
  { path: 'edition', component: EditViewComponent },
  { path: 'addFile', component: AddFileComponent, canActivate: [AuthGuardService,AdminGuardService] },
  { path: 'userData', component: UserDataComponent, canActivate: [AuthGuardService]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService,AdminGuardService] },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
  
];

/*canActivate: [AuthGuardService] ,  is for lock a page if not logged ! Enable it and the page is protected*/ 
@NgModule({
  declarations: [
    AppComponent,
    CommentaireComponent,
    EditViewComponent,
    EditPageComponent,
    FourOhFourComponent,
    SignUpComponent,
    SignInComponent,
    SignOutComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AddFileComponent,
    HomeComponent,
    UserDataComponent,
    AdminComponent,
    DropZoneDirective,
    FileSizePipe,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)

  ],
  providers: [

    AuthenticationService, AngularFirestore, AngularFireAuth, AngularFireStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
