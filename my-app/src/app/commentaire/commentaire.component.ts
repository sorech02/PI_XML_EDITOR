import { Component, OnInit } from '@angular/core';
import {Commentaire} from '../Commentaire'
import {Test} from '../testCom'
@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {
  commentaires = Test;
    constructor() { }

  ngOnInit() {
  }

}
