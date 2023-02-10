import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.css'],
})
export class StudentsPageComponent implements OnInit {
  dummyData = [
    {
      id: '20190427',
      name: 'Mohamed',
      email: 'mo@gmail.com',
      Gpa: '3',
      Level: '4',
      department: 'IS',
    },
    {
      id: '20190405',
      name: 'mike',
      email: 'mo@gmail.com',
      Gpa: '3.5',
      Level: '1',
      department: 'DS',
    },
    {
      id: '20190057',
      name: 'Ahmed',
      email: 'mo@gmail.com',
      Gpa: '3.3',
      Level: '4',
      department: 'CS',
    },
    {
      id: '20190286',
      name: 'abdo',
      email: 'mo@gmail.com',
      Gpa: '3.6',
      Level: '3',
      department: 'AI',
    },
    {
      id: '20200635',
      name: 'jo',
      email: 'mo@gmail.com',
      Gpa: '3.5',
      Level: '3',
      department: 'CS',
    },
    {
      id: '20210456',
      name: 'mo',
      email: 'mo@gmail.com',
      Gpa: '3.5',
      Level: '1',
      department: 'General',
    },
    {
      id: '20210007',
      name: 'John Doe',
      email: 'mo@gmail.com',
      Gpa: '3.5',
      Level: '2',
      department: 'General',
    },
    {
      id: '20220108',
      name: 'Jane Doe',
      email: 'mo@gmail.com',
      Gpa: '2.5',
      Level: '2',
      department: 'General',
    },
  ];
  modalIsOpen = false;
  selectedID = '';
  filteredData = this.dummyData;

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
        dummyData.id.toString().includes(search) ||
        dummyData.Gpa.toString().includes(search) ||
        dummyData.Level.toString().includes(search) ||
        dummyData.department.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  sortOrder = 1;

  sortBy(property: string) {
    this.sortOrder = this.sortOrder * -1;
    this.filteredData.sort(
      (a, b) =>
        (a[property].toLowerCase() > b[property].toLowerCase() ? 1 : -1) *
        this.sortOrder
    );
  }
}
