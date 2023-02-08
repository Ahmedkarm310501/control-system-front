import { Component, OnInit } from '@angular/core';
interface Course {
  id: string;
  name: string;
  department: string;
  numberOfStudents: number;
  gradedStudents: number;
  ungradedStudents: number;
}
@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
})
export class HomeScreenComponent implements OnInit {
  courses = [
    {
      id: 'IS324',
      name: 'Database Management System',
      department: 'Information Systems',
      numberOfStudents: 100,
      gradedStudents: 50,
      ungradedStudents: 50,
    },
    {
      id: 'IS245',
      name: 'Database Systems',
      department: 'Information Systems',
      numberOfStudents: 160,
      gradedStudents: 50,
      ungradedStudents: 110,
    },
    {
      id: 'CS112',
      name: 'Programing 1',
      department: 'Information Systems',
      numberOfStudents: 200,
      gradedStudents: 0,
      ungradedStudents: 200,
    },
    {
      id: 'CS113',
      name: 'Programing 2',
      department: 'Information Systems',
      numberOfStudents: 200,
      gradedStudents: 0,
      ungradedStudents: 200,
    },
    {
      id: 'MA111',
      name: 'Math 1',
      department: 'General',
      numberOfStudents: 700,
      gradedStudents: 200,
      ungradedStudents: 500,
    },
    {
      id: 'MA112',
      name: 'Math 2',
      department: 'General',
      numberOfStudents: 700,
      gradedStudents: 200,
      ungradedStudents: 500,
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  filteredCourses: Course[] = this.courses;

  searchCourse(searchTerm: string) {
    this.filteredCourses = this.courses.filter((course) => {
      return (
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }
}
