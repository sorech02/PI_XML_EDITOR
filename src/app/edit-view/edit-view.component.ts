import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { firestore} from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Code } from './edit-view.code'; 
import { Codeset } from './edit-view.codeset';
import { CodesetUpdate} from './edit-view.codesetUpdate';
import { commentaryWorkerEdit} from'../services/commentaryWorkerEdit'
import { Reference } from './edit-view.reference';
import { commentaryWorkerAdd } from '../services/commentaryWorkerAdd';

import { AngularFireAuth } from "@angular/fire/auth";
import * as saveAs from 'file-saver';
import { User } from '../services/user';
import { AlertService } from '../services/alert.service';

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
  protected codesetToBeAdded:       Codeset;
  protected addedCodesets:          Codeset[];
  protected canEdit:                boolean;
  protected isAdmin:                boolean;
  protected searchString:           string;
  protected displayedCodes:         Code[];

  constructor(db: AngularFirestore, protected afAuth: AngularFireAuth) {
    this.db = db;
    this.isDocumentDefined = false;
    this.isCodeSelected = false;
    this.isEditing = false;
    this.canEdit = false;
    this.isAdmin = false;
    this.searchString = "";
  }
  
  ngOnInit() {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        var userDocument = this.db.collection("users").doc(res.uid);
        var user: any = userDocument.valueChanges();
        user.subscribe(value => {
          this.canEdit = !!value.userRank && value.userRank>0;
          this.isAdmin = !!value.userRank && value.userRank==2;
        });
      } else {
        this.canEdit = false;
        this.isAdmin = false;
      }
    });
    
    this.xmlCollection = this.db.collection("XmlFile");
    this.document$ = this.xmlCollection.valueChanges();
    this.document$.subscribe(list => {
      this.documents = list;
      this.sortDocuments();
    });
    this.editReferenceCodeset = new Codeset("", "");
    this.editReferenceCodeValue = "";
    this.isEditing = false;
  }

  addDocumentIntoCollection(collection, documentName:string, data){
    collection.doc(documentName).set(data);
  }

  sortDocuments() {
    this.documents.sort((doc1,doc2) => {
      if(doc1.label.toLowerCase() > doc2.label.toLowerCase()) {
        return 1;
      } else if(doc1.label.toLowerCase() < doc2.label.toLowerCase()) {
        return -1;
      } else {
        return 0
      }
    });
  }

  openDocu(evt, codeName) {
    if (codeName != ""){
      this.codesetDocument = this.xmlCollection.doc(codeName);
      this.codeset = this.codesetDocument.valueChanges();
      this.myCodeset = new Codeset("", "");
      this.codeset.subscribe(value => { 
        this.myCodeset = value;
        this.myCodeset = Object.assign(new Codeset("",""), this.myCodeset);
        this.myCodeset.sortCodes();
        this.displayedCodes = this.myCodeset.code;
        this.searchString = "";
        //console.log("value" ,value.label, value.type, value.code);
      });
      this.isDocumentDefined = true;
      this.isCodeSelected = false;
      this.isEditing = false;
    }
  } 

  onSearch() {
    //console.log(this.searchString);
    
    if(this.isDocumentDefined) {
      if(!this.searchString || this.searchString == null || this.searchString == "") {
        this.displayedCodes = this.myCodeset.code;
  
      } else {
        this.displayedCodes = this.myCodeset.code.filter(code => 
          code.label.toLowerCase().includes(this.searchString.toLowerCase()) ||
          code.value.toLowerCase().includes(this.searchString.toLowerCase())
        );
      }
    }
    else  {
      this.displayedCodes = [];
    }
  }

  onEditClick(evt) {
    this.isEditing = true;
    this.addedCodes = [];
    this.addedCodesets = [];
    this.codeToBeAdded = new Code("","",null,null,null,null,null,null);
    this.codesetToBeAdded = new Codeset("", "");

    if(this.isCodeSelected) {
      //copy the code into a new var which can be edited
      this.codeToBeEdited = new Code(this.myCode.value, this.myCode.label, this.myCode.description, 
        this.myCode.status, this.myCode.use_age, this.myCode.use_date, this.myCode.test_age, this.myCode.concept_type);

      this.myCode.reference.forEach(reference => {
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
    let commentaire = new commentaryWorkerAdd(this.myCodeset.label, this.codeToBeAdded,this.db);
        console.log(commentaire)
        commentaire.addData()
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

  addNewCodeset(evt) {
    if(this.codesetToBeAdded.label != "" && this.codesetToBeAdded.type != "") {
      var uniqueValue: boolean = 
        !(this.documents.some(docu => {
          return docu.type==this.codesetToBeAdded.type;
        }));

      if(uniqueValue) {
        uniqueValue = 
          !(this.addedCodesets.some(docu => {
            return docu.type==this.codesetToBeAdded.type;
          }));
      }

      if(uniqueValue) {
        uniqueValue = 
          !(this.addedCodesets.some(docu => {
            return docu.label==this.codesetToBeAdded.label;
          }));
      }

      if(uniqueValue) {
        uniqueValue = 
          !(this.addedCodesets.some(docu => {
            return docu.label==this.codesetToBeAdded.label;
          }));
      }

      if(uniqueValue) {
        this.addedCodesets.push(this.codesetToBeAdded);
        this.codesetToBeAdded = new Codeset("","");

      } else {
        alert("The codeset already exists.");
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
    const index = this.codeToBeEdited.reference.indexOf(ref, 0);
    if (index > -1) {
      this.codeToBeEdited.reference.splice(index, 1);
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
              this.myCodeset = Object.assign(new Codeset("",""), this.myCodeset);
              this.myCodeset.sortCodes();
              this.displayedCodes = this.myCodeset.code;
              this.searchString = "";
              for(let code of this.myCodeset.code) {
                if(code.value == codeValue) {
                  this.myCode = code;
                  this.isCodeSelected = true;
                  break;
                }
              }
            });
            
            this.isDocumentDefined = true;
          }
        }
      );
  }

  save(){
    // Security check
    if(this.canEdit == false) {
      return;
    }

    this.isEditing = false;
    // If we added a new codeset
    if(this.addedCodesets.length>0) {
      this.addedCodesets.forEach(codeset => {
        var jsonDoc;
        jsonDoc = JSON.stringify(codeset); // Create a json string from the codeset
        jsonDoc = JSON.parse(jsonDoc); // Convert Json String into Json Object

        this.xmlCollection.doc(codeset.label).set(jsonDoc) // Add a document to a collection
        .then(function() {
          console.log("Document successfully added");
          
        }).catch(function(error) {
          console.log("Error while adding new codeset : ", error);
        });
      });
    }

    // If we edited the code details
    if(this.isCodeSelected && this.codeToBeEdited.equals(this.myCode)==false) {
      let commentaire = new commentaryWorkerEdit(this.myCode,this.myCodeset.label,this.codeToBeEdited,this.db);
      console.log(commentaire)
      commentaire.addData()

      //we update the code from the DB to merge with eventual changes
      var doneOnce: boolean = false;
      this.db.collection<Codeset>('XmlFile', ref => ref.where('type', '==', this.myCodeset.type).limit(1))
      .valueChanges()
      .subscribe( value => 
        {
          if(value.length>0){

            this.codesetDocument = this.xmlCollection.doc(value[0].label);
            this.codeset = this.codesetDocument.valueChanges();
            var tmpCodeset = new Codeset("", "");
            
            this.codeset.subscribe(value => { 
              if(!doneOnce) {
                doneOnce = true;
                var differentFromRemote:boolean = true;

                tmpCodeset = value;
                for(let code of tmpCodeset.code) {
                  if(code.value == this.myCode.value) {
                    //we merge the codes if they are different
                    if(this.codeToBeEdited.equals(code)) {
                      differentFromRemote = false;
                      break;
                    }
                    this.codeToBeEdited.merge(this.myCode,code);
                    this.myCode = code;
                    break;
                  }
                }
                
                if(differentFromRemote) {
                  this.codeToBeEdited.removeUndifinedAttributes();

                  var codesetDoc: AngularFirestoreDocument<CodesetUpdate>;
                  codesetDoc = this.xmlCollection.doc(this.myCodeset.label);
                  var thisComponent = this;

                  //We add the new version of the edited Code
                  codesetDoc.update({
                    code: firestore.FieldValue.arrayUnion(Object.assign({}, thisComponent.codeToBeEdited))

                  }).then(function() {
                    //if it has been added, we remove the old version of the edited Code
                    codesetDoc.update({
                      code: firestore.FieldValue.arrayRemove(thisComponent.myCode)

                    }).then(function() {
                      console.log("Document successfully updated");
                      thisComponent.saveAddedCodes();
                      thisComponent.goToReference(thisComponent.myCodeset.type,thisComponent.codeToBeEdited.value);
                      
                    }).catch(function(error) {
                      console.error("Error updating document (code might have been duplicated): ", error)
                    });
                  })
                  .catch(function(error) {
                      console.error("Error updating document: ", error);
                  });
                }
              }
            });
          }
        }
      );
    }
    else {
      this.saveAddedCodes();
    }
  }

  saveAddedCodes() {
    // if we added a new code to the codeset
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

  downloadXML(docuLabel) {
    var json = this.xmlCollection.doc(docuLabel).valueChanges();
    json.subscribe(value => {
      var stringJson = JSON.stringify(value);// create a json string from object codeset
      var docJson = JSON.parse(stringJson); // create json objectz
      var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n" + "<codeset>\n" ;
      xml += "    " + "<label>" + docJson["label"] + "</label>\n";
      xml += "    " + "<type>" + docJson["type"] + "</type>\n";
      delete docJson.label; 
      delete docJson.type;
      xml += this.OBJtoXML(docJson, "    "); //JsonToXML.parse("codeset", docJson); // create xml object from json 
      xml += "</codeset>";
      xml = this.OrderCodeXML(xml);
      var file = new File([xml  ], docuLabel + ".xml", {type: "text/plain;charset=utf-8"} );
      saveAs(file);

    });
  }

  OBJtoXML(obj, ident) {
    var xml = '';
    var re = /\_/gi;
    for (var prop in obj) {
        if(obj[prop] instanceof Array) {
          if (prop == "reference" && obj[prop].length > 0) {
            xml += ident + "<" + prop.replace(re, '-') + ">" + "\n";
            for (var array in obj[prop]){
              var object = new Object(obj[prop][array]);
              xml += ident + "    "+ "<link-to codeset=" + "\"" + object["type"] + "\"" + ">" + object["codeValue"] + "</link-to>\n"; 
            }
            xml += ident + "</" + prop.replace(re, '-') + ">" + "\n";
          }
          else {  
            for (var array in obj[prop]) {
                  xml += ident + "<" + prop.replace(re, '-') + ">" + "\n"; 
                  xml += this.OBJtoXML(new Object(obj[prop][array]), ident + "    ");
                  xml += ident + "</" + prop.replace(re, '-') + ">\n";
              }
          }
        } else if (typeof obj[prop] == "object") {
          
            if (prop == "use_date"){
              var first_time = true;
              
                var object = new Object(obj[prop]);
                for (var o in object){
                  
                  if (first_time == true) {
                    xml += ident + "<" + prop.replace(re, '-') + ">" + "\n";
                    first_time = false;
                  }
                  xml += ident + "    " + "<" + o.replace(re, '-') + ">";
                  xml += object[o];
                  xml += "</" + o.replace(re, '-') + ">\n"; 
                }
              if (first_time == false) {
                xml += ident + "</" + prop.replace('_', '-') + ">" + "\n";
              }
            }
            else if (prop == "use_age"){
              var first_time = true;
              
              var object = new Object(obj[prop]);
              var temp = ""; 
              for (var o in object){
                
                if (first_time == true) {
                  xml += ident + "<" + prop.replace(re, '-') + ">" + "\n";
                  first_time = false;
                }
                temp += ident + "    " + "<" + o.replace(re, '-') + ">";
                temp += object[o];
                temp += "</" + o.replace(re, '-') + ">\n"; 
              }
              if (first_time == false) {
                var tab = temp.split('\n');
                if (tab.length > 1){
                  xml += tab[1] + "\n";
                  xml += tab[0] + "\n";
                }
                else if (tab.length>0){
                  xml += tab[0] + "\n";
                }
                xml += ident + "</" + prop.replace('_', '-') + ">" + "\n";
              }
            }
  
            else {
              xml += ident + "<" + prop.replace(re, '-') + ">" + "\n";
              xml += this.OBJtoXML(new Object(obj[prop]), ident + "    ");
              xml += ident +  "</" + prop.replace(re, '-') + ">\n";
            }
        } else {
          if (prop == "status"){
            xml += ident + "<code-status>\n"; 
            xml += ident + "    "  + "<" + prop.replace(re, '-') + ">"
            xml += obj[prop];
            xml += "</" + prop.replace(re, '-') + ">\n";
            xml += ident + "</code-status>\n"; 
          }
          else if (obj[prop] != '' && obj[prop] != null) {
            xml += ident + "<" + prop.replace(re, '-') + ">";
            xml += obj[prop];
            xml += "</" + prop.replace(re, '-') + ">\n";
          }
        }
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g,'');
    return xml
  }

  OrderCodeXML(xml: String){
    var newXml = "";
    var lines = xml.split('\n'); // Get all the lines of the file
    var done = false;
    var index = 0;
    // This set the order of the fields in the xml
    var orderList = [["value"], ["label"], ["description"], ["code-status"], 
                      ["reference"], ["use-date"], ["use-age"], 
                      ["concept-type"], ["test-age"]]; 
    
    var useDateOrderList = [["not-before"], ["not-expected-before"], ["not-expected-after"], ["not-after"]]
    // First 4 lines are the same
    while (index < 4){
      newXml += lines[index] + "\n";
      index ++; 
    }

    while (done == false) {
    
      if (lines[index].includes("<code>")){
        index ++;
        while (lines[index].includes("</code>") == false){// going through a code section
          var field = this.getFieldInXml(lines[index]);
          
          orderList.forEach(element => {
            if (element[0] == field && field == "use-date") {
              var fieldLines = lines[index]+"\n";
              while (lines[index].includes("</"+field+">") == false){
                index ++;
                var useDateField = this.getFieldInXml(lines[index]);
                useDateOrderList.forEach(el => {
                  if (useDateField == el[0]){
                      el.push(lines[index]);
                  }
                }); 
              }
              useDateOrderList.forEach(el => {
                if (el.length > 1 ) {
                  fieldLines += el[1] + "\n";
                  el.pop();
                }
              });
              fieldLines += lines[index] + "\n";
              element.push(fieldLines);
            }
            else if (element[0] == field){
              var fieldLines = lines[index]+"\n";
              while (lines[index].includes("</"+field+">") == false){
                index ++; 
                fieldLines += lines[index]+"\n"; 
              }
              element.push(fieldLines);
            }
          });
          index++;  
        }
        newXml += "    " + "<code>\n";
        orderList.forEach(element => {
          if (element.length > 1){
            newXml += element[1];
            element.pop();
          }
          
        });
        newXml += "    " + "</code>\n";
      }
  
      index ++; 
      if (index >= lines.length)  done = true;
      
    }
  
   return newXml + "</codeset>"; 
  }

  getFieldInXml(str: String){
    var i = 0;
    while (i<str.length){
      if (str[i] == '<'){
        i++;
        var field = ""
        while (str[i] != '>'){
          field += str[i];
          i++;
        }
        return field;
      }
      i++;
    }
    return false;
  }
}