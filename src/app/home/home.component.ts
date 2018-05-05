import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { AppComponent } from '../app.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(
    private route:Router,
    private token:TokenService,
    private http:HttpClient,
    private app:AppComponent,
  ) { }
  sk = '';
  welcome =false;
  ngOnInit() {
    this.scrollTracker();
    this.route.routerState.root
      .queryParams
      .subscribe(params => {
        this.sk = params['sk'];
        this.showWelcomeOrNot();
      });
  }
  showWelcomeOrNot()
  {
    this.sk == 'welcome'? this.welcome = true:this.welcome = false;
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
