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

  dummyData = [];
  log: any[] = [];
  date = new Date();
  isLoading: boolean = true;
  ngOnInit(): void {
    this.dummyData.forEach((data) => {});
    this.adminLogService.getAdminLog().subscribe((res) => {
      this.isLoading = false;
      console.log(res);

      this.log = res['data'];
      this.log.forEach((log) => {
        this.collapseStates[log.id] = true;
      });
      this.log.forEach((log) => {
        log.created_at = new Date(log.created_at);
        // put it in the right format
        log.created_at = log.created_at.toLocaleString('en-US', {
          hour12: true,

          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });
      });
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
  fileData: any;
  downloadFile(file: any, fileName: any) {
    this.adminLogService.downloadLog(file).subscribe((res) => {
      console.log(res);

      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(res.body);

      downloadLink.download = `${fileName}.xlsx`;
      downloadLink.click();
    });
  }
}
