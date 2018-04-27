import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }
  days = [];
  years = [];
  ngOnInit() {
    this.initDays();
    this.initYear();
  }

  initDays()
  {
    for(var i=1; i < 32;i++)
    {
      this.days.push(i);
    }
  }

  initYear()
  {
    var currentYear =  (new Date()).getFullYear();
    var limit = currentYear - 17;
    var start = currentYear - 100;
    for(var i=start; i < limit; i++)
    {
      this.years.push(i);
    }
  }
}
