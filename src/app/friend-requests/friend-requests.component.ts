import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {
  @Input('userRequesting') ReqUserData;
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  RelationStatus  = null;
  getMutual()
  {
  	//soon...
  }
  accept()
  {
    this.http.post(`https://ralpdexterfacebookapp.herokuapp.com/api/acceptfriend`,{
      userid:this.ReqUserData.id,
    }).subscribe(
      data=>{
        this.RelationStatus = 0;
        console.log(data);
      },
      error=>{
        console.log(error);
      })
  }
  decline()
  {
    this.http.delete(`https://ralpdexterfacebookapp.herokuapp.com/api/remove-request/`+this.ReqUserData.id,{}).subscribe(
      data=>{
        this.RelationStatus = 1;
        console.log(data);
      },
      error=>{
        console.log(error);
      })
  }

}
