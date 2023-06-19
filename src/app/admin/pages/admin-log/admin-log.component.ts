import { Component, OnInit } from '@angular/core';
import { AdminLogService } from './admin-log.service';

@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.component.html',
  styleUrls: ['./admin-log.component.css'],
})
export class AdminLogComponent implements OnInit {
  constructor(private adminLogService: AdminLogService) {}
  collapseStates: { [key: number]: boolean } = {};
  date = new Date();

  dummyData = [
    {
      id: 1,
      username: 'Dr Ali Zidan',
      change: 'add grade for course IS111',
      Time: '2022-02-06 12:04:33',
      Type: 'add',
      before: 'null',
      after: 'upload students grades',
    },
    {
      id: 2,
      username: 'Dr Iman Helal',
      change: 'add grade for course CS111',
      Time: '2022-02-06 11:10:20',
      Type: 'add',
      before: 'add students names',
      after: 'update students names',
    },
    {
      id: 3,
      username: 'Dr Ayman El-Kilany',
      change: 'add grade for course IS191',
      Time: '2022-02-04 2:16:35',
      type: 'show',
      before: 'null',
      after: 'update some grades',
    },
    {
      id: 4,
      username: 'Dr Mohamed Nour',
      change: 'add grade for course IS811',
      Time: '2022-02-03 04:00:44',
      Type: 'add',
      before: 'grades',
      after: 'update some grades',
    },
    {
      id: 5,
      username: 'Dr Osama Ismail',
      change: 'add grade for course IS211',
      Time: '2022-02-02 12:10:00',
      Type: 'show',
      before: 'null',
      after: 'upload students names',
    },
  ];
  log: any[] = [];
  ngOnInit(): void {
    this.dummyData.forEach((data) => {
      this.collapseStates[data.id] = true;
    });
    this.adminLogService.getAdminLog().subscribe((res) => {
      console.log(res);
      this.log = res['data'];
      
    });
  }

  
  searchCourse(searchTerm: string) {
    this.log = this.dummyData.filter((log) => {
      return (
        log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.change.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  toggleCollapse(id: number) {
    this.collapseStates[id] = !this.collapseStates[id];
  }

  isCollapsed(id: number) {
    return this.collapseStates[id];
  }
  downloadFile() {}
}
