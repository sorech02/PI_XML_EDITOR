import { formatDate } from '@angular/common';

export class commentary{
    xmlChange:string;
    codeSetChange:string;
    codeBefore: string;
  //listCommentaires : smallCommentaire[];
    showCom : boolean;
    editTime:string;
    codeAfter:string;
    idUserPost:string;
    label:string;

    constructor(xml,uid,label){
        let today = new Date();
        this.editTime = formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US');
        this.xmlChange=xml;
        this.idUserPost=uid;
        this.codeAfter="";
        this.codeBefore="";
        this.showCom=false;
        this.label=label;
    }
    
}