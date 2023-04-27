import { Component, OnInit , ViewChild} from '@angular/core';
import { AllUsersService } from './all-users.service';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;
  // add empty array to contain data from api
  users: any = [];
  // add api array to users array
  isLoading: boolean = true;
  isShown: boolean = false;

  //add dummy data of courses
  dummyDataCourses = [
    {
      id: 1,
      name: 'Math 1',
      description:
        'Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations.',
      price: 100,
      duration: 10,
      image: 'https://angular.io/assets/images/logos/angular/angular.svg',
    },
    {
      id: 2,

      name: 'Math 2',
      description:
        'React is an open-source, front end, JavaScript library for building user interfaces or UI components.',
      price: 200,
      duration: 20,

      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png',
    },
    {
      id: 3,
      name: 'Database Management System',
      description:
        'Vue.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications.',
      price: 300,
      duration: 30,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png',
    },
  ];

  filteredData: any = this.users;
  modalIsOpen = false;
  selectedID: string = '';
  constructor(private allUsers: AllUsersService) {}

  ngOnInit(): void {
    //display all user
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
  }
  onEdit(id: string) {
    this.modalIsOpen = !this.modalIsOpen;
    this.selectedID = id;
  }
  onSubmit(form: any){
    console.log('form Submitted')
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
        console.log(res);
        this.users = this.users.filter((user: any) => user.id !== id);
        this.filteredData = this.users;
      },
      (err) => {
        this.message = err.error.message;
        this.type = 'error';
        this.snackbar.show()
        console.log(err);
      }
    );
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
