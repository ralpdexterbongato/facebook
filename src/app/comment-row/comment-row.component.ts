import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {TokenService }from '../services/token.service'; 
@Component({
  selector: 'app-comment-row',
  templateUrl: './comment-row.component.html',
  styleUrls: ['./comment-row.component.css']
})
export class CommentRowComponent implements OnInit {
@Input('commentparentID') commentparentId;
  constructor(
    private http:HttpClient,
    private token:TokenService,
    ) { }
  currentUserID = this.token.getUserId();
  mainCommentData = [];
  optionShow = false;
  loading = true;
  loadReply = false;
  commentreactionArray=[];
  reactionTotal =0;
  updateText ='';
  updateIsVisible =false;
  latestreply =[];
  ngOnInit() {
  	this.ViewCommentData();
    this.getCommentReacts();
    this.latestReply();
  }
  updateComment()
  {
    this.http.put(`https://ralpdexterfacebookapp.herokuapp.com/api/post-comments/`+this.commentparentId,{
      content :this.updateText,
    }).subscribe(
    data=>{
      console.log(data);
      this.closeUpdate();
      this.ViewCommentData();
    },
    error=>{
      console.log(error);
    })
  }
  showupdate()
  {
    this.updateText = this.mainCommentData[0].content;
    this.updateIsVisible = true;
  }
  closeUpdate()
  {
    this.updateIsVisible = false;
  }
  ViewCommentData()
  {
    this.loading = true;
  	this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/post-comments/`+this.commentparentId).subscribe(
  		data=>{
  			this.handleResults(data);
  		},
  		error=>{
  			console.log(error);
  		});
  }
  handleResults(data)
  {
    this.loading=false;
  	this.mainCommentData = data;
  }

  getCommentReacts()
  {
    this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/comment-reactions/`+this.commentparentId).subscribe(
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
    this.http.delete(`https://ralpdexterfacebookapp.herokuapp.com/api/post-comments/`+this.commentparentId).subscribe(
      data=>{
        console.log(data)
        this.mainCommentData =[];
      },
      error=>{
        console.log(error);
      })
  }
  latestReply()
  {
    this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/replies-of-comment-latest/`+this.commentparentId).subscribe(
      data=>{
        console.log(data);
        console.log('eyes here!!!!');
        this.handleLatestReply(data);
      },
      error=>{
        console.log(error);
      })
  }
  handleLatestReply(data)
  {
    this.latestreply = data;
    console.log(data);
  }
}
