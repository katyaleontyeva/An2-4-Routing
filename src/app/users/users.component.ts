import { Component, OnInit } from '@angular/core';

@Component({
  // selector: 'app-users', Не нужно т.к. загружается роутером
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
