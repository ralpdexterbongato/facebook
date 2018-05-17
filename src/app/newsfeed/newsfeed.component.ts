import { DOCUMENT } from "@angular/platform-browser";
import { Component, OnInit,HostListener,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  constructor(private http:HttpClient,
    private token:TokenService,
    @Inject(DOCUMENT) private document: Document,
  ) { }
  @HostListener("window:scroll", [])
  onWindowScroll() {
   if(this.document.documentElement.scrollTop + $(window).height() > $(document).height() - $(window).height() && this.paginate.next_page_url!=null && this.loading==false)
   {
     this.getnewPosters(this.paginate.current_page+1);
   }else if(this.paginate.next_page_url==null)
   {
     this.LastPage = true;
   }
  }
  ngOnInit() {
    this.getnewPosters(1);
    this.getGender();
    this.scrollTracker();
  }
  loading = false;
  LastPage =false;
  textareaIsActive= false;
  postext ='';
  postBackground=null;
  postPrivacy='1';
  tags = [];
  newestposters=[];
  inewlyposted=[];
  paginate={
    current_page:0,
    next_page_url:null,
  }
  usergender = '';
  classToAdd = '';

  HugeParag = false;

  getGender()
  {
    this.usergender = this.token.getGender();
  }
  setActive()
  {
    this.textareaIsActive = true;
  }
  setInActive()
  {
    this.textareaIsActive = false;
  }
  scrollTracker()
  {
    window.addEventListener('scroll', function(e) {
        // this.getnewposters(1);
    });
  }
  getnewPosters(page)
  {
    this.loading = true;
    this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/getnewposters?page=`+page).subscribe(
      data=>{
        if(this.paginate.current_page === 0)
        {
          this.handleNewPosters(data);
        }else
        {
          this.handleSecondPagePosters(data);
        }
      },
      error=>{
        console.log(error);
      });
  }
  handleSecondPagePosters(data)
  {
    this.loading=false;
    this.paginate = data;
    for (let i = 0; i < data.data.length; i++) {
        this.newestposters.push(data.data[i]);
    }
  }
  handleNewPosters(data)
  {
    this.loading=false;
    this.paginate = data;
    this.newestposters = data.data;
  }
  post()
  {
    this.http.post(`https://ralpdexterfacebookapp.herokuapp.com/api/post`,{
      description:this.postext,
      background:this.postBackground,
      userfile:'',
      privacy:this.postPrivacy,
      taggedUsers:this.tags
    }).subscribe(
      data=>{
        console.log(data);
        this.handleSuccessPost(data);
      },
      error=>{
        console.log(error);
      }
    );
  }
  handleSuccessPost(data)
  {
    this.postext ='';
    this.postBackground = null;
    this.postPrivacy ='1';
    this.textareaIsActive=false;
    this.getNewLyPosted(data);
  }
  getNewLyPosted(data)
  {
    this.inewlyposted.unshift(data.postid);
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
