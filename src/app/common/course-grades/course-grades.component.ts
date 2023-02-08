import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { studData } from './stud-data';
import { GradeService } from './grade.service';

@Component({
  selector: 'app-course-grades',
  templateUrl: './course-grades.component.html',
  styleUrls: ['./course-grades.component.css'],
})
export class CourseGradesComponent implements OnInit {
  @ViewChild('termWork') termWorkInput: ElementRef;
  @ViewChild('examWork') examWorkInput: ElementRef;

  students = studData.map((student) => {
    return {
      ...student,
      editable: false,
    };
  });

  constructor(private gradeService: GradeService) {}

  save(index: number, termWork: number, examWork: number) {
    this.students[index].editable = !this.students[index].editable;
    this.students[index].termWork = termWork;
    this.students[index].examWork = examWork;
    this.students[index].total = +termWork + +examWork;
    this.calculateGrade(index);
  }

  cancel(index: number) {
    this.students[index].editable = !this.students[index].editable;
    this.termWorkInput.nativeElement.value = this.students[index].termWork;
    this.examWorkInput.nativeElement.value = this.students[index].examWork;
    console.log(this.termWorkInput.nativeElement.value);
    console.log(this.examWorkInput.nativeElement.value);
  }

  calculateGrade(index: number) {
    this.students[index].grade = this.gradeService.calculateGrade(
      this.students[index].total
    );
  }

  ngOnInit(): void {}
}
