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
  searching =false;
  pagination ={
    current_page:0,
    next_page_url:null,
  }
  ngOnInit() {
  	this.countFriendRequest();
  }
   getFriendRequests(page)
  {
    this.searching=true;
    this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/my-requests?page`+page).subscribe(
      data=>{
        if(this.pagination.current_page == 0)
        {
          this.handleReceivedFriendReq(data)
        }else
        {
          this.handleNextPages(data);
        }
        console.log(data);
        this.totalRequest=0;
      },
      error=>{
        console.log(error);
      });
  }
  handleNextPages(data)
  {
    for (let i = 0; i < data.data.length; i++) {
        this.userFriendRequests.push(data.data[i]);
    }
    this.pagination = data;
    this.searching=false;
  }
  handleReceivedFriendReq(data)
  {
    this.userFriendRequests = data.data;
    this.pagination = data;
    this.searching=false;
  }
  countFriendRequest()
  {
    this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/count-requests`).subscribe(
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
      this.getFriendRequests(1);
      this.updateAllAsSeen();
    }
  }
  updateAllAsSeen()
  {
    this.http.put(`https://ralpdexterfacebookapp.herokuapp.com/api/update-req-as-seen`,{}).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      })
  }
}
