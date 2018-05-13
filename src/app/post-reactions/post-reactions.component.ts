import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-post-reactions',
  templateUrl: './post-reactions.component.html',
  styleUrls: ['./post-reactions.component.css']
})
export class PostReactionsComponent implements OnInit {
@Input('postid') postID;
  constructor(private http:HttpClient) { }
  showChoices = false;
  inTimer;
  outTimer;
  totalReact = 0;
  topReacts = [];
  myreact=null;
  animateActive = false;
  ngOnInit() {
    this.getMyReaction();
    this.countReacts();
  }

  OnHover()
  {
  	  this.inTimer = setTimeout(()=>{
  		this.showChoices = true;
  	},1000);
  	 clearTimeout(this.outTimer);
  }
  OnLeave()
  {
  	this.outTimer= setTimeout(()=>{
  		this.showChoices=false;
  	},500);
  	clearTimeout(this.inTimer);
  }

  savereact(reaction)
  {
    this.activateAnimation();
    this.myreact = reaction;
  	this.http.post(`//127.0.0.1:8000/api/post-reactions`,{
  			type: reaction,
  			postID:this.postID
  		}).subscribe(
  		data=>{
        this.countReacts();
  			console.log(data);
  		},
  		error=>{
  			console.log(error);
  		})
  }
  activateAnimation()
  {
    this.animateActive=true;
  }
  countReacts()
  {
    this.http.get(`//127.0.0.1:8000/api/post-count-reacts/`+this.postID).subscribe(
      data=>{
        console.log(data);
        this.handleCountResult(data);
      },
      error=>{
        console.log(error);
      })
  }

  handleCountResult(data)
  {
    this.totalReact = 0;
    this.showChoices=false;
    for (var i = data.length - 1; i >= 0; i--) {
      this.totalReact = this.totalReact + Number(data[i].total);
    }
    this.topReacts = data.slice(0,3);
    console.log(this.topReacts);
  }
  getMyReaction()
  {
    this.http.get(`//127.0.0.1:8000/api/my-react-to-post/`+this.postID).subscribe(
      data=>{
        console.log(data);
        this.myreact = data;
      },
      error=>{
        console.log(error);
      })
  }
  removeReaction()
  {
    this.http.delete(`//127.0.0.1:8000/api/post-reactions/`+this.postID).subscribe(
      data=>{
        console.log(data);
        this.myreact=null;
        this.countReacts();
      },
      error=>{
        console.log(error);
      })
  }

}
