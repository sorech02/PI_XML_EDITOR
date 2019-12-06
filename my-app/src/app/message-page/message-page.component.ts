import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss']
})


export class MessagePageComponent implements OnInit {
  chat$: Observable<any>;
  newMsg: string;

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthenticationService
  ) {}

  ngOnInit() {
    const chatId = this.route.snapshot.paramMap.get('id');
    const source = this.cs.get(chatId);
    this.chat$ = this.cs.joinUsers(source); // .pipe(tap(v => this.scrollBottom(v)));
    this.scrollBottom();
  }

  submit(chatId) {
    if (!this.newMsg) {
      return alert('you need to enter something');
    }
    this.cs.sendMessage(chatId, this.newMsg);
    this.newMsg = '';
    this.scrollBottom();
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }
}
