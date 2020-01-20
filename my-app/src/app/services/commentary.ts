import { formatDate } from '@angular/common';
import { subComment } from './subComment';

export class commentary{
    xmlChange:string;
    codeSetChange:string;
    codeBefore: string;
    showCom : boolean;
    editTime:Date;
    codeAfter:string;
    idUserPost:string;
    label:string;

    constructor(xml,uid,label){
        let today = new Date();
        this.editTime = today;
        // formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US');
        this.xmlChange=xml;
        this.idUserPost=uid;
        this.codeAfter="";
        this.codeBefore="";
        this.showCom=false;
        this.label=label;
    }
    
}