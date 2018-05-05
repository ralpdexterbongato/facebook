import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {

  constructor(private token:TokenService) { }

  fullname='';
  ngOnInit() {
    this.getFullName();
  }

  getFullName()
  {
    this.fullname = this.token.getUserFName()+' '+this.token.getUserLName();
  }
}
