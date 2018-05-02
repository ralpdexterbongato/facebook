import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {

  constructor(private token:TokenService) { }

  userfname = '';
  userlname = '';
  ngOnInit() {
    this.getFullName();
  }

  getFullName()
  {
    this.userfname = this.token.getUserFName();
    this.userlname = this.token.getUserFName();
  }
}
