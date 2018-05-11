import { Component , OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import { TokenService } from './services/token.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor(
    private route:Router,
    private token:TokenService,
    private http:HttpClient
  ){}
  signin = false;
  menuIsActive = false;
  isVerified = false;
  userFname = '';
  userId = '';
  usergender ='';

  userFriendRequests = [];
  ngOnInit() {
    this.route.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    this.refreshNavState();

  }

  toggleMenu()
  {
    this.menuIsActive = !this.menuIsActive;
  }
  refreshNavState()
  {
   this.isVerified = this.token.checkIfVerified();
   this.userFname = this.token.getUserFName();
   this.signin =  this.token.isLoggedIn();
   this.userId = this.token.getUserId();
   this.usergender = this.token.getGender();
  }
  logout()
  {
    this.http.post(`//127.0.0.1:8000/api/logout`,{}).subscribe(
      data=>{
        this.token.removeToken();
        this.refreshNavState();
        this.menuIsActive = false;
        this.route.navigate(['']);
      },
      error=>{
        this.token.removeToken();
        this.refreshNavState();
        this.menuIsActive = false;
        this.route.navigate(['']);
      }
    )
  }
 
}
