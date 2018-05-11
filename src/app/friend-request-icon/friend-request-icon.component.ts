import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-friend-request-icon',
  templateUrl: './friend-request-icon.component.html',
  styleUrls: ['./friend-request-icon.component.css']
})
export class FriendRequestIconComponent implements OnInit {

  constructor(private http:HttpClient) { }

  userFriendRequests = [];
  totalRequest=0;
  friendReqIsActive = false;
  searching = true;
  ngOnInit() {
  	this.countFriendRequest();
  }
   getFriendRequests()
  {
    this.http.get(`//127.0.0.1:8000/api/my-requests`).subscribe(
      data=>{
        this.handleReceivedFriendReq(data);
        console.log(data);
        this.searching=false;
        this.totalRequest=0;
      },
      error=>{
        console.log(error);
        this.searching=false;
      });
  }
  handleReceivedFriendReq(data)
  {
    this.userFriendRequests = data.data;
  }
  countFriendRequest()
  {
    this.http.get(`//127.0.0.1:8000/api/count-requests`).subscribe(
    	data=>{
    		this.handletotalData(data);
    	},
    	error=>{
    		console.log(error);
    	})
  }
  handletotalData(data)
  {
  	this.totalRequest = data;
  }
  toggleFriendRequest()
  {
    this.friendReqIsActive = !this.friendReqIsActive;
    if((this.friendReqIsActive == true) && (this.userFriendRequests.length == 0))
    {
      this.getFriendRequests();
      this.updateAllAsSeen();
    }
  }
  updateAllAsSeen()
  {
    this.http.put(`//127.0.0.1:8000/api/update-req-as-seen`,{}).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      })
  }
}
