import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-departments',
  templateUrl: './all-departments.component.html',
  styleUrls: ['./all-departments.component.css'],
})
export class AllDepartmentsComponent implements OnInit {
  isLoading: boolean = true;
  deptId: any;
  departments: any = [
    {
      id: 1,
      name: 'Information Systems',
      course_code: 'IS',
    },
    {
      id: 2,
      name: 'Computer Science',
      course_code: 'CS',
    },
    {
      id: 3,
      name: 'Data Science',
      course_code: 'DS',
    },
    {
      id: 4,
      name: 'Artificial Intelligence',
      course_code: 'AI',
    },
    {
      id: 5,
      name: 'General',
      course_code: 'General',
    },
  ];

  filteredData: any = this.departments;
  modalIsOpen = false;
  selectedID = '';
  constructor() {}

  ngOnInit(): void {}
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
    this.filteredData.sort(
      (
        a: { [x: string]: { toLowerCase: () => number } },
        b: { [x: string]: { toLowerCase: () => number } }
      ) =>
        (a[property].toLowerCase() > b[property].toLowerCase() ? 1 : -1) *
        this.sortOrder
    );
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
