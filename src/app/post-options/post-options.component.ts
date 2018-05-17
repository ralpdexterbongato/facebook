import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-options',
  templateUrl: './post-options.component.html',
  styleUrls: ['./post-options.component.css']
})
export class PostOptionsComponent implements OnInit {
  @Output() clickedit = new EventEmitter();
  @Output() clickDelete = new EventEmitter();
  showOptions =false;
  constructor() { }
  ngOnInit() {
  }

  onClickDelete()
  {
    this.clickDelete.emit();
  }
  onClickEdit()
  {
  	this.clickedit.emit();
    this.showOptions =false;
  }


}
