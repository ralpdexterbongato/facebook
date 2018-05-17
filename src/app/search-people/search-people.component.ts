import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.css']
})
export class SearchPeopleComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute,private http:HttpClient) {
  	this.activeRoute.queryParams.subscribe(
  		param=>{
        this.searchThisName(param.q);
  		})
   }
   found=[];
  ngOnInit() {
  }

  searchThisName(data)
  {
  	this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/find-people?q=`+data+`&page=1`).subscribe(
  		data=>{
  			console.log(data);
  			this.handleFound(data);
  		},
  		error=>{
  			console.log(error);
  		})
  }
  handleFound(data)
  {
  	this.found = data.data;
  }
}
