import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }

  textareaIsActive= false;
  postext ='';
  postBackground=null;
  postPrivacy='1';
  tags = [];

  setActive()
  {
    this.textareaIsActive = true;
  }
  setInActive()
  {
    this.textareaIsActive = false;
  }
}
