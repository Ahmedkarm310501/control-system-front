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
      username: 'Dr Ali Zidan',
      change: 'add grade for course IS111',
      Time: '2022-02-06 12:04:33',
    },
    {
      id: 2,
      username: 'Dr Iman Helal',
      change: 'add grade for course CS111',
      Time: '2022-02-06 11:10:20',
    },
    {
      id: 3,
      username: 'Dr Ayman El-Kilany',
      change: 'add grade for course IS191',
      Time: '2022-02-04 2:16:35',
    },
    {
      id: 4,
      username: 'Dr Mohamed Nour',
      change: 'add grade for course IS811',
      Time: '2022-02-03 04:00:44',
    },
    {
      id: 5,
      username: 'Dr Osama Ismail',
      change: 'add grade for course IS211',
      Time: '2022-02-02 12:10:00',
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
