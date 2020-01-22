import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { commentary } from '../services/commentary';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  protected numbersEdition:number;
  protected db: AngularFirestore;
  constructor(db: AngularFirestore) { 
    this.db=db;
  }

  ngOnInit() {
    let CommentaireCollection = this.db.collection("Commentaire");
     let document$ = CommentaireCollection.valueChanges();
      document$.subscribe((list: commentary[]) => { this.numbersEdition = list.length});

}
}
