import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { studData } from './stud-data';
import { GradeService } from './grade.service';


@Component({
  selector: 'app-course-grades',
  templateUrl: './course-grades.component.html',
  styleUrls: ['./course-grades.component.css']
})
  
  
export class CourseGradesComponent implements OnInit {
  @ViewChild('termWorkInput') termWorkInput: any;
  @ViewChild('examWorkInput') examWorkInput: any;
  
  
  students = studData.map((student) => {
    return {
      ...student,
      editable: false
    }
  });
  editable = false;
  

  isValidated = false;
  constructor(private gradeService: GradeService) { }

    // validate examwork and termwork inputs to be less than 60 and 40 respectively
  
  updateExamWork(index: number, event: any) {
    this.students[index].examWork = event.target.value;
  }

  updateTermWork(index: number, event: any) {
    this.students[index].termWork = event.target.value;
  }

  

 

  edit(index: number) {
    this.students[index].editable = !this.students[index].editable;
    // this.students[index].grade = this.gradeService.calculateGrade(this.students[index].total);
    if (this.students[index].termWork !==null && this.students[index].examWork !== null) {
      this.students[index].total = +this.students[index].termWork + +this.students[index].examWork;
      this.calculateGrade(index);      
    }

  }
  
  // make cancel function
  cancel(index: number) {
    this.students[index].editable = !this.students[index].editable;
    // this.students[index].termWork = null;
    // this.students[index].examWork = null;
    // this.students[index].total = null;
    // this.students[index].grade = null;
    console.log(this.termWorkInput);
    
    this.termWorkInput.control.value = this.students[index].termWork;
    this.examWorkInput.control.value = this.students[index].examWork;
    console.log(this.termWorkInput.viewModel);
    console.log(this.students[index].termWork);
  }

  
  calculateGrade(index: number) {
    this.students[index].grade = this.gradeService.calculateGrade(this.students[index].total);
  }
  
  
  ngOnInit(): void {
    
    
  }

}
