import { Component, OnInit, ViewChild } from '@angular/core';
import { AllUsersService } from './all-users.service';
import { SnackbarComponent } from '../../../components/snackbar/snackbar.component';
import { AllCoursesService } from '../all-courses/all-courses.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;
  @ViewChild('dept') dept: any;
  // add empty array to contain data from api
  users: any = [];
  // add api array to users array
  isLoading: boolean = true;
  isShown: boolean = false;

  //add dummy data of courses
  CoursesInDepartment: any = [];

  filteredData: any = this.users;

  selectedID: string = '';
  departments: any = [];

  constructor(
    private allUsers: AllUsersService,
    private allCourses: AllCoursesService,
  ) {}

  ngOnInit(): void {
    //display all user
    this.allUsers.getAllUsers().subscribe(
      (res) => {
        this.users = res.data;
        this.filteredData = this.users;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = true;
      }
    );
    this.allCourses.getAllDepartments().subscribe((res) => {
      this.departments = res.data;
    });
  }
  // get courses by department
  onSelectDepartment(event: any) {
    const id = event.target.value;
    const user_id = this.selectedID;
    this.allUsers.getAllCoursesByDepartment(id, user_id).subscribe((res) => {
      console.log(res.data);
      this.CoursesInDepartment = res.data;
      // if course already assigned to user add checked property to that assigned course
      this.CoursesInDepartment.forEach((course: any) => {
        if (course.is_enrolled == true) {
          course.checked = true;
        }
        
      }
      );
    });
  }
  // add course to selectedCourses array
  onEdit(id: string) {
    this.selectedID = id;
    // clear input fields
    this.dept.nativeElement.value = 'Select Department';
    this.CoursesInDepartment = [];
  }
  // onSubmit(form: any) {
  //   this.allUsers.assignUserToCourse(form.course, this.selectedID).subscribe(
  //     (res) => {
  //       this.type = 'success';
  //       this.message = 'User assigned to course successfully';

  //       this.snackbar.show();
  //     },
  //     (err) => {
  //       this.message = err.error.message;
  //       this.type = 'error';

  //       this.snackbar.show();
  //     }
  //   );
  // }
  // on submit assign user to checked courses only
  onSubmit() {
    const course_ids = this.CoursesInDepartment
      .filter((course: any) => course.is_enrolled == true)
      .map((course: any) => course.id);
    const user_id = this.selectedID;
    this.allUsers.assignUserToCourse(course_ids, user_id).subscribe(
      (res) => {
        
        this.type = 'success';
        this.message = 'User assigned to courses successfully';
        this.snackbar.show();
      },
      (err) => {
        this.message = err.error.message;
        this.type = 'error';
        this.snackbar.show();
      }
    );
  }

  closeModal() {
    this.CoursesInDepartment = [];
    this.dept.nativeElement.value = 'Select Department';
  }

  // search for user
  search(search: string) {
    this.filteredData = this.users.filter((dummyData) => {
      return (
        dummyData.name.toLowerCase().includes(search.toLowerCase()) ||
        dummyData.email.toLowerCase().includes(search.toLowerCase()) ||
        dummyData.id.toString().includes(search)
      );
    });
  }
  message: string;
  type: string;
  //delete user
  onDelete(id: number) {
    this.allUsers.onDelete(id).subscribe(
      (res) => {
        this.users = this.users.filter((user: any) => user.id !== id);
        this.filteredData = this.users;
        this.message = 'User Deleted Successfully';
        this.type = 'success';
        this.snackbar.show();
      },
      (err) => {
        this.message = err.error.message;
        this.type = 'error';
        this.snackbar.show();
      }
    );
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
    this.filteredData.sort((a, b) => {
      const valueA = (a[property] + '').toLowerCase(); // Convert to string and lowercase
      const valueB = (b[property] + '').toLowerCase(); // Convert to string and lowercase

      if (valueA > valueB) {
        return 1 * this.sortOrder;
      } else if (valueA < valueB) {
        return -1 * this.sortOrder;
      } else {
        return 0;
      }
    });
  }
  modalIsOpen = false;
  IsInvalid = false;
  errorMsg = '';
  deleteStudent = false;
  IsInvalidRecords = false;

  closeModal5() {
    this.errorMsg = 'Are you sure you want to delete this student ?';
    this.deleteStudent = false;
  }
  closeModal4() {
    this.IsInvalidRecords = false;
  }

  //   


  
}
