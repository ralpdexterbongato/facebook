import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-actions',
  templateUrl: './comment-actions.component.html',
  styleUrls: ['./comment-actions.component.css']
})
export class CommentActionsComponent implements OnInit {
  @Output() deleteclick = new EventEmitter();
  @Output() showupdate = new EventEmitter();

  constructor() { }
  optionIsOpen = false;
  ngOnInit() {
  }
  openUpdate()
  {
  	this.showupdate.emit();
  }
  clickDelete()
  {
    this.deleteclick.emit();
  }
}
