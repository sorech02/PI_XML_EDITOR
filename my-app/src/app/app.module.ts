import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'; 
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedActuComponent } from './feed-actu/feed-actu.component';
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
import { AngularFirestore } from '@angular/fire/firestore'; 
import { AngularFireAuth } from '@angular/fire/auth';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const appRoutes: Routes =   [
  { path: 'sign-up', component: SignUpComponent, canActivate: [SecureSignPage]},
  { path: 'sign-in', component: SignInComponent , canActivate: [SecureSignPage]},
  { path: 'sign-out', component: SignOutComponent , canActivate: [AuthGuardService]},
  { path: 'forgot-password', component: ForgotPasswordComponent , canActivate: [SecureSignPage]},
  { path: 'verify-email-address', component: VerifyEmailComponent , canActivate: [SecureSignPage]},
  { path: 'comments', component: CommentaireComponent},
  { path: 'edition',canActivate: [AuthGuardService] ,  component: EditViewComponent },
  { path: 'actu', component: FeedActuComponent},
  { path: '', component: FeedActuComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
  
];

/*canActivate: [AuthGuardService] ,  is for lock a page if not logged ! Enable it and the page is protected*/ 
@NgModule({
  declarations: [
    AppComponent,
    FeedActuComponent,
    CommentaireComponent,
    EditViewComponent,
    EditPageComponent,
    FourOhFourComponent,
    SignUpComponent,
    SignInComponent,
    SignOutComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
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

    AuthenticationService, AngularFirestore, AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
