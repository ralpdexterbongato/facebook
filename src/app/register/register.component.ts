import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private route:Router,
    private token:TokenService,
    private app :AppComponent,
    private http:HttpClient
  ) { }
  years = [];
  contact = '';
  validemail = false;
  submitting = false;
  ngOnInit() {
    this.initYear();
  }
  public form = {
    fname:null,
    lname:null,
    email:null,
    email_confirmation:null,
    password:null,
    month:null,
    day:null,
    year:null,
    gender:null,
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
    if(regex.test(this.form.email))
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
    this.http.post(`//127.0.0.1:8000/api/register`,{
      fname : this.form.fname,
      lname : this.form.lname,
      email : this.form.email,
      email_confirmation : this.form.email_confirmation,
      password: this.form.password,
      birthday:this.form.year+'-'+this.form.month+'-'+this.form.day,
      gender: this.form.gender
    }).subscribe(
      data=>{
        console.log(data);
        this.submitting =false;
        this.handleRegisterSuccess(data);
      },
      error=>{
        console.log(error);
        this.submitting =false;
        this.handleRegisterError();
      }
    );
  }
  handleRegisterSuccess(data)
  {
    this.token.setToken(data.access_token);
    this.app.refreshNavState();
    this.route.navigate(['check-your-email']);
  }
  handleRegisterError()
  {

  }
}
