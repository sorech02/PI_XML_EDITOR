import { Component, OnInit } from '@angular/core';
import {commentary } from '../services/commentary'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {User} from '../services/user'
import { subComment } from '../services/subComment';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {
  protected CommentaireCollection:      AngularFirestoreCollection ;
  protected SubComFire : AngularFirestoreCollection;
  protected SubCom : subComment[]
  protected Commentaire:    AngularFirestoreDocument<commentary>;
  protected document$:          Observable<any[]>;
  protected commentaires:          commentary[];
  protected db:                 AngularFirestore;
  protected isDocumentDefined:  boolean; 
  protected myCommentaire:      commentary;
  protected isCodeSelected:     boolean;
  protected isEditing:          boolean;
  protected tmpPersonne:        User;
  protected tmpMessage: string;
  protected ListEditor : User[];
  ListEditorSub: User[];
  
  constructor(db: AngularFirestore) {
    this.db = db
    this.isDocumentDefined = false;
    this.isCodeSelected = false;
    this.isEditing = false;
    this.tmpPersonne = new User;
    this.commentaires = new Array()
    this.ListEditor =  new Array();
  }
  
    ngOnInit() {
      this.ListEditor =  new Array();
      this.CommentaireCollection = this.db.collection("Commentaire");
      this.document$ = this.CommentaireCollection.valueChanges();
      this.document$.subscribe((list: commentary[]) => {this.commentaires = list.reverse()
        this.commentaires.forEach(
          (commentaire: commentary) => {
          let test  = this.db.doc('users/' + commentaire.idUserPost).valueChanges();
          test.subscribe(value => {
            this.ListEditor.push(<User> value)
          }).unsubscribe;
        }
        
      )
      }
        ).unsubscribe;
       this.tmpMessage="writre your comment"
    }
  /*sortMyList(arg0: commentary[]): commentary[] {
        }*/
  getAllEditors() {
      this.commentaires.forEach(
          (commentaire: commentary) => {
          let test  = this.db.doc('users/' + commentaire.idUserPost).valueChanges();
          test.subscribe(value => {
            console.log(value)
            this.ListEditor.push(<User> value)
          }).unsubscribe;

          }
        
      )
      this.reduceMe()

        }

      reduceMe(){
        let tmpUser: User[]
          this.ListEditor.forEach(User => {
            if(tmpUser.indexOf(User)==-1){
              tmpUser.push(User);
            }
            
            
          });
          this.ListEditor=tmpUser
      }


    getUserName(id:string):User{
     let     flagFind = false;
     let n =0;
     if(this.ListEditor[n]!=undefined){
        while(!flagFind){
          if(this.ListEditor[n].uid == id){
            return(this.ListEditor[n])
          }
          n++;
        }
      }
      return new User
    }

    getDate(date:Date){
      return(formatDate(date, 'dd-MM-yyyy hh:mm:ss a', 'en-US'))
    }
    
    addNewCom(com:commentary){
      console.log(this.tmpMessage)
      let test = new subComment(com.idUserPost,this.tmpMessage)
      console.log(test)
      let newSubCom = new subComment(JSON.parse(localStorage.getItem('user')).uid,this.tmpMessage);
      this.db.collection(`Commentaire/${formatDate(com.editTime, 'dd-MM-yyyy hh:mm:ss a', 'en-US').concat(com.idUserPost).concat(com.xmlChange).concat(com.label)}/subComList`).add(JSON.parse(JSON.stringify(newSubCom)));     
    }
  
    
  ShowMeComment(com:commentary){
    this.ListEditorSub = new Array();
  this.SubComFire =  this.db.collection(`Commentaire/${formatDate(com.editTime, 'dd-MM-yyyy hh:mm:ss a', 'en-US').concat(com.idUserPost).concat(com.xmlChange).concat(com.label)}/subComList`);     
  let doc =   this.SubComFire.valueChanges();
    doc.subscribe((list : subComment[])=>{this.SubCom=list;
    console.log(this.SubCom)
    com.showCom=!com.showCom;
    this.SubCom.forEach(
      (commentSub: subComment) => {
      let test  = this.db.doc('users/' + commentSub.idUserPost).valueChanges();
      test.subscribe(value => {
        console.log(value)
        this.ListEditorSub.push(<User> value)
      })
    }
    )
  });
   
  }
  getUserNameSub(id:string):User{
    console.log(id)
    let  flagFind = false;
    let n =0;
    console.log(this.ListEditorSub )
    if(this.ListEditorSub[n]!=undefined){
       while(!flagFind){
         console.log(this.ListEditorSub[n].uid == id)
         if(this.ListEditorSub[n].uid == id){
           return(this.ListEditorSub[n])
         }
         n++;
       }
     }
     return new User

  }
  
  

 //RECENT CHANGE  
}
