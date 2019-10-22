import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginToolBarComponent } from './login-tool-bar/login-tool-bar.component';
import { MainToolBarComponent } from './main-tool-bar/main-tool-bar.component';
import { FeedActuComponent } from './feed-actu/feed-actu.component';
import { CommentaireComponent } from './commentaire/commentaire.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule }    from '@angular/forms';
import { EditViewComponent } from './edit-view/edit-view.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { MessagePageComponent } from './message-page/message-page.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginToolBarComponent,
    MainToolBarComponent,
    FeedActuComponent,
    CommentaireComponent,
    LoginPageComponent,
    EditViewComponent,
    EditPageComponent,
    MessagePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
