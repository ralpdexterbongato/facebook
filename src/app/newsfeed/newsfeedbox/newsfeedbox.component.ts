import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newsfeedbox',
  templateUrl: './newsfeedbox.component.html',
  styleUrls: ['./newsfeedbox.component.css']
})
export class NewsfeedboxComponent implements OnInit {
@Input('friendID') FriendId;

  constructor(
    private http:HttpClient,
    ) { }
  ngOnInit() {
  	this.getPostedData();
  }
  newpostings = [];

  getPostedData()
  {
  	if(this.FriendId)
  	{
  		this.http.get('https://ralpdexterfacebookapp.herokuapp.com/api/newsfeedpostings/'+this.FriendId).subscribe(
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
  	if(data.data.length > 0)
  	{
  		this.newpostings = data.data;
  	}
  }
}
