import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { StudentGradesService } from './student-grades.service';

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.css'],
})
export class StudentGradesComponent implements OnInit {
  filteredData: [
    {
      course_name: string;
      exam_work: string;
      grade: string;
      term_work: string;
      semester_term: string;
      semester_year: string;
      total_work: string;
    }
  ];
  isLoading = false;
  message: any;
  type: any;

  student_name: string;
  constructor(private stu: StudentGradesService) {}

  ngOnInit(): void {}

  search(student_id: string) {
    // add condition to check if student_id is empty
    if (student_id == '') {
      return;
    } else {
      this.isLoading = true;
      this.stu.getStudentGrades(student_id).subscribe((res: any) => {
        this.filteredData = res.data.courses;
        this.student_name = res.data.student_name;
      });
      this.isLoading = false;
    }
  }
}
