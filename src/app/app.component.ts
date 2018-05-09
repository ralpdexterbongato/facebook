import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TokenService } from './services/token.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(
    private route:Router,
    private token:TokenService,
    private http:HttpClient
  ){}
  signin = false;
  menuIsActive = false;
  friendReqIsActive =false;
  isVerified = false;
  userFname = '';
  userId = '';
  usergender ='';

  userFriendRequests = [];
  ngOnInit() {
    this.refreshNavState();
  }

  toggleMenu()
  {
    this.menuIsActive = !this.menuIsActive;
    this.friendReqIsActive = false;
  }
  toggleFriendRequest()
  {
    this.friendReqIsActive = !this.friendReqIsActive;
    this.menuIsActive = false;
    if((this.friendReqIsActive == true) && (this.userFriendRequests.length == 0))
    {
      this.getFriendRequests();
    }

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
  getFriendRequests()
  {
    this.http.get(`//127.0.0.1:8000/api/my-requests`).subscribe(
      data=>{
        this.handleReceivedFriendReq(data);
        console.log(data);
      },
      error=>{
        console.log(data);
      });

  }
  handleReceivedFriendReq(data)
  {
    this.userFriendRequests = data.data;
  }
}
