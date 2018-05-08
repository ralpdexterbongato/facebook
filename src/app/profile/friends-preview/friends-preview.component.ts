import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-friends-preview',
  templateUrl: './friends-preview.component.html',
  styleUrls: ['./friends-preview.component.css']
})
export class FriendsPreviewComponent implements OnInit {

  constructor(private http:HttpClient) { }
  @Input('friendData') frienddata;
  ngOnInit() {
  	this.countFriendNewPost();
  }
  newpostcount = 0;
  countFriendNewPost()
  {
  	this.http.get(`//127.0.0.1:8000/api/count-user-new-post/`+this.frienddata.id).subscribe(
  		data=>{
  			this.handleCountResult(data);
  			console.log(data);
  			console.log(data);
  		},
  		error=>{

  		})
  }
  handleCountResult(data)
  {
  	this.newpostcount = data;
  }
}
