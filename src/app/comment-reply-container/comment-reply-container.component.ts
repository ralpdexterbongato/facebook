import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-comment-reply-container',
  templateUrl: './comment-reply-container.component.html',
  styleUrls: ['./comment-reply-container.component.css']
})
export class CommentReplyContainerComponent implements OnInit {

  constructor(private http:HttpClient) { }
  @Input('mainCommentid') mainCommentID;
  ngOnInit() {
  	this.getReplies();
  }
  commentContent = '';
  replyIds=[];
  postReply()
  {
  	this.http.post(`//127.0.0.1:8000/api/reply`,{
  		content:this.commentContent,
  		mainCommentID:this.mainCommentID,
  	}).subscribe(
  		data=>{
        this.commentContent = '';
  			console.log(data);
  			this.handlePushingToArray(data);
  		},
  		error=>{
  			console.log(error);
  		})
  }
  handlePushingToArray(data)
  {
    this.replyIds.push(data);
  }
  getReplies()
  {
  	this.http.get(`//127.0.0.1:8000/api/replies-of-comment/`+this.mainCommentID).subscribe(
  		data=>{
  			console.log(data);
  			this.handleReplies(data);
  		},
  		error=>{
  			console.log(error);
  		})
  }
  handleReplies(data)
  {
  	this.replyIds = data.data.reverse();
  }
}
