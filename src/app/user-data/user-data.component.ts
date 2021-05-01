import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { User} from '../services/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {


   // Main task 
   task: AngularFireUploadTask;
   // Progress monitoring
   percentage;
   snapshot;
   // Download URL
   downloadURL;
   // State for dropzone CSS toggling
   isHovering: boolean;
  oldPath;
  newPath; 
  userData: User; // Save logged in user data
  userUid;
  userDocument; 
  afStorage: AngularFireStorage; 
  photo ; 

  constructor(public afs: AngularFirestore, afStorage : AngularFireStorage ) {
    this.afStorage = afStorage; 
    this.userUid = this.getUser();
    this.userDocument = this.afs.collection("users").doc(this.userUid);
    var user = this.userDocument.valueChanges();
    this.userData = new User();
    this.newPath = ""; 
    user.subscribe( value => {
      this.userData = value;
      if (value.photoURL != null && value.photoURL != "") {
        this.afStorage.ref(value.photoURL).getDownloadURL().subscribe(value => this.photo = value);
      }
      }
    );
  }

  ngOnInit() {
    
  }

  getUser(){
    return(JSON.parse(localStorage.getItem('user')).uid)
  }

  saveModifications(name){
    if (name != ""){
      this.userData.displayName = name;
    }

    this.userDocument.set(this.userData, {
      merge: true
    });
    if (this.newPath != ""){
      this.afStorage.ref(this.newPath).getDownloadURL().subscribe(value => {
        this.downloadURL = value;
        this.photo = value;
        this.afStorage.ref(this.oldPath).delete();
      });
    }
      
  
  }

  // DropZone
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    this.newPath = "/images/"+this.userData.uid + file.name;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.afStorage.upload(this.newPath, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()

    // The file's download URL
    
    this.oldPath = this.userData.photoURL;

    this.userData.photoURL = "/images/"+this.userData.uid + file.name;
 

  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  // for html
  showEdit() {
    var x = document.getElementById("formDiv");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  } 

}

