import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditPageComponent implements OnInit {

  @Input() id: number; 
  @Input() data;
  @Input() index;

  isDataSelected = false;
  links: any[];

  constructor(private dataService : DataService, private router: Router){
    
   }
  
  ngOnInit() {
  }

  onLinksOfSelectedData(){
    console.log("index:" + this.index);
    this.links = this.dataService.getLinksByIndex(this.index+1);
    this.isDataSelected = true;
    this.router.navigate(['/data/'+(this.index+1)]);
    console.log(this.links)
  }

}
