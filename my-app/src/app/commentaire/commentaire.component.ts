import { Component, OnInit } from '@angular/core';
import {Commentaire} from '../Commentaire'
import {Test} from '../testCom'
@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {
  commentaires = Test;
    constructor() { }

  ngOnInit() {
  }

}
