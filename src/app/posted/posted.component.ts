import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router ,ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-posted',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.css']
})
export class PostedComponent implements OnInit {
  postext ='';
  postBackground=null;
  postPrivacy='1';
  newlysaved=null;
  tags = [];
  textareaIsActive= false;
  profileId = null;
  currentuserID = null;
  Postings =[];
  constructor(private http: HttpClient,
    private activated: ActivatedRoute,
    private token: TokenService
  ) {
     this.activated.paramMap.subscribe(
      params=>{
          this.profileId = params.get('id');
      }
    )
  }

  ngOnInit() {
    this.getProfilePost();
    this.getCurrentUsersID();
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
}
