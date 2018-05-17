import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-comment-reply-row',
  templateUrl: './comment-reply-row.component.html',
  styleUrls: ['./comment-reply-row.component.css']
})
export class CommentReplyRowComponent implements OnInit {
@Input('replyid') replyID;
@Output('clickreply') replybtnClick =new EventEmitter();
  constructor(private http:HttpClient) { }

  optionShow = false;
  updateText = '';
  updateIsVisible = false;
  loading = true;

  replydata = [];
  reactionTotal=0;
  commentreactionArray = [];
  ngOnInit() {
  	this.ShowReply();
    this.getCommentReacts();
  }
  ShowReply()
  {
    this.loading = true;
    this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/reply/`+this.replyID).subscribe(
      data=>{
        console.log(data);
        this.closeUpdate();
        this.handleReplyData(data);
      },
      error=>{
        console.log(error);
      });
  }
  updateReply()
  {
    this.http.put(`https://ralpdexterfacebookapp.herokuapp.com/api/reply/`+this.replyID,{
      content : this.updateText,
    }).subscribe(data=>{
      this.ShowReply();
    },error=>{
      console.log(error);
    })
  }
  showupdate()
  {
    this.updateText = this.replydata[0].content;
    this.updateIsVisible = true;
  }
  closeUpdate()
  {
    this.updateIsVisible = false;
  }
  handleReplyData(data)
  {
  	this.replydata = data;
    this.loading=false;
  }
  getCommentReacts()
  {
    this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/comment-reactions/`+this.replyID).subscribe(
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
  deleteComment()
  {
    this.http.delete(`https://ralpdexterfacebookapp.herokuapp.com/api/post-comments/`+this.replyID).subscribe(
      data=>{
        console.log(data)
        this.replydata =[];
      },
      error=>{
        console.log(error)
      })
  }
}
