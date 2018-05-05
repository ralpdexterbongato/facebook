import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-side-categories',
  templateUrl: './side-categories.component.html',
  styleUrls: ['./side-categories.component.css']
})
export class SideCategoriesComponent implements OnInit {

  fullname='';
  constructor(private token:TokenService) { }

  ngOnInit() {
    this.fullname = this.token.getUserFName()+' '+this.token.getUserLName();
  }
}
