import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-comment-reply-row',
  templateUrl: './comment-reply-row.component.html',
  styleUrls: ['./comment-reply-row.component.css']
})
export class CommentReplyRowComponent implements OnInit {
@Input('replyid') replyID;
  constructor(private http:HttpClient) { }

  replydata = [];
  reactionTotal=0;
  commentreactionArray = [];
  ngOnInit() {
  	this.ShowReply();
    this.getCommentReacts();
  }

  ShowReply()
  {
  	this.http.get(`//127.0.0.1:8000/api/reply/`+this.replyID).subscribe(
  		data=>{
  			console.log(data);
  			this.handleReplyData(data);
  		},
  		error=>{
  			console.log(error);
  		});
  }
  handleReplyData(data)
  {
  	this.replydata = data;
  }
  getCommentReacts()
  {
    this.http.get(`//127.0.0.1:8000/api/comment-reactions/`+this.replyID).subscribe(
      data=>{
        console.log(data);
        this.handleReacts(data);
      },
      error=>{
        console.log(error);
      });
  }
  handleReacts(data)
  {
    this.reactionTotal = 0;
    for (var i = data.length - 1; i >= 0; i--) {
      this.reactionTotal = this.reactionTotal + data[i].total;
    }
    this.commentreactionArray = data.slice(0,3);
  }
}
