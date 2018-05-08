import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @Input('totalFriends') usertotalfriends;
  profid = '';
  friendsData = [];
  constructor(private activeroute: ActivatedRoute,private http:HttpClient) 
  { 
    this.activeroute.paramMap.subscribe(
      param=>{
        this.profid = param.get('id');
        this.getUserNewFrieds();
      })
  }

  ngOnInit() {
    this.scrollTracker();
  }

  scrollTracker()
  {
     var screenHeight = $(window).height();
     var timelineleftHeight = $('.timeline-left-content-container').height();
    $(window).scroll(function(e)
    {
      var scroll = $(window).scrollTop();
      if(scroll + screenHeight > timelineleftHeight + 570)
      {
        $('.timeline-left-content-container').addClass('active');
      }else
      {
        $('.timeline-left-content-container').removeClass('active');
      }
      if(scroll > 310)
      {
        $('.timelineoptions').addClass('active');
      }else
      {
        $('.timelineoptions').removeClass('active');
      }
    });
  }
   // for profile preview
  getUserNewFrieds()
  {
     this.http.get(`//127.0.0.1:8000/api/profile-preview-friends/`+this.profid).subscribe(
         data=>{
           this.handleFriendsPrevResult(data);
           console.log(data);
         },
         error=>{
           console.log(error);
         }
       )
  }
  handleFriendsPrevResult(data)
  {
    this.friendsData = data;
  }
}
