import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-verifysuccess',
  templateUrl: './verifysuccess.component.html',
  styleUrls: ['./verifysuccess.component.css']
})
export class VerifysuccessComponent implements OnInit {

  constructor(
    private token:TokenService,
    private http:HttpClient,
    private route:Router,
    private app:AppComponent,
  ) { }
  myemail ='';
  ngOnInit() {
    this.refreshtoken();
    this.getEmail();
  }
  getEmail()
  {
    this.myemail = this.token.getEmail();
  }
  refreshtoken()
  {
    this.http.post(`//127.0.0.1:8000/api/refresh`,{}).subscribe(
      data=>{
        this.handleData(data);
      },
      error=>{
        console.log(error);
      }
    )
  }
  handleData(data)
  {
    this.token.setToken(data.access_token);
  }
  redirectToHome()
  {
    this.app.refreshNavState();
    this.route.navigate(['home']);
  }
}
