import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { transition,style,animate, trigger} from '@angular/animations';
@Component({
  selector: 'app-post-reactions',
  templateUrl: './post-reactions.component.html',
  styleUrls: ['./post-reactions.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('200ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('80ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
  ],
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
    this.focusInput();
  }
  focusInput()
  {
    document.getElementById('MainCommentInput').focus();
  }
  iconsHover()
  {
    clearTimeout(this.outTimer);
    this.showChoices = true;
  }
  OnHover()
  {
  	  this.inTimer = setTimeout(()=>{
  		this.showChoices = true;
  	},500);
  	 clearTimeout(this.outTimer);
  }
  OnLeave()
  {
  	this.outTimer= setTimeout(()=>{
  		this.showChoices=false;
  	},200);
  	clearTimeout(this.inTimer);
  }

  savereact(reaction)
  {
    this.showChoices = false;
    this.activateAnimation();
    this.myreact = reaction;
  	this.http.post(`https://ralpdexterfacebookapp.herokuapp.com/api/post-reactions`,{
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
    this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/post-count-reacts/`+this.postID).subscribe(
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
    this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/my-react-to-post/`+this.postID).subscribe(
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
    this.http.delete(`https://ralpdexterfacebookapp.herokuapp.com/api/post-reactions/`+this.postID).subscribe(
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
