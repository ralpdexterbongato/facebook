import { DOCUMENT } from "@angular/platform-browser";
import { Component, OnInit,HostListener,Inject } from '@angular/core';
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
  paginate={
    current_page:0,
    next_page_url:null,
  }
  loading = false;
  LastPage = false;
  constructor(private http: HttpClient,
    private activated: ActivatedRoute,
    private token: TokenService,
    @Inject(DOCUMENT) private document: Document,
  ) {
     this.activated.paramMap.subscribe(
      params=>{
          this.profileId = params.get('id');
          this.getProfilePost(1);
          this.getCurrentUsersID();
          this.getCurrentUserGender();
          this.getCurrentUserFname();
      }
    )
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
   if(this.document.documentElement.scrollTop + $(window).height() > $(document).height() - $(window).height() && this.paginate.next_page_url!=null && this.loading==false)
   {
     this.LastPage = false;
     this.getProfilePost(this.paginate.current_page+1);
   }else if(this.paginate.next_page_url==null)
   {
     this.LastPage = true;
   }
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
  getProfilePost(page)
  {
    this.loading = true;
    this.http.get(`//127.0.0.1:8000/api/profile/`+this.profileId+`?page=`+page).subscribe(
      data=>{
        console.log(data);
        if(this.paginate.current_page==0)
        {
          this.handlePostData(data);
        }else
        {
          this.handleNextPagePost(data);
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
  handleNextPagePost(data)
  {
    this.loading = false;
    this.paginate = data;
    for (let i = 0; i < data.data.length; i++) {
        this.Postings.push(data.data[i]);
    }
  }
  handlePostData(data)
  {
    this.loading =false;
    this.Postings = data.data;
    this.paginate = data;
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
    if(this.postext.split('').length > 120)
    {
      this.postBackground = null;
    }
    if(this.postext.split('').length > 30)
    {
      this.HugeParag = true;
    }else
    {
      this.HugeParag = false;
    }
  }
}
