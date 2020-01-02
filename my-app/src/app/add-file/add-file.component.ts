import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { xmlParser } from './add-file.xmlParser';
import { NgForm } from '@angular/forms';
import { Codeset} from '../edit-view/edit-view.codeset' ;
import * as JsonToXML from "js2xmlparser";
import * as saveAs from 'file-saver';
@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {
  xmlCollection;
  jsonDoc;
  xmlParser;
  codeset;
  document$; 
  constructor(db: AngularFirestore) { 
    this.xmlCollection = db.collection("XmlFile");
    var json = this.xmlCollection.doc("Injection Guidance").valueChanges();
    json.subscribe(value => {
      var docJson = JSON.stringify(value);// create a json string from object codeset
      docJson = JSON.parse(docJson); // create json object
      var xml = JsonToXML.parse("codeset", docJson); // create xml object
      var file = new File([xml],value.label + ".xml", {type: "text/plain;charset=utf-8"} );
      saveAs(file);
    });
    /*
    
    console.log("docJson", docJson);*/
  }
 
  ngOnInit() {
  }


  // Add document from url
  onSubmitForm(form: NgForm){
    this.xmlParser = new xmlParser(form.value['url']); // Create the xml parser
    this.codeset = this.xmlParser.getCodeset(); // Put the data into the object
    this.jsonDoc = JSON.stringify(this.codeset); // Create a json string from the codeset
    this.jsonDoc = JSON.parse(this.jsonDoc); // Convert Json String into Json Object
    // Then add the json object into data base: 
    this.addDocumentIntoCollection(this.xmlCollection, this.codeset.label, this.jsonDoc);
  }

  getDocument(){
    this.document$ = this.xmlCollection.valueChanges();
    
  }


  // Add o document to a collection
  addDocumentIntoCollection(collection, documentName:string, data){
    collection.doc(documentName).set(data);
  }
}

