import { formatDate } from '@angular/common';
import { subComment } from './subComment';

export class commentary{
    xmlChange:string;
    whereChanged:string[]
    codeBefore: string[];
    listCommentaires : subComment[];
    showCom : boolean;
    editTime:Date;
    codeAfter:string[];
    idUserPost:string;
    label:string;
    typeCom:String;

    constructor(xml,uid,label,typeCom){
        let today = new Date();
        this.editTime = today;
        this.typeCom=typeCom;
        // formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US');
        this.xmlChange=xml;
        this.idUserPost=uid;
        this.whereChanged= new Array();
        this.codeAfter=new Array();
        this.codeBefore=new Array();
        this.showCom=false;
        this.label=label;
        this.listCommentaires=new Array();
    }
    
}