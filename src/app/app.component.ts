import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './services/token.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private route:Router,private token:TokenService){}
  signin = false;
  menuIsActive = false;

  ngOnInit() {
    this.triggerLoginBtn();
  }

  toggleMenu()
  {
    this.menuIsActive = !this.menuIsActive;
  }
  triggerLoginBtn()
  {
    this.signin =  this.token.isLoggedIn();
  }
  logout()
  {
    this.token.removeToken();
    this.triggerLoginBtn();
    this.menuIsActive = false;
    this.route.navigate(['']);
  }


}
