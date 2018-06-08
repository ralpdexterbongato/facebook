import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-latest-logs',
  templateUrl: './latest-logs.component.html',
  styleUrls: ['./latest-logs.component.css']
})
export class LatestLogsComponent implements OnInit {

  constructor(
  	private token:TokenService,
   	private http:HttpClient,
   	private route:Router,
   	private app:AppComponent,
  	)
  {
  }
  submitLoading = false;
  showAddLogin = false;
  showShortCutLogin = false;
  emailInput = '';
  passwordInput = '';
  emailShortcut = 'ralpdexterbongato@gmail.com';
  passwordShortcut = '';
  ngOnInit() {
  }

  toggleModalAddLogin()
  {
  	this.showAddLogin = !this.showAddLogin;
  }
  toggleShortCutLogin()
  {
  	this.showShortCutLogin = !this.showShortCutLogin;
  }

  LogInAttemptShortcut()
  {
    this.submitLoading = true;
    this.http.post(`https://ralpdexterfacebookapp.herokuapp.com/api/login`,{
      email:this.emailShortcut,
      password:this.passwordShortcut,
    }).subscribe(
    data=>{
      console.log(data);
      this.handleResult(data);
      this.submitLoading = false;
    },
    error=>{
      console.log(error);
      this.submitLoading = false;
    });
  }
  LogInAttempt()
  {
  	this.submitLoading = true;
  	this.http.post(`https://ralpdexterfacebookapp.herokuapp.com/api/login`,{
  		email:this.emailInput,
  		password:this.passwordInput,
  	}).subscribe(
  		data=>{
  			console.log(data);
  			this.handleResult(data);
  			this.submitLoading = false;
  		},
  		error=>{
  			console.log(error);
  			this.submitLoading = false;
  		});
  }
  handleResult(data)
  {
  	this.token.setToken(data.access_token);
  	this.app.refreshNavState();
  	this.route.navigate(['home']);
  }

}
