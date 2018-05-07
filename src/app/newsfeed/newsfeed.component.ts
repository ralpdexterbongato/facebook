import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  constructor(private http:HttpClient) { }
  ngOnInit() {
    this.getnewPosters();
  }

  textareaIsActive= false;
  postext ='';
  postBackground=null;
  postPrivacy='1';
  tags = [];
  newestposters=[];

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
}
