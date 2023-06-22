import { Component, OnInit } from '@angular/core';
import { AllCoursesService } from '../all-courses/all-courses.service';
import { AllDepartmentsService } from './all-departments.service';

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
  selectedID: any;
  name: any;
  dept_code: any;

  constructor(
    private allCourses: AllCoursesService,
    private allDepartments: AllDepartmentsService
  ) {}

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
  // onEdit(event, id: any) {
  //   // console.log(id);
  //   // this.modalIsOpen = !this.modalIsOpen;
  //   // this.selectedID = id;
  //   this.allDepartments
  //     .editDepartment(id, event.name, event.dept_code)
  //     .subscribe((res) => {
  //       console.log(res);
  //       this.ngOnInit();
  //     });
  // }
  onSubmit() {
    this.allDepartments
      .editDepartment(this.deptId, this.name, this.dept_code)
      .subscribe((res) => {
        console.log(res);
        this.ngOnInit();
      });
  }

  deleteDepartment(id: any) {
    this.allDepartments.deleteDepartment(id).subscribe(
      (res) => {
        console.log(res);
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onClick(id: any, name: any, dept_code: any) {
    this.deptId = id;
    this.name = name;
    this.dept_code = dept_code;
    console.log(this.deptId);
    console.log(this.name);
    console.log(this.dept_code);
  }
}
