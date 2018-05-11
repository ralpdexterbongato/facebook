import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute ,NavigationEnd} from '@angular/router';
@Component({
  selector: 'app-global-search-box',
  templateUrl: './global-search-box.component.html',
  styleUrls: ['./global-search-box.component.css']
})
export class GlobalSearchBoxComponent implements OnInit {
  constructor(private http:HttpClient,private route:Router, private activeroute:ActivatedRoute) {
      this.route.events.filter((event:any)=> event instanceof NavigationEnd).subscribe(
        event=>{
          console.log(window.location.pathname);
          this.location=window.location.pathname;
        })
      this.activeroute.queryParams.subscribe(
        param=>{
          this.usertyped = param.q;
        })
   }

  ngOnInit() {
  }
  location='/';
  regex=/search\//;
  usertyped = '';
  suggestisActive = false;
  stillsearching = false;
  suggestions=[];

  onType()
  {
  	if(this.usertyped.length > 3)
  	{
  		this.searchForSuggestions();
  	}else
  	{
  		this.suggestions = [];
  	}
  }
  searchForSuggestions()
  {
  	this.suggestisActive = true;
  	this.stillsearching = true;
  	this.http.get(`//127.0.0.1:8000/api/search-suggest?q=`+this.usertyped).subscribe(
  		data=>{
  			console.log(data);
  			this.handleSuggestionData(data);
  			this.stillsearching = false;
  		},
  		error=>{
  			console.log(error);
  			this.stillsearching = false;
  		})
  }
  handleSuggestionData(data)
  {
  	this.suggestions = data;
  }

  suggestionClick(data)
  {
  	this.usertyped = data;
  	this.navigateToResults();
  }
  navigateToResults()
  {
  	this.route.navigate(['/search/people'],{queryParams:{ q:this.usertyped} });
  }
}

