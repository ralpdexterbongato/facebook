import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-postbox',
  templateUrl: './postbox.component.html',
  styleUrls: ['./postbox.component.css']
})
export class PostboxComponent implements OnInit {
@Input('postID') pId;

  constructor(private http:HttpClient) { }
  ngOnInit() {
  	this.getPostedData();
  }
  dataresult = [];
  getPostedData()
  {
  	if(this.pId)
  	{
  		this.http.get('//127.0.0.1:8000/api/post/'+this.pId).subscribe(
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
  	this.dataresult = data;
  }
}
