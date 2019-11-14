import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { xmlParser } from './edit-view.xmlParser'; 
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements OnInit {
  codeset;

  document_name;
  protected xmlFile$: Observable<any[]>;
  protected xmlFileRef: AngularFirestoreCollection ;
  protected currentDocument;
  protected document$: Observable<any[]>;
  protected db;

  protected listeCode: any[];
   protected isDocumentDefined: boolean; 

    constructor(db: AngularFirestore) {
    this.db = db;
    this.isDocumentDefined = false; 
  }
  
  ngOnInit() {
      
  }

  onSubmit(form: NgForm) {
    var str: string = form.value['url'];
    var xmlParserObj = new xmlParser(str);
    this.codeset = xmlParserObj.getCodeset();
    // console.log(this.codeset.toString());

    this.xmlFileRef = this.db.collection(form.value['url']);
    this.xmlFile$ = this.xmlFileRef.valueChanges();


  }

  onClicked(form: NgForm){
    
    console.log('fonction', form.value['docSelection']);
    if (form.value['docSelection'] != ""){
      this.document_name = form.value['docSelection'];
      this.currentDocument = this.xmlFileRef.doc(form.value['docSelection']);
      this.document$ = this.currentDocument.valueChanges();
      this.isDocumentDefined = true; 
      console.log(this.document$);
    }
   
    
  }

  addDocumentIntoCollection(collection, documentName:string, data){
    collection.doc(documentName).set(data);
  }
}