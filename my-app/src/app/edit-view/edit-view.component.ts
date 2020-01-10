import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { firestore} from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Code } from './edit-view.code'; 
import { Codeset } from './edit-view.codeset';
import { CodesetUpdate} from './edit-view.codesetUpdate';
import { commentaryWorker} from'../services/commentaryWorkerEdit'
import { Reference } from './edit-view.reference';


@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.css']
})

export class EditViewComponent implements OnInit {
  protected xmlCollection:          AngularFirestoreCollection ;
  protected codesetDocument:        AngularFirestoreDocument<Codeset>;
  protected document$:              Observable<any[]>;
  protected documents:              any[];
  protected db:                     AngularFirestore;
  protected codeset:                Observable<Codeset>;
  protected isDocumentDefined:      boolean; 
  protected myCodeset:              Codeset;  
  protected myCode:                 Code;
  protected isCodeSelected:         boolean;
  protected codeToBeEdited:         Code;
  protected isEditing:              boolean;
  protected editReferenceCodeset:   Codeset;
  protected editReferenceCodeValue: string;
  protected codeToBeAdded:          Code;
  protected addedCodes:             Code[];

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
    this.editReferenceCodeset = new Codeset("", "");
    this.editReferenceCodeValue = "";
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

  onEditClick(evt) {
    this.isEditing = true;
    this.addedCodes = [];
    this.codeToBeAdded = new Code("","",null,null,null,null,null,null);

    if(this.isCodeSelected) {
      //copy the code into a new var which can be edited
      this.codeToBeEdited = new Code(this.myCode.value, this.myCode.label, this.myCode.description, 
        this.myCode.status, this.myCode.use_age, this.myCode.use_date, this.myCode.test_age, this.myCode.concept_type);

      this.myCode.references.forEach(reference => {
        this.codeToBeEdited.addReference(reference);
      });
      this.codeToBeEdited = this.codeToBeEdited.copy();
    }
  }

  onCodeClick(evt, code) {
    this.openCodeset(evt, code);
  }

  openCodeset(evt, objCode) {
    this.isEditing = false;
    this.myCode = objCode;
    this.isCodeSelected = true;
  }

  addNewCode(evt) {
    if(this.codeToBeAdded.label != "" && this.codeToBeAdded.value != "") {
      var uniqueValue: boolean = 
        !(this.myCodeset.code.some(c => {
          return c.value==this.codeToBeAdded.value;
        }));

      if(uniqueValue) {
        uniqueValue = 
          !(this.addedCodes.some(c => {
            return c.value==this.codeToBeAdded.value;
          }));
      }

      if(uniqueValue) {
        this.codeToBeAdded.removeUndifinedAttributes();
        this.addedCodes.push(this.codeToBeAdded);
        this.codeToBeAdded = new Code("","",null,null,null,null,null,null);

      } else {
        alert("The value is already used by an other code.");
      }
    }    
  }

  //For the reference select form
  selectedCodesetUpdate(evt, codesetLabel) {
    this.editReferenceCodeset = new Codeset("", "");
    this.editReferenceCodeValue = "";

    this.editReferenceCodeValue = "";
    if (codesetLabel != ""){
      var codesetDocument: AngularFirestoreDocument<Codeset>;
      var codeset: Observable<Codeset>;

      codesetDocument = this.xmlCollection.doc(codesetLabel);
      codeset = codesetDocument.valueChanges();
      this.editReferenceCodeset = new Codeset("", "");
      codeset.subscribe(value => { this.editReferenceCodeset = value; });
    }
  }

  addReference(evt) {
    if(this.editReferenceCodeset.label != "" && this.editReferenceCodeValue != "") {
      var reference = new Reference(this.editReferenceCodeset.type, this.editReferenceCodeValue);
      this.codeToBeEdited.addReference(Object.assign({}, reference));
    }
  }

  removeReference(evt, ref) {
    const index = this.codeToBeEdited.references.indexOf(ref, 0);
    if (index > -1) {
      this.codeToBeEdited.references.splice(index, 1);
    }
  }

  goToReference(codesetType, codeValue) {
    this.isEditing = false;
    this.isDocumentDefined = false;
    this.isCodeSelected = false;
    this.editReferenceCodeset = new Codeset("", "");
    this.editReferenceCodeValue = "";

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

  save(){
    this.isEditing = false;
    if(this.isCodeSelected && this.codeToBeEdited.equals(this.myCode)==false) {
      // TODO check if the values are correct
      let commentaire = new commentaryWorker(this.myCode,this.myCodeset.label,this.codeToBeEdited,this.db);
      console.log(commentaire)
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
          thisComponent.saveAddedCodes();
          thisComponent.goToReference(thisComponent.myCodeset.type,thisComponent.codeToBeEdited.value);
          
        }).catch(function(error) {
          console.error("Error updating document (Code removed but not edited): ", error)
        });
      })
      .catch(function(error) {
          console.error("Error updating document: ", error);
      });
    }
    else {
      this.saveAddedCodes();
    }
  }

  saveAddedCodes() {
    if(this.addedCodes.length>0) {
      //save the codeset code list into the db
      //open the codeset
      var codesetDoc: AngularFirestoreDocument<CodesetUpdate>;
      codesetDoc = this.xmlCollection.doc(this.myCodeset.label);
      var thisComponent = this;

      //add the codes into the db
      this.addedCodes.forEach(code => {
        codesetDoc.update({
          code: firestore.FieldValue.arrayUnion(Object.assign({}, code))

        }).then(function() {
          console.log("Code successfully added");
  
          if(thisComponent.isCodeSelected)
            thisComponent.goToReference(thisComponent.myCodeset.type,thisComponent.codeToBeEdited.value);
          else
            thisComponent.openDocu(null, thisComponent.myCodeset.label);
          
        }).catch(function(error) {
          thisComponent.addedCodes = [];
          console.error("Error adding new code into the db: ", error)
        });
      });
    }
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