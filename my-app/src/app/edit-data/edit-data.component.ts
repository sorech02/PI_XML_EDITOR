import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {

  label: string;
  code: string;
  listOfLinks :any[];
  description: string;

  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.label = this.data.getDataById(+id).data.label;
    this.code = this.data.getDataById(+id).data.code;
    this.listOfLinks = this.data.getLinksByIndex(+id);
    this.description = this.data.getDataById(+id).data.description; 
    
  }

}
