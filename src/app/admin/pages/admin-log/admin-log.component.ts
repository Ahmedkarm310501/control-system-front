import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.component.html',
  styleUrls: ['./admin-log.component.css']
})
export class AdminLogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  dummyData = [
    { id: 1, username: 'john doe', change: 'add grade for course IS111', Time: '2021-01-01 12:00:00' },
    { id: 2, username: 'Jane Doe', change: 'add grade for course CS111', Time: '2021-01-02 1:10:20' },
    { id: 3, username: 'Bob Smith', change: 'add grade for course DS191', Time: '2021-01-03 2:230:00' },
    { id: 4, username: 'youssef', change: 'add grade for course AI811', Time: '2021-01-01 12:00:00' },
  ];
}
