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
  codeset: Codeset;
  document$;
  json; 
  constructor(db: AngularFirestore) { 
    this.xmlCollection = db.collection("XmlFile");
    this.json = this.xmlCollection.doc("Vaccination CVX Code").valueChanges();
    this.json.subscribe(value => {
      var docJson = JSON.stringify(value);// create a json string from object codeset
      docJson = JSON.parse(docJson); // create json objectz
      console.log(docJson);
      var xml = "<codeset>\n";
      xml +=  OBJtoXML(docJson, "  "); //JsonToXML.parse("codeset", docJson); // create xml object from json 
      xml += "\n</codeset>";  
      var file = new File([xml  ], value.label + ".xml", {type: "text/plain;charset=utf-8"} );
      saveAs(file);
    });
    
    /*
    
    console.log("docJson", docJson);*/
  }
 
  ngOnInit() {
  }

  ngOnDestroy() {
    this.json.unsubscribe();
  }

  // Add document from url
  onSubmitForm(form: NgForm){
    this.xmlParser = new xmlParser(form.value['url']); // Create the xml parser
    this.codeset = this.xmlParser.getCodeset(); // Put the data into the object
    this.jsonDoc = JSON.stringify(this.codeset); // Create a json string from the codeset
    this.jsonDoc = JSON.parse(this.jsonDoc); // Convert Json String into Json Object
    console.log(this.jsonDoc);
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

function OBJtoXML(obj, ident) {
  var xml = '';
  for (var prop in obj) {
      
      if(obj[prop] instanceof Array) {
        if (prop == "references") {
          xml += ident + "<" + prop + ">" + "\n";
          for (var array in obj[prop]){
            var object = new Object(obj[prop][array]);
            xml += ident + "  "+ "<link-to codeset=" + object["type"] + ">" + object["codeValue"] + "</link-to>\n"; 
          }
          xml += ident + "</" + prop + ">" + "\n";
        }
        else {  
          for (var array in obj[prop]) {
                xml += ident + "<" + prop + ">" + "\n"; 
                xml += OBJtoXML(new Object(obj[prop][array]), ident + "  ");
                xml += ident + "</" + prop + ">\n";
            }
        }
        
      } else if (typeof obj[prop] == "object") {
          if (prop == "use_age" || prop == "use_date"){
            var first_time = true;
            for (var element in obj[prop]){
                if (obj[element] != {} && obj[element] != undefined){
                  if (first_time == true) {
                    xml += ident + "<" + prop + ">" + "\n";
                    first_time = false;
                  }
                  xml += ident + "  " + "<" + element + ">";
                  xml += obj[element];
                  xml += "</" + element + ">\n"; 
                }
              }
            if (first_time == false) {
              xml += ident + "</" + prop + ">" + "\n";
            }
          }
          else {
            xml += ident + "<" + prop + ">" + "\n";
            xml += OBJtoXML(new Object(obj[prop]), ident + "  ");
            xml += ident +  "</" + prop + ">\n";
          }
      } else {
        if (obj[prop] != '' && obj[prop] != null) {
          xml += ident + "<" + prop + ">";
          xml += obj[prop];
          xml += "</" + prop + ">\n";
        }
      }
      
  }
  var xml = xml.replace(/<\/?[0-9]{1,}>/g,'');
  return xml
}
