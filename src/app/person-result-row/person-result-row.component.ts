import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-person-result-row',
  templateUrl: './person-result-row.component.html',
  styleUrls: ['./person-result-row.component.css']
})
export class PersonResultRowComponent implements OnInit {
@Input('persondata') foundperson;
  constructor() { }

  ngOnInit() {
  }

}
