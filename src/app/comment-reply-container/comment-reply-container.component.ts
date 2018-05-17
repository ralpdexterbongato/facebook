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
    this.focusInput();
  }
  pagination=[];
  commentContent = '';
  replyIds=[];
  focusInput()
  {
    document.getElementById('replyinput').focus();
  }
  postReply()
  {
  	this.http.post(`https://ralpdexterfacebookapp.herokuapp.com/api/reply`,{
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
  	this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/replies-of-comment/`+this.mainCommentID).subscribe(
  		data=>{
  			console.log(data);
  			if(this.pagination==null)
        {
          this.handleReplies(data);
        }else
        {
          this.handleNextPages(data);
        }
  		},
  		error=>{
  			console.log(error);
  		})
  }
  handleNextPages(data)
  {
    this.pagination = data;
    var newPageData = data.data.reverse();
    for (var i = newPageData.length - 1; i >= 0; i--) {
      this.replyIds.unshift(newPageData[i]);
    }
  }
  handleReplies(data)
  {
    this.pagination=data;
  	this.replyIds = data.data.reverse();
  }
}
