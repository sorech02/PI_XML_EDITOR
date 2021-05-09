import { Code } from "../edit-view/edit-view.code";
import {formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { commentary } from './commentary';
import { type } from 'os';

export class commentaryWorkerAdd{
    //personne :Personne;
    commentary:commentary;
    db:AngularFirestore;
    whereChangedMade: Array<string>;
    objectAfter: Array<string>

    //monTuple: [string[],any[],any[]];



constructor(xml,codeAfter:Code, db: AngularFirestore){
  console.log(codeAfter)
this.commentary = new commentary(xml,JSON.parse(localStorage.getItem('user')).uid,codeAfter.label,"Add")
this.db=db;
this.whereChangedMade = new Array();
this.objectAfter = new Array();
this.changement(codeAfter);
  this.setAllChangement();
}


setAllChangement(){

    this.commentary.codeAfter = this.objectAfter;
    this.commentary.whereChanged=this.whereChangedMade
    if(this.commentary.codeAfter.length!=2){
      this.commentary.codeAfter.push("not definited")
    }
 
}

changement(codeAfter:Code){
  //Label codeBefore codeAfter
  if(codeAfter.value != null ){
    this.whereChangedMade.push("value")
    this.objectAfter.push(codeAfter.value)
  }
  
  if(codeAfter.label != null){
    this.whereChangedMade.push("label")
    this.objectAfter.push(codeAfter.label)
  }
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
  