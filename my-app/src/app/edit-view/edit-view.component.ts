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
  protected myCodeset;  
  codesetLabel;
  codesetType;
  code;

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
      this.codeset.subscribe(value => { this.myCodeset = value;
                                  //console.log("value" ,value.label, value.type, value.code);
                                });
      this.isDocumentDefined = true;
    }
    console.log(this.myCodeset)
  }

  addDocumentIntoCollection(collection, documentName:string, data){
    collection.doc(documentName).set(data);
  }

  openDocu(evt, codeName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      console.log(tabcontent);
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab

    var newElement = document.getElementById(codeName);
    newElement.style.display = "block";
    newElement.classList.add("active");

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
        console.log(madate)
        this.db.collection(`Archive/Archive${madate}/Archive`).doc(file.label).set(file);
        i += 1;
      });
      
    });
  }
}


