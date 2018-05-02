import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  email ='';
  constructor(private token:TokenService) { }

  ngOnInit() {
    this.viewMyEmail();
  }

  viewMyEmail()
  {
    this.email = this.token.getEmail();
  }
}
