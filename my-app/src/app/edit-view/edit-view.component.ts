import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import {firestore} from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import  { Code } from './edit-view.code'; 
import { Codeset } from './edit-view.codeset';
import {CodesetUpdate} from './edit-view.codesetUpdate';
import {commentaryWorker} from'../services/commentaryWorkerEdit'


@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})

export class EditViewComponent implements OnInit {
  protected xmlCollection:      AngularFirestoreCollection ;
  protected codesetDocument:    AngularFirestoreDocument<Codeset>;
  protected document$:          Observable<any[]>;
  protected documents:          any[];
  protected db:                 AngularFirestore;
  protected codeset:            Observable<Codeset>;
  protected isDocumentDefined:  boolean; 
  protected myCodeset:          Codeset;  
  protected myCode:             Code;
  protected isCodeSelected:     boolean;
  protected codeToBeEdited:     Code;
  protected isEditing:          boolean;

  constructor(db: AngularFirestore) {
    this.db = db
    this.isDocumentDefined = false;
    this.isCodeSelected = false;
    this.isEditing = false;
  }
  
  ngOnInit() {
    this.xmlCollection = this.db.collection("XmlFile");
    this.document$ = this.xmlCollection.valueChanges();
    this.document$.subscribe(list => this.documents = list);
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
      this.isEditing = false;
    }
  } 

  openCodeset(evt, objCode) {
    this.isEditing = false;

    this.myCode = objCode;
    
    //copy the code into a new var which can be edited
    this.codeToBeEdited = new Code(objCode.value, objCode.label, objCode.description, objCode.status, objCode.use_age, objCode.use_date, objCode.test_age, objCode.concept_type);
    objCode.references.forEach(reference => {
      this.codeToBeEdited.addReference(reference);
    });
    this.codeToBeEdited = this.codeToBeEdited.copy();

    this.isCodeSelected = true;
  }

  goToReference(codesetType, codeValue) {
    this.isEditing = false;
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
                  //copy the code into a new var which can be edited
                  this.codeToBeEdited = new Code(code.value, code.label, code.description, code.status, code.use_age, code.use_date, code.test_age, code.concept_type);
                  code.references.forEach(reference => {
                    this.codeToBeEdited.addReference(reference);
                  });
                  this.codeToBeEdited = this.codeToBeEdited.copy();

                  this.isCodeSelected = true;
                }
              }
            });
            
            this.isDocumentDefined = true;
          }
        }
      );
  }

  save(){
    // TODO check if the values are correct
    this.isEditing = false;
    //console.log(this.codeToBeEdited);
    //console.log(this.myCode);

  //Commentary section add of an editing commentary.
    let commentaire = new commentaryWorker(this.myCode,this.myCodeset.label,this.codeToBeEdited,this.db);
   // console.log(commentaire
    commentaire.addData()

    
    this.codeToBeEdited.removeUndifinedAttributes();
    var codesetDoc: AngularFirestoreDocument<CodesetUpdate>;
    codesetDoc = this.xmlCollection.doc(this.myCodeset.label);
    var thisComponent = this;
    //We remove the old version of the edited Code
    codesetDoc.update({
      code: firestore.FieldValue.arrayRemove(this.myCode)

    }).then(function() {
      //if it has been removed, we add the new version of the edited Code
      codesetDoc.update({
        code: firestore.FieldValue.arrayUnion(Object.assign({}, thisComponent.codeToBeEdited))

      }).then(function() {
        console.log("Document successfully updated");
        thisComponent.goToReference(thisComponent.myCodeset.type,thisComponent.codeToBeEdited.value);
        
        //TODO inform that the code has been updated
        
      }).catch(function(error) {
        console.error("Error updating document (Code removed but not edited): ", error)
      });
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    });
  }

  archive(){
    this.xmlCollection = this.db.collection('/XmlFile');
    this.document$ = this.xmlCollection.valueChanges();
    var i=0;
    this.document$.forEach(doc => {
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