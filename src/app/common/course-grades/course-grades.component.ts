import { Component, OnInit } from '@angular/core';
import { studData } from './stud-data';
import { GradeService } from './grade.service';
import { ReadExcelDirective } from '../directives/read-excel.directive';

@Component({
  selector: 'app-course-grades',
  templateUrl: './course-grades.component.html',
  styleUrls: ['./course-grades.component.css'],
})
export class CourseGradesComponent implements OnInit {
  constructor(private gradeService: GradeService) {}
  file: File;
  students = studData.map((student) => {
    return {
      ...student,
      editable: false,
      oldTermWork: student.termWork,
      oldExamWork: student.examWork,
    };
  });
  filteredStudents = this.students;
  isShown = false;
  shown() {
    this.isShown = !this.isShown;
  }

  edit(index: number) {
    this.filteredStudents[index].editable =
      !this.filteredStudents[index].editable;
    this.filteredStudents[index].oldTermWork =
      this.filteredStudents[index].termWork;
    this.filteredStudents[index].oldExamWork =
      this.filteredStudents[index].examWork;
  }

  save(index: number, termWork: number, examWork: number) {
    this.filteredStudents[index].editable =
      !this.filteredStudents[index].editable;
    this.filteredStudents[index].total = +termWork + +examWork;
    this.calculateGrade(index);
    // update old values
    this.filteredStudents[index].oldTermWork =
      this.filteredStudents[index].termWork;
    this.filteredStudents[index].oldExamWork =
      this.filteredStudents[index].examWork;
  }

  cancel(index: number) {
    this.filteredStudents[index].editable =
      !this.filteredStudents[index].editable;
    this.filteredStudents[index].termWork =
      this.filteredStudents[index].oldTermWork;
    this.filteredStudents[index].examWork =
      this.filteredStudents[index].oldExamWork;
  }

  calculateGrade(index: number) {
    this.filteredStudents[index].grade = this.gradeService.calculateGrade(
      this.filteredStudents[index].total
    );
  }

  searchStudent(searchTerm: string) {
    this.filteredStudents = this.students.filter((student) => {
      return student.id.includes(searchTerm);
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onExcelUpload(data: any) {
    console.log('in uplodaed');
    console.log(data);
  }
}
