import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-comment-row',
  templateUrl: './comment-row.component.html',
  styleUrls: ['./comment-row.component.css']
})
export class CommentRowComponent implements OnInit {
@Input('commentparentID') commentparentId;
  constructor(private http:HttpClient) { }
  mainCommentData = [];
  loading = true;
  loadReply = false;
  ngOnInit() {
  	this.ViewCommentData();
  }

  ViewCommentData()
  {
  	this.http.get(`//127.0.0.1:8000/api/post-comments/`+this.commentparentId).subscribe(
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

}
