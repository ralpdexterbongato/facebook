import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.scrollTracker();
  }

  scrollTracker()
  {
    $(window).scroll(function(e){
      var scroll = $(window).scrollTop();
      if(scroll > 540)
      {
        $('.other-wrap').addClass('active');
      }else
      {
        $('.other-wrap').removeClass('active');
      }
      if(scroll > 80)
      {
        $('.left-categ-wrap').addClass('active');
      }else
      {
        $('.left-categ-wrap').removeClass('active');
      }
    })
  }
}
