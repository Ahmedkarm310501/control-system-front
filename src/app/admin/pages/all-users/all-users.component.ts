import { Component, OnInit } from '@angular/core';
import { AllUsersService } from './all-users.service';
import { AllCoursesService } from '../all-courses/all-courses.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  // add empty array to contain data from api
  users: any = [];
  // add api array to users array
  isLoading: boolean = true;

  //add dummy data of courses
  dummyDataCourses = [
    {
      id: 1,
      name: 'Math 1',
    },
    {
      id: 2,

      name: 'Math 2',
    },
    {
      id: 3,
      name: 'Database Management System',
    },
  ];

  filteredData: any = this.users;
  modalIsOpen = false;
  selectedID: string = '';
  departments: any = [];
  constructor(
    private allUsers: AllUsersService,
    private allCourses: AllCoursesService
  ) {}

  ngOnInit(): void {
    this.allUsers.getAllUsers().subscribe(
      (res) => {
        console.log(res);
        this.users = res.data;
        this.filteredData = this.users;
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = true;
      }
    );
    this.allCourses.getAllDepartments().subscribe((res) => {
      this.departments = res.data;
      console.log(this.departments);
    });
  }

  onSubmit(form: any) {
    console.log('Form Submitted');
  }
  onEdit(id: string) {}

  // this.modalIsOpen = !this.modalIsOpen;
  // this.selectedID = id;

  search(search: string) {
    this.filteredData = this.users.filter((dummyData) => {
      return (
        dummyData.name.toLowerCase().includes(search.toLowerCase()) ||
        dummyData.email.toLowerCase().includes(search.toLowerCase()) ||
        dummyData.id.toString().includes(search)
      );
    });
  }

  sortOrder = 1;

  sortBy(property: string) {
    this.sortOrder = this.sortOrder * -1;
    this.filteredData.sort(
      (
        a: { [x: string]: { toLowerCase: () => number } },
        b: { [x: string]: { toLowerCase: () => number } }
      ) =>
        (a[property].toLowerCase() > b[property].toLowerCase() ? 1 : -1) *
        this.sortOrder
    );
  }
}
