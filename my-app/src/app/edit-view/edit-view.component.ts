import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  protected db: AngularFirestore;
  protected codeset:   Observable<Codeset>;
  protected isDocumentDefined: boolean; 
  protected myCodeset;  
  protected myCode;
  protected isCodeSelected: boolean;

  constructor(db: AngularFirestore) {
    this.db = db
    this.isDocumentDefined = false;
    this.isCodeSelected = false;
  }
  
  ngOnInit() {
    this.xmlCollection = this.db.collection("XmlFile");
    this.document$ = this.xmlCollection.valueChanges();
  }

  addDocumentIntoCollection(collection, documentName:string, data){
    collection.doc(documentName).set(data);
  }

  openDocu(evt, codeName) {

    if (codeName != ""){
      this.codesetDocument = this.xmlCollection.doc(codeName);
      this.codeset = this.codesetDocument.valueChanges();
      this.myCodeset = new Codeset("", "");
      this.codeset.subscribe(value => { this.myCodeset = value;
        //console.log("value" ,value.label, value.type, value.code);
      });
      this.isDocumentDefined = true;
      this.isCodeSelected = false;
    }
    
  } 

  openCodeset(evt, objCode) {
    this.myCode = objCode;
    this.isCodeSelected = true;
  }

  goToReference(codesetType, codeValue) {
    this.isDocumentDefined = false;
    this.isCodeSelected = false;

    var codesetLabel:string = "";
    this.db.collection<Codeset>('XmlFile', ref => ref.where('type', '==', codesetType).limit(1))
      .valueChanges()
      .subscribe( value => 
        {
          if(value.length>0){

            this.codesetDocument = this.xmlCollection.doc(value[0].label);
            this.codeset = this.codesetDocument.valueChanges();
            this.myCodeset = new Codeset("", "");

            this.codeset.subscribe(value => { 
              this.myCodeset = value;

              for(let code of this.myCodeset.code) {
                if(code.value == codeValue) {
                  this.myCode = code;
                  this.isCodeSelected = true;
                }
              }
            });
            
            this.isDocumentDefined = true;
          }
        }
      );
  }

  archive(){
    this.xmlCollection = this.db.collection('/XmlFile');
    this.document$ = this.xmlCollection.valueChanges();
    var i=0;
    this.document$.forEach(doc => {
      console.log(doc);
      doc.forEach(file => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = String(today.getFullYear());
        var madate = mm + '-' + dd + '-' + yyyy;        
        this.db.collection(`Archive/Archive${madate}/Archive`).doc(file.label).set(file);
        i += 1;
      });
    });
  }
}


