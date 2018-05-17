import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-postbox',
  templateUrl: './postbox.component.html',
  styleUrls: ['./postbox.component.css']
})
export class PostboxComponent implements OnInit {
@Input('postID') pId;

  constructor(private http:HttpClient,private token:TokenService) { }
  ngOnInit() {
  	this.getPostedData();
  }
  dataresult = [];
  postUpdateText='' ;
  updateShow = false;
  loading=true;
  currentUserId = this.token.getUserId();
  deletePost()
  {
    this.loading=true;
    this.http.delete(`//127.0.0.1:8000/api/post/`+this.pId).subscribe(
      data=>{
        console.log(data);
        this.handleAfterDelete();
      },
      error=>{
        console.log(error);
      })
  }
  handleAfterDelete()
  {
    this.loading= false;
    this.dataresult = [];
  }
  updatePost()
  {
    this.http.put(`//127.0.0.1:8000/api/post/`+this.pId,{
      description:this.postUpdateText,
    }).subscribe(
    data=>{
      this.handleAfterUpdate();
    },
    error=>{
      console.log(error);
    })
  }
  handleAfterUpdate()
  {
    this.dataresult[0].description = this.postUpdateText;
    this.closeEdit();
  }
  openEdit()
  {
    this.postUpdateText = this.dataresult[0].description;
    this.updateShow = true;
  }
  closeEdit()
  {
    this.updateShow = false;
  }
  getPostedData()
  {
  	if(this.pId)
  	{
  		this.http.get('//127.0.0.1:8000/api/post/'+this.pId).subscribe(
  		data=>{
  			console.log(data);
  			this.handleDataResult(data);
        this.loading=false;
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
