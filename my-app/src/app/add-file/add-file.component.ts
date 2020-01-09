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
  document$;
  json;
  constructor(db: AngularFirestore) { 
    this.xmlCollection = db.collection("XmlFile");
    this.xmlParser = new xmlParser();
  }
 
  ngOnInit() {
  }



  downloadFile(){
    this.json = this.xmlCollection.doc("Vaccination CVX Code").valueChanges();
    this.json.subscribe(value => {
      var docJson = JSON.stringify(value);// create a json string from object codeset
      docJson = JSON.parse(docJson); // create json objectz
      var xml = "<codeset>\n";
      xml +=  OBJtoXML(docJson, "  "); //JsonToXML.parse("codeset", docJson); // create xml object from json 
      xml += "\n</codeset>";  
      var file = new File([xml  ], value.label + ".xml", {type: "text/plain;charset=utf-8"} );
      saveAs(file);
    });
    this.json.unsubscribe();

  }

  // Add document from url
  onSubmitForm(form: NgForm){
     // Create the xml parser
    this.convertXmlIntoJsonAndSendItToCollection( this.xmlParser.getCodesetWithUrl(form.value['url']) ); // Put the data into the object

  }

  //Add document from File
  readFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
        const xmlData: string = (evt as any).target.result;
        this.convertXmlIntoJsonAndSendItToCollection(this.xmlParser.getCodesetWithFile(xmlData));
    };
    reader.readAsText(file);
}

  convertXmlIntoJsonAndSendItToCollection(codeset){
    this.jsonDoc = JSON.stringify(codeset); // Create a json string from the codeset
    this.jsonDoc = JSON.parse(this.jsonDoc); // Convert Json String into Json Object
    // Then add the json object into data base: 
    this.addDocumentIntoCollection(this.xmlCollection, codeset.label, this.jsonDoc);
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
  var re = /\_/gi;
  for (var prop in obj) {
      
      if(obj[prop] instanceof Array) {
        if (prop == "references") {
          xml += ident + "<" + prop.replace(re, '-') + ">" + "\n";
          for (var array in obj[prop]){
            var object = new Object(obj[prop][array]);
            xml += ident + "  "+ "<link-to codeset=" + object["type"] + ">" + object["codeValue"] + "</link-to>\n"; 
          }
          xml += ident + "</" + prop.replace(re, '-') + ">" + "\n";
        }
        else {  
          for (var array in obj[prop]) {
                xml += ident + "<" + prop.replace(re, '-') + ">" + "\n"; 
                xml += OBJtoXML(new Object(obj[prop][array]), ident + "  ");
                xml += ident + "</" + prop.replace(re, '-') + ">\n";
            }
        }
        
      } else if (typeof obj[prop] == "object") {
          if (prop == "use_age" || prop == "use_date"){
            var first_time = true;
            
            
              var object = new Object(obj[prop]);
              for (var o in object){
                
                if (first_time == true) {
                  xml += ident + "<" + prop.replace(re, '-') + ">" + "\n";
                  first_time = false;
                }
                xml += ident + "  " + "<" + o.replace(re, '-') + ">";
                xml += object[o];
                xml += "</" + o.replace(re, '-') + ">\n"; 
              }
              
            
            if (first_time == false) {
              xml += ident + "</" + prop.replace('_', '-') + ">" + "\n";
            }
          }
          else {
            xml += ident + "<" + prop.replace(re, '-') + ">" + "\n";
            xml += OBJtoXML(new Object(obj[prop]), ident + "  ");
            xml += ident +  "</" + prop.replace(re, '-') + ">\n";
          }
      } else {
        if (obj[prop] != '' && obj[prop] != null) {
          xml += ident + "<" + prop.replace(re, '-') + ">";
          xml += obj[prop];
          xml += "</" + prop.replace(re, '-') + ">\n";
        }
      }
      
  }
  var xml = xml.replace(/<\/?[0-9]{1,}>/g,'');
  return xml
}
