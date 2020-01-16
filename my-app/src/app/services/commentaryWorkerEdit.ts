import { Code } from "../edit-view/edit-view.code";
import {formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { commentary } from './commentary';

export class commentaryWorker{
    //personne :Personne;
    commentary:commentary;
    db:AngularFirestore;
    whereChangedMade: Array<string>;
    objectBefore: Array<string>
    objectAfter: Array<string>

    //monTuple: [string[],any[],any[]];



constructor(codeBefore:Code,xml,codeAfter:Code, db: AngularFirestore){
this.commentary = new commentary(xml,JSON.parse(localStorage.getItem('user')).uid,codeAfter.label)
this.db=db;
this.whereChangedMade = new Array();
this.objectBefore = new Array();
this.objectAfter = new Array();
this.changement(codeBefore,codeAfter);
  this.setAllChangement();
}


setAllChangement(){
  for(let i=0; i< this.whereChangedMade.length; i++){
    this.commentary.codeBefore = this.commentary.codeBefore + " " + this.whereChangedMade+ " " + this.objectBefore;
    this.commentary.codeAfter =  this.commentary.codeAfter +  " " + this.whereChangedMade + " " +  this.objectAfter
  }
}

changement(codeBefore:Code,codeAfter:Code){
  //Label codeBefore codeAfter
  if(codeAfter.value != codeBefore.value ){
    this.whereChangedMade.push("value")
    this.objectBefore.push(codeBefore.value);
    this.objectAfter.push(codeAfter.value)
  }
  if(codeAfter.concept_type != codeBefore.concept_type){
 
    this.whereChangedMade.push("concept_type")
    this.objectBefore.push(codeBefore.concept_type);
    this.objectAfter.push(codeAfter.concept_type)
  }
  if(codeAfter.description != codeBefore.description){
  
    this.whereChangedMade.push("description")
    this.objectBefore.push(codeBefore.description);
    this.objectAfter.push(codeAfter.description)
  }
  if(codeAfter.label != codeBefore.label){
  
    this.whereChangedMade.push("label")
    this.objectBefore.push(codeBefore.label);
    this.objectAfter.push(codeAfter.label)
  }
  if(codeAfter.status != codeBefore.status){
    this.whereChangedMade.push("status")
    if(codeBefore.status){
      this.objectBefore.push("Valid");
      this.objectAfter.push("Unvalid");
    }
    else{
      this.objectAfter.push("Valid");
      this.objectBefore.push("Unvalid");
    }
   
  }
  if(codeAfter.test_age != codeBefore.test_age){
    this.whereChangedMade.push("test_age")
    this.objectBefore.push(codeBefore.test_age);
    this.objectAfter.push(codeAfter.test_age);
  }
/*
  if(codeAfter.use_age != codeBefore.use_age && codeAfter.use_age != null){
    this.whereChangedMade.push("use_age")
    this.objectBefore.push(codeBefore.use_age);
    this.objectAfter.push(codeAfter.use_age);
  }
  if(codeAfter.use_date != codeBefore.use_date){
    this.whereChangedMade.push("use_date")
    this.objectBefore.push(codeBefore.use_date.toString);
    this.objectAfter.push(codeAfter.use_date.toString);
  }
  */ //Probleme avec les objets a check !
}

addData(){
   let jsonDoc = JSON.stringify(this.commentary);
   console.log(jsonDoc) // Create a json string from the codeset
  jsonDoc = JSON.parse(jsonDoc); // Convert Json String into Json Object
  this.addDocumentIntoCollection(jsonDoc);
}


// Add o document to a collection
addDocumentIntoCollection(data){
  this.db.collection(`Commentaire`).doc(`${formatDate(this.commentary.editTime, 'dd-MM-yyyy hh:mm:ss a', 'en-US').concat(this.commentary.idUserPost).concat(this.commentary.xmlChange).concat(this.commentary.label)}`).set(data);
    console.log("Ajout fait à la bd");
}
}

export function showComment(){
        this.showCom = !this.showCom     
    }
  