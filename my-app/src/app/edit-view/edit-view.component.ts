import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Codeset, loadAndParseFromUrl} from '../edit-data/parser'

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements OnInit {

  

  constructor(private codeset : Codeset) { }


  
  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form.value['url']);
    var str: string = form.value['url'];
    this.codeset = loadAndParseFromUrl(str);
  }

}
