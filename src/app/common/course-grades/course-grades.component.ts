import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { studData } from './stud-data';
import { GradeService } from './grade.service';
import { ReadExcelDirective } from '../directives/read-excel.directive';

@Component({
  selector: 'app-course-grades',
  templateUrl: './course-grades.component.html',
  styleUrls: ['./course-grades.component.css'],
})
export class CourseGradesComponent implements OnInit {
  @ViewChild('f') fileRef: ElementRef;
  constructor(
    private gradeService: GradeService,
    private renderer: Renderer2
  ) {}
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

  missingStudents = [];
  onExcelUpload(data: any) {
    console.log(data);
    this.students = this.students.map((student) => {
      const excelStudent = data.find((s) => +s.id === +student.id);
      if (excelStudent) {
        return {
          ...student,
          termWork: excelStudent.termWork || 0,
          examWork: excelStudent.examWork || 0,
          total: +excelStudent.termWork + +excelStudent.examWork,
          grade: this.gradeService.calculateGrade(
            +excelStudent.termWork + +excelStudent.examWork
          ),
        };
      } else {
        this.missingStudents.push(student.id);
        return student;
      }
    });
    this.filteredStudents = this.students;
    if (this.missingStudents.length > 0) {
      alert(
        `there are ${this.missingStudents.length} missing students: ${this.missingStudents}`
      );
    }
    this.renderer.setProperty(this.fileRef.nativeElement, 'value', null);
  }

  deleteAllGrades() {
    let cc = confirm('Are you sure you want to delete all grades?');
    if (cc) {
      this.students = this.students.map((student) => {
        return {
          ...student,
          termWork: null,
          examWork: null,
          total: null,
          grade: null,
        };
      });
      this.filteredStudents = this.students;
    }
  }

  toggleStudentsWithNoGrades() {
    if (this.filteredStudents.length === this.students.length) {
      this.filteredStudents = this.students.filter((student) => {
        return !student.termWork || !student.examWork;
      });
    } else {
      this.filteredStudents = this.students;
    }
  }
  sortOrder = 1;

  sortBy(property: string) {
    this.sortOrder = this.sortOrder * -1;
    this.filteredStudents.sort(
      (a, b) =>
        (a[property].toLowerCase() > b[property].toLowerCase() ? 1 : -1) *
        this.sortOrder
    );
  }
  // showStudentsWithNoGrades() {
  //   this.filteredStudents = this.students.filter((student) => {
  //     return !student.termWork || !student.examWork;
  //   });
  // }

  // showModal = false;

  // openModal() {
  //   this.showModal = true;
  // }

  // closeModal() {
  //   this.showModal = false;
  // }
}
