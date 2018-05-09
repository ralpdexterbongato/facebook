import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router ,ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/token.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-profilenewsfeed',
  templateUrl: './profilenewsfeed.component.html',
  styleUrls: ['./profilenewsfeed.component.css']
})
export class ProfileNewsfeedComponent implements OnInit {
  postext ='';
  postBackground=null;
  postPrivacy='1';
  newlysaved=null; 
  tags = [];
  textareaIsActive= false;
  profileId = null;
  currentuserID = null;
  currentuserFname='';
  Postings =[];

  HugeParag = false;
  classToAdd = '';
  usergender ='';
  constructor(private http: HttpClient,
    private activated: ActivatedRoute,
    private token: TokenService
  ) {
     this.activated.paramMap.subscribe(
      params=>{
          this.profileId = params.get('id');
          this.getProfilePost();
          this.getCurrentUsersID();
          this.getCurrentUserGender();
          this.getCurrentUserFname();
      }
    )
  }

  ngOnInit() {
    // this.getProfilePost();
    // this.getCurrentUsersID();
    // this.getCurrentUserGender();
    $.each($('textarea[data-autoresize]'), function() {
    var offset = this.offsetHeight - this.clientHeight;
 
});
  }
  getCurrentUserFname()
  {
    this.currentuserFname = this.token.getUserFName();
  }
  getCurrentUserGender()
  {
    this.usergender = this.token.getGender();
  }
  getCurrentUsersID()
  {
    this.currentuserID = this.token.getUserId();
  }
  getProfilePost()
  {
    this.http.get(`//127.0.0.1:8000/api/profile/`+this.profileId).subscribe(
      data=>{
        console.log(data);
        this.handlePostData(data);
      },
      error=>{
        console.log(error);
      }
    )
  }
  handlePostData(data)
  {
    this.Postings = data.data;
  }
  getMyLatestSubmit()
  {
    this.http.get(`//127.0.0.1:8000/api/profile-new/`+this.profileId).subscribe(
      data=>{
        this.PushNewData(data);
      },
      error=>{
        console.log(error);
      }
    )
  }
  PushNewData(data)
  {
    this.Postings.unshift(data[0]);
  }
  setActive()
  {
    this.textareaIsActive = true;
  }
  setInActive()
  {
    this.textareaIsActive = false;
  }
  post()
  {
    this.http.post(`//127.0.0.1:8000/api/post`,{
      description:this.postext,
      background:this.postBackground,
      userfile:'',
      privacy:this.postPrivacy,
      taggedUsers:this.tags
    }).subscribe(
      data=>{
        console.log(data);
        this.handleSuccessPost();
      },
      error=>{
        console.log(error);
      }
    );
  }
  handleSuccessPost()
  {
    this.postext ='';
    this.postBackground = null;
    this.postPrivacy ='1';
    this.textareaIsActive=false;
    this.getMyLatestSubmit();
  }
  KnowClassToAdd(choice)
  {
    this.postBackground = choice;
    switch (this.postBackground) {
       case 0:
         this.classToAdd = 'active background0'
         break;
       case 1:
         this.classToAdd = 'active background1'
         break;       
       case 2:
         this.classToAdd = 'active background2'
         break;
       case 3:
         this.classToAdd = 'active background3'
         break;
       case 4:
         this.classToAdd = 'active background4'
         break;
       case 5:
         this.classToAdd = 'active background5'
         break;
       case 6:
         this.classToAdd = 'active background6'
         break;
       case 7:
         this.classToAdd = 'active background7'
         break;
       case 8:
         this.classToAdd = 'active background8'
         break;
       case 9:
         this.classToAdd = 'active background9'
         break;
       case 10:
         this.classToAdd = 'active background10'
         break;
       case 11:
         this.classToAdd = 'active background11'
         break;
       case 12:
         this.classToAdd = 'active background12'
         break;
       case 13:
         this.classToAdd = 'active background13'
         break;
     } 
  }
  focusTheArea()
  {
    document.getElementById('postArea').focus();
  }
  checkLetterAmt()
  {
    if(this.postext.split('').length > 30)
    {
      this.HugeParag = true;
    }else
    {
      this.HugeParag = false;
    }
  }
}
