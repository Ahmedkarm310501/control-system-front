import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.component.html',
  styleUrls: ['./admin-log.component.css'],
})
export class AdminLogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  dummyData = [
    {
      id: 1,
      username: 'john doe',
      change: 'add grade for course IS111',
      Time: '2023-02-09 12:45:47',
    },
    {
      id: 2,
      username: 'Jane Doe',
      change: 'add grade for course CS111',
      Time: '2023-02-07 11:29:47',
    },
    {
      id: 3,
      username: 'Bob Smith',
      change: 'add grade for course DS191',
      Time: '2023-02-06 10:00:00',
    },
    {
      id: 4,
      username: 'youssef',
      change: 'add grade for course AI811',
      Time: '2023-02-05 08:39:27',
    },
    {
      id: 5,
      username: 'ali',
      change: 'add grade for course DS111',
      Time: '2023-02-04 07:00:00',
    },
    {
      id: 6,
      username: 'ahmed',
      change: 'add grade for course MA111',
      Time: '2023-02-03 06:00:00',
    },
  ];
  filteredCourses = this.dummyData;

  searchCourse(searchTerm: string) {
    this.filteredCourses = this.dummyData.filter((log) => {
      return (
        log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.change.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }
}
