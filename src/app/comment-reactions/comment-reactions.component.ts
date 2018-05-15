import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { transition,style,animate, trigger} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-comment-reactions',
  templateUrl: './comment-reactions.component.html',
  styleUrls: ['./comment-reactions.component.css'],
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
export class CommentReactionsComponent implements OnInit {
  @Input('commentID') commentID;
  @Output() reacted = new EventEmitter();

  constructor(private http:HttpClient) { }
  outTimer;
  inTimer;
  showChoices = false;
  MyReact = null;
  ngOnInit() { 
    this.getMyReaction();
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
  getMyReaction()
  {
    this.http.get(`//127.0.0.1:8000/api/my-comment-reaction/`+this.commentID).subscribe(
      data=>{
        console.log(data);
        this.handleMyreact(data);
      },
      error=>{
        console.log(error);
      })
  }
  handleMyreact(data)
  {
    this.MyReact = data;
  }
  saveReaction(type)
  {
    this.showChoices = false;
  	this.http.post(`//127.0.0.1:8000/api/comment-reactions`,{
  		commentID:this.commentID,
  		type:type
  	}).subscribe(
  		data=>{
        this.MyReact = type;
  			console.log(data);
        this.reacted.emit();
  		},
  		error=>{
  			console.log(error);
  		})
  }
  removeReaction()
  {
    this.http.delete(`//127.0.0.1:8000/api/comment-reactions/`+this.commentID).subscribe(
      data=>{
        //do something
        this.MyReact = null;
        this.reacted.emit();
      },
      error=>{
        console.log(error);
      })
  }
}
