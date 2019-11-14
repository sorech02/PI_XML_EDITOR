import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { xmlParser } from './edit-view.xmlParser'; 

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements OnInit {
  codeset;
  
  constructor() { }
  
  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    var str: string = form.value['url'];
    var xmlParserObj = new xmlParser(str);
    this.codeset = xmlParserObj.getCodeset();
    //console.log(this.codeset.toString());
  }
}