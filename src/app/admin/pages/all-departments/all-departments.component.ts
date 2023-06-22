import { Component, OnInit } from '@angular/core';
import { AllCoursesService } from '../all-courses/all-courses.service';

@Component({
  selector: 'app-all-departments',
  templateUrl: './all-departments.component.html',
  styleUrls: ['./all-departments.component.css'],
})
export class AllDepartmentsComponent implements OnInit {
  isLoading: boolean = true;
  deptId: any;
  departments: any = [];

  filteredData: any = this.departments;
  modalIsOpen = false;
  selectedID = '';
  constructor(private allCourses: AllCoursesService) {}

  ngOnInit(): void {
    this.allCourses.getAllDepartments().subscribe(
      (res) => {
        console.log(res);
        this.departments = res.data;
        this.filteredData = this.departments;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = true;
      }
    );
  }
  search(search: string) {
    this.filteredData = this.departments.filter((dummyData) => {
      return (
        dummyData.name.toLowerCase().includes(search.toLowerCase()) ||
        dummyData.course_code.toLowerCase().includes(search.toLowerCase()) ||
        dummyData.id.toString().includes(search)
      );
    });
  }
  sortOrder = 1;

  sortBy(property: string) {
    this.sortOrder = this.sortOrder * -1;
    if (property === 'id') {
      this.filteredData.sort(
        (a: { id: number }, b: { id: number }) =>
          (a.id > b.id ? 1 : -1) * this.sortOrder
      );
      return;
    }
    this.filteredData.sort((a: any, b: any) => {
      if (a[property] > b[property]) {
        return 1 * this.sortOrder;
      } else if (a[property] < b[property]) {
        return -1 * this.sortOrder;
      } else {
        return 0 * this.sortOrder;
      }
    });
  }
  onEdit(id: any) {
    console.log(id);
    this.modalIsOpen = !this.modalIsOpen;
    this.selectedID = id;
  }
  onSubmit(form: any) {}

  deleteDepartment(id: any) {
    console.log(id);
  }
}
