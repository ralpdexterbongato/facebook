import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router, ActivatedRoute }from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userdata={
    fname:'',
    lname:'',
    gender:null,
  };
  profileid='';
  currentUserID='';
  relation='';
  totalfriends='0';
  constructor(
    private token:TokenService,
    private activeroute:ActivatedRoute,
    private http:HttpClient,
  )
  {
    this.activeroute.paramMap.subscribe(
      param=>{
        this.profileid = param.get('id');
        this.getUserData();
        this.getCurrentUserID();
      }
    )
   }
  ngOnInit() {
    // this.getUserData();
  }
  getCurrentUserID()
  {
    this.currentUserID = this.token.getUserId();
  }
  getUserData()
  {
    this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/user/`+this.profileid).subscribe(
      data=>{
        this.handleUserData(data);
        console.log(data);
      }
    );
  }
  handleUserData(data)
  {
    this.userdata = data.userdata[0];
    this.handleWhatRelation(data.relation);
    var res = data.totalfriends -1;
    this.totalfriends = res.toLocaleString(undefined,{ minimumFractionDigits: 0 });
  }
  handleWhatRelation(relation)
  {
    if(relation.length == 0)
    {
      this.relation = '0';
      // no relation
    }else if(relation.length == 1 && relation[0].user_idf == this.currentUserID)
    {
      this.relation = '1';
      // i sent the req  & still waiting for confirmation
    }else if(relation.length == 1 && relation[0].user_ids == this.currentUserID)
    {
      this.relation = '2';
      // the user sent me a request
    }else if(relation.length > 1 && relation[0].isFriends!=null)
    {
      this.relation = '3';
      // no relation
    }else
    {
      this.relation = '0';
    }
  }
  sendRequest()
  {
    this.http.post(`https://ralpdexterfacebookapp.herokuapp.com/api/addfriend`,{
      userid: this.profileid
    }).subscribe(
      data=>{
        console.log(data);
        this.handleAfterSentRequest();
      },
      error=>{
        console.log(error);
      }
    )
  }
  handleAfterSentRequest()
  {
    this.relation = '1';
  }
  acceptRequest()
  {
    this.http.post(`https://ralpdexterfacebookapp.herokuapp.com/api/acceptfriend`,{
      userid:this.profileid
    }).subscribe(
      data=>{
        console.log(data);
        this.handleAcceptSuccess();
      },
      error=>{
        console.log(error);
      }
    );
  }
  handleAcceptSuccess()
  {
    this.relation = '3';
  }
  removeRequest(otherid)
  {
    this.http.delete(`https://ralpdexterfacebookapp.herokuapp.com/api/remove-request/`+otherid).subscribe(
      data=>{
        console.log(data);
        this.displayAddFriendButton();
      },
      error=>{
        console.log(error);
      }
      );
  }
  displayAddFriendButton()
  {
    this.relation = '0';
  }
  unfriendUser(otherid)
  {
    this.http.delete(`https://ralpdexterfacebookapp.herokuapp.com/api/unfriend/`+otherid).subscribe(
      data=>{
        console.log(data);
        this.displayAddFriendButton();
      },
      error=>{
        console.log(error);
      })
  }
}
