import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private route:Router,
    private token:TokenService,
    private app:AppComponent,
    private http:HttpClient,
  ) { }

  ngOnInit() {
  }
  loading =false;
  public loginForm = {
    email : null,
    password : null,
  }
  SubmitCredentials()
  {
    this.loading = true;
    this.http.post(`https://ralpdexterfacebookapp.herokuapp.com/api/login`,{
      email: this.loginForm.email,
      password: this.loginForm.password
    }).subscribe(
      data => {
        console.log(data);
        this.handleSuccessLogin(data);
        this.loading = false;
      },
      error=> {
        console.log(error);
        this.handleLoginError(error);
        this.loading=false;
      }
    );
  }
  handleSuccessLogin(data)
  {
    this.token.setToken(data.access_token);
    this.app.refreshNavState();
    this.route.navigate(['home']);
  }
  handleLoginError(data)
  {

  }
}
