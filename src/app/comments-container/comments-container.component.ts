import { Component, OnInit, Input,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.css']
})
export class CommentsContainerComponent implements OnInit {
	@Input('postid') postID;
  constructor(
    private http:HttpClient,
    private tokenservice:TokenService
    ) { }
  userGender = null;
  commentcontent='';
  showpagination = true;
  pagination={
    next_page_url:null,
    current_page:0,
  };
  ngOnInit() {
    this.getCommentsOfPost(1);
    this.getUserGender();
  }
  parentCommentIds=[];
  getUserGender()
  {
    this.userGender = this.tokenservice.getGender();
  }
  getCommentsOfPost(page)
  {
    this.showpagination = false;
  	this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/commentsofpost/`+this.postID+`?page=`+page).subscribe(
  		data=>{
        this.showpagination = true;
  			if(this.pagination.current_page == 0)
        {
          this.handleCommentIDs(data);
        }else
        {
          this.handleNextPage(data);
        }
  		},
  		error=>{
  			console.log(error);
  		});
  }
  handleNextPage(data)
  {
    var newpagedata = data.data.reverse();
    for (var i = newpagedata.length - 1; i >= 0; i--) {
      this.parentCommentIds.unshift(newpagedata[i]);
    }
    this.pagination = data;
  }
  handleCommentIDs(data)
  {
    this.parentCommentIds = data.data.reverse();
    this.pagination = data;
  }
  postComment()
  {
  	this.http.post(`https://ralpdexterfacebookapp.herokuapp.com/api/post-comments`,{
  		'content':this.commentcontent,
  		'postid':this.postID,
  	}).subscribe(
  	data=>{
      this.commentcontent = '';
      this.handlePushingToArray(data);
  	},
  	error=>{
  		console.log(error);
  	})
  }
  handlePushingToArray(data)
  {
    this.parentCommentIds.push(data);
  }

}
