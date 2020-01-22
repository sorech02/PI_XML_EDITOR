import { formatDate } from '@angular/common';

export class subComment{
    message: string;
    editTime:Date;
    idUserPost:string;

    constructor(uid, message){
        this.editTime = new Date();       
        //formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US');
        this.idUserPost=uid;
        this.message=message;
    }
    
}