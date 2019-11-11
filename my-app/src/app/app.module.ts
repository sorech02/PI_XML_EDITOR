import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { FourOhFourComponent } from './four-oh-four/four-oh-four.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedActuComponent } from './feed-actu/feed-actu.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule }    from '@angular/forms';
import { EditViewComponent } from './edit-view/edit-view.component';
import { EditPageComponent } from './edit/edit.component';
import { MessagePageComponent } from './message-page/message-page.component';
import { DataService } from './services/data.service';
import { SingleDataComponent } from './single-data/single-data.component';
import { EditDataComponent } from './edit-data/edit-data.component';
import { AuthService } from './services/auth.service';
import { DataresquestService } from './services/dataresquest.service';
import { AuthGuardService } from './services/auth-guard.service'

const appRoutes: Routes =   [
  { path: 'comments', component: CommentaireComponent},
  { path: 'edition', component: EditViewComponent },
  { path: 'actu', component: FeedActuComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'messages', component: MessagePageComponent },
  { path: 'data/:id', component: EditDataComponent  },
  { path: '', component: FeedActuComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

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
    SingleDataComponent,
    EditDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [
    DataService, DataresquestService, AuthGuardService, AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
