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
  ngOnInit() {
  	this.ShowReply();
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
}
