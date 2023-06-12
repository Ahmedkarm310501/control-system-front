import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

type ResponseData = {
  message: string;
  data: { id: string; name: string; deptName: string; course_code: string };
};

type ResponseData2 = {
  message: string;
  data: [
    {
      student_id: string;
      term_work: number;
      exam_work: number;
      total_grade: number;
      grade: string;
      student: {
        name: string;
      };
    }
  ];
};
type response = {
  message: string;
  data: {
    students: [
      {
        student_id: string;
        student: {
          name: string;
        };
      }
    ];
  };
};

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  // function to calculate grade for each student and return the grade

  getCourseData(courseId: string) {
    return this.http.get<ResponseData>(`${this.baseUrl}/courses/${courseId}`);
  }

  getCourseGrades(courseId: string, termId: string) {
    return this.http.get<ResponseData2>(
      `${this.baseUrl}/course-grades/${courseId}/${termId}`
    );
  }

  addStudentToCourse(
    student_name: string,
    course_id: string,
    semester_id: string,
    student_id: string
  ) {
    return this.http.post(
      `${this.baseUrl}/add-student-to-course`,
      {
        student_name: student_name,
        course_id: course_id,
        semester_id: semester_id,
        student_id: student_id,
      },
      { observe: 'response' }
    );
  }

  addStudentsToCourse(course_id: string, semester_id: string, file: File) {
    const formData = new FormData();
    formData.append('students', file);
    formData.append('course_id', course_id);
    formData.append('semester_id', semester_id);

    return this.http.post<response>(
      `${this.baseUrl}/add-students-to-course-excel`,
      formData,
      {
        observe: 'response',
      }
    );
  }

  deleteStudentFromCourse(
    course_id: string,
    semester_id: string,
    student_id: string
  ) {
    return this.http.post(
      `${this.baseUrl}/delete-student-from-course/`,
      {
        student_id: student_id,
        course_id: course_id,
        semester_id: semester_id,
      },
      { observe: 'response' }
    );
  }

  calculateGrade(total: number) {
    if (total >= 90) {
      return 'A+';
    } else if (total >= 85) {
      return 'A';
    } else if (total >= 80) {
      return 'B+';
    } else if (total >= 75) {
      return 'B';
    } else if (total >= 70) {
      return 'C+';
    } else if (total >= 65) {
      return 'C';
    } else if (total >= 60) {
      return 'D+';
    } else if (total >= 50) {
      return 'D';
    } else {
      return 'F';
    }
  }
}
