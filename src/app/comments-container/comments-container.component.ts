import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.css']
})
export class CommentsContainerComponent implements OnInit {
	@Input('postid') postID;
  constructor(private http:HttpClient) { }
  commentcontent='';
  ngOnInit() {
  	this.getCommentsOfPost();
  }
  parentCommentIds=[];
  getCommentsOfPost()
  {
  	this.http.get(`//127.0.0.1:8000/api/commentsofpost/`+this.postID).subscribe(
  		data=>{
  			this.handleCommentIDs(data);
  		},
  		error=>{
  			console.log(error);
  		});
  }
  handleCommentIDs(data)
  {
    this.parentCommentIds = data.data.reverse();
  }
  postComment()
  {
  	this.http.post(`//127.0.0.1:8000/api/post-comments`,{
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
