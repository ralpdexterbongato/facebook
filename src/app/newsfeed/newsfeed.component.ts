import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  constructor(private http:HttpClient,private token:TokenService) { }
  ngOnInit() {
    this.getnewPosters();
    this.getGender();
  }

  textareaIsActive= false;
  postext =''; 
  postBackground=null;
  postPrivacy='1';
  tags = [];
  newestposters=[];
  inewlyposted=[];

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
  getnewPosters()
  {
    this.http.get(`//127.0.0.1:8000/api/getnewposters`).subscribe(
      data=>{
        console.log(data);
        this.handleNewPosters(data);
      },
      error=>{
        console.log(error);
      });
  }
  handleNewPosters(data)
  {
    this.newestposters = data.data;
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
    if(this.postext.split('').length > 30)
    {
      this.HugeParag = true;
    }else
    {
      this.HugeParag = false;
    }
  }
}
