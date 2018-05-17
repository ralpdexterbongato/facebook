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
  routerRegex=/\/search\/people/;
  usertyped = '';
  suggestisActive = false;
  stillsearching = false;
  suggestions=[];
  typeconsCounter = 0;
  onType()
  {
    this.typeconsCounter = this.typeconsCounter + 1;
  	if(this.typeconsCounter > 3)
  	{
  		this.searchForSuggestions();
      this.typeconsCounter = 0;
  	}else
  	{
  		this.suggestions = [];
  	}
  }
  searchForSuggestions()
  {
  	this.stillsearching = true;
  	this.http.get(`https://ralpdexterfacebookapp.herokuapp.com/api/search-suggest?q=`+this.usertyped).subscribe(
  		data=>{
  			this.handleSuggestionData(data);
        this.suggestisActive = true;
  			this.stillsearching = false;
  		},
  		error=>{
  			console.log(error);
        this.suggestisActive = true;
  			this.stillsearching = false;
  		})
  }
  handleSuggestionData(data)
  {
  	this.suggestions = data;
  }
  navigateToResults()
  {
    this.suggestisActive=false;
    this.route.navigate(['/search/people'],{queryParams:{ q:this.usertyped} });
  }
  addToTyped(data)
  {
   this.suggestisActive=false;
   this.usertyped = data;
   this.suggestions = [];
   this.route.navigate(['/search/people'],{queryParams:{ q:this.usertyped} });
  }
}
