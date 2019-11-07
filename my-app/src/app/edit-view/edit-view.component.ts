import { Component, OnInit } from '@angular/core';
import { DataService} from '../services/data.service'

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements OnInit {

  datas :any[];

  constructor(private dataService : DataService) { }


  
  ngOnInit() {
    this.datas = this.dataService.datas;
  }

}
