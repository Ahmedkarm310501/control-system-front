import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  dummyData = [
    {
      id: '1',
      name: 'Mohamed',
      email: 'Mohamed@fds.com',
    },
    {
      id: '2',
      name: 'mike',
      email: 'mike@f.com',
    },
    {
      id: '3',
      name: 'Ahmed',
      email: 'Ahmed@f.com',
    },
    {
      id: '4',
      name: 'abdo',
      email: 'abdo@f.com',
    },
    {
      id: '5',
      name: 'jo',
      email: 'jo@f.com',
    },
    {
      id: '6',
      name: 'mo',
      email: 'mog@f.com',
    },
    {
      id: '7',
      name: 'John Doe',
      email: 'asfcg@fds.com',
    },
    {
      id: '8',
      name: 'Jane Doe',
      email: 'asfcg@fds.com',
    },
  ];

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

  filteredData: any = this.dummyData;
  modalIsOpen = false;
  selectedID: string = '';
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: any) {
    console.log('Form Submitted');
  }
  onEdit(id: string) {
    this.modalIsOpen = !this.modalIsOpen;
    this.selectedID = id;
  }
  search(search: string) {
    this.filteredData = this.dummyData.filter((dummyData) => {
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
