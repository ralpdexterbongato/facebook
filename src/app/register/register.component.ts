import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private route:Router,
    private token:TokenService,
    private app :AppComponent
  ) { }
  days = [];
  years = [];
  contact = '';
  validemail = false;
  submitting = false;
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
  checkIfEmail()
  {
    var regex = /^\w+@\w+.(com|org|jp)$/;
    if(regex.test(this.contact))
    {
      this.validemail = true;
    }else
    {
      this.validemail =false;
    }
  }
  SubmitRegister()
  {
    this.submitting =true;
    this.token.setToken();
    this.app.refreshNavState();
    this.route.navigate(['check-your-email']);
  }
}
