import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-newsfeedbox',
  templateUrl: './newsfeedbox.component.html',
  styleUrls: ['./newsfeedbox.component.css']
})
export class NewsfeedboxComponent implements OnInit {
@Input('friendID') FriendId;

  constructor(private http:HttpClient) { }
  ngOnInit() {
  	this.getPostedData();
  }
  friendData = [];
  getPostedData()
  {
  	if(this.FriendId)
  	{
  		this.http.get('//127.0.0.1:8000/api/newsfeedpostings/'+this.FriendId).subscribe(
  		data=>{
  			console.log(data);
  			this.handleDataResult(data);
  		},
  		error=>{
  			console.log(error);
  		}
  		);
  	}
  }
  handleDataResult(data)
  {
  	if(data.length > 0)
  	{
  		this.friendData = data[0];
  	}
  }
}

