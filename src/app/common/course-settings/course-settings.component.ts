import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { CourseSettingsService } from './course-settings.service';

@Component({
  selector: 'app-course-settings',
  templateUrl: './course-settings.component.html',
  styleUrls: ['./course-settings.component.css'],
})
export class CourseSettingsComponent implements OnInit {
  onSubmit(form: any) {
    console.log(form);
  }

  constructor(
    private route: ActivatedRoute,
    private courseSettingsService: CourseSettingsService
  ) {}
  courseId = this.route.snapshot.paramMap.get('courseId');
  courseName: string;
  courseCode: string;
  department: string;
  instructor: string;
  termWork: number;
  examWork: number;
  totalGrade: number;

  ngOnInit(): void {
    this.courseSettingsService.getCourseData(this.courseId).subscribe(
      (data) => {
        this.courseCode = data.data.courseID;
        this.courseName = data.data.courseName;
        this.department = data.data.department;
        this.instructor = data.data.instructor;
        this.termWork = data.data.termWork;
        this.examWork = data.data.examWork;
        this.totalGrade = data.data.totalGrade;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
