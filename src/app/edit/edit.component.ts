import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditPageComponent implements OnInit {

  @Input() label: string;
  @Input() type: string;
  @Input() codeset: any[];

  constructor(private router: Router) {}

  ngOnInit() {
  }

  onLinksOfSelectedData() {}

}
