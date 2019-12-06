import { Component, OnInit } from '@angular/core';
import {Commentaire , showComment} from '../Commentaire'
import {Test} from '../testCom'
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {
    commentaires = Test;
    db:any
    constructor(db: AngularFirestore) {
      this.db = db
    }
    

  ngOnInit() {
  }

  ShowMeComment(com:Commentaire){
   com.showCom=!com.showCom;
  }

}
