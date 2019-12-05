import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import  { Code } from './edit-view.code'; 
import { Codeset } from './edit-view.codeset';


@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})

export class EditViewComponent implements OnInit {

  protected xmlCollection: AngularFirestoreCollection ;
  protected codesetDocument: AngularFirestoreDocument<Codeset>;
  protected document$: Observable<any[]>;
  protected db;
  protected codeset:   Observable<Codeset>;
  protected isDocumentDefined: boolean; 

  codesetLabel;

  constructor(db: AngularFirestore) {
    this.db = db
    this.isDocumentDefined = false;
  }
  
  ngOnInit() {
      
  }

  onSubmit(form: NgForm) {
    this.xmlCollection = this.db.collection(form.value['url']);
    this.document$ = this.xmlCollection.valueChanges();
  }

  onClicked(form: NgForm){
    
    console.log('fonction', form.value['docSelection']);
    if (form.value['docSelection'] != ""){
      this.codesetDocument = this.xmlCollection.doc(form.value['docSelection']);
      this.codeset = this.codesetDocument.valueChanges();
      this.codeset.subscribe(value => console.log(value));
      this.codesetLabel ="";
      this.codeset.subscribe(value => {this.codesetLabel = value.label; 
                                  console.log("value" ,value.label, value.type, value.code);});
      console.log("Codeset Label", this.codesetLabel);
      this.isDocumentDefined = true;
    }
   
    
  }

  addDocumentIntoCollection(collection, documentName:string, data){
    collection.doc(documentName).set(data);
  }
}