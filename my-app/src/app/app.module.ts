import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'; 
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedActuComponent } from './feed-actu/feed-actu.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { EditViewComponent } from './edit-view/edit-view.component';
import { EditPageComponent } from './edit/edit.component';
import { MessagePageComponent } from './message-page/message-page.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SignupComponent } from './signup/signup.component';

//Firebase imports
import { environment } from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const appRoutes: Routes =   [
//  { path: 'comments', canActivate: [AuthGuardService] , component: CommentaireComponent},
  { path: 'edition',canActivate: [AuthGuardService] ,  component: EditViewComponent },
  { path: 'actu', canActivate: [AuthGuardService] ,  component: FeedActuComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'messages', /*canActivate: [AuthGuardService] , */ component: MessagePageComponent },
  { path: 'signup', component : SignupComponent },
  { path: '', component:  LoginPageComponent},
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
  
];

/*canActivate: [AuthGuardService] ,  is for lock a page if not logged ! Enable it and the page is protected*/ 
@NgModule({
  declarations: [
    AppComponent,
    FeedActuComponent,
    CommentaireComponent,
    LoginPageComponent,
    EditViewComponent,
    EditPageComponent,
    MessagePageComponent,
    FourOhFourComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
    
  ],
  providers: [
  AuthGuardService, AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
