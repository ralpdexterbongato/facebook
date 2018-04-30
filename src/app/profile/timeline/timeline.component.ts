import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.scrollTracker();
  }

  scrollTracker()
  {
    $(window).scroll(function(e)
    {
      var scroll = $(window).scrollTop();
      if(scroll > 1420)
      {
        $('.timeline-left-content-container').addClass('active');
      }else
      {
        $('.timeline-left-content-container').removeClass('active');
      }
    })
  }
}
