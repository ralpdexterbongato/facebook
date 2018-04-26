import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router, private token:TokenService,private app:AppComponent) { }

  ngOnInit() {
  }

  SubmitCredentials()
  {
    this.token.setToken();
    this.app.triggerLoginBtn();
    this.route.navigate(['home']);
  }

}
