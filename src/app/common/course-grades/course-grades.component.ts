import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { GradeService } from './grade.service';
import { ActivatedRoute } from '@angular/router';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-course-grades',
  templateUrl: './course-grades.component.html',
  styleUrls: ['./course-grades.component.css'],
})
export class CourseGradesComponent implements OnInit {
  @ViewChild('f') fileRefgrade: ElementRef;
  @ViewChild('fG') fileRef: ElementRef;
  @ViewChild('snackbar') snackbar: SnackbarComponent;

  constructor(
    private gradeService: GradeService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}
  gradesFile: File;
  namesFile: File;
  courseId = this.route.snapshot.paramMap.get('courseId');
  termId = this.route.snapshot.paramMap.get('termId');
  courseCode: string;
  courseName: string;
  deptName: string;
  instructor: string;
  students: any = [];
  filteredStudents: any;
  deleteStudent = false;
  isLoading: boolean = true;
  deletedStudentId: string;
  user_password: string;

  message: string;
  type: string;
  ngOnInit(): void {
    this.gradeService.getCourseData(this.courseId).subscribe(
      (res) => {
        this.courseCode = res.data.courseID;
        this.courseName = res.data.courseName;
        this.deptName = res.data.deptName;
        this.instructor = res.data.instructor;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = true;
      }
    );

    this.gradeService
      .getCourseGrades(this.courseId, this.termId)
      .subscribe((res) => {
        this.isLoading = false;

        this.students = res.data.map(
          (student) => {
            return {
              ...student,
              editable: false,
              oldTermWork: student.term_work,
              oldExamWork: student.exam_work,
            };
          },
          (err) => {
            this.isLoading = true;
          }
        );

        this.filteredStudents = this.students;
      });
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
    this.gradeService
      .addOneStudentGrade(
        this.courseId,
        this.termId,
        this.filteredStudents[index].student_id,
        termWork,
        examWork
      )
      .subscribe((res) => {
        if (res.status === 200) {
          this.filteredStudents[index].editable =
            !this.filteredStudents[index].editable;
          this.filteredStudents[index].total_grade = +termWork + +examWork;
          this.calculateGrade(index);
          // update old values
          this.filteredStudents[index].oldTermWork =
            this.filteredStudents[index].termWork;
          this.filteredStudents[index].oldExamWork =
            this.filteredStudents[index].examWork;
        } else {
          this.cancel(index);
        }
      });
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
      this.filteredStudents[index].total_grade
    );
  }

  searchStudent(searchTerm: string) {
    this.filteredStudents = this.students.filter((student) => {
      return (
        student.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_id.toString().includes(searchTerm) ||
        student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.total_grade.toString().includes(searchTerm) ||
        student.term_work.toString().includes(searchTerm) ||
        student.exam_work.toString().includes(searchTerm)
      );
    });
  }

  onFileChangeGrades(event: any) {
    this.gradesFile = event.target.files[0];
  }
  onFileChangeNames(event: any) {
    this.namesFile = event.target.files[0];
  }
  /**/
  IsInvalidRecords = false;
  errorMsg2 = '';
  // onExcelUploadNames(data: any) {

  //   const newStudents = data
  //     .filter((row: any) => row.id && row.name) // Only keep rows with non-empty ID and name
  //     .filter((row: any) => {
  //       // Only keep rows where student ID doesn't already exist in students array
  //       return !this.students.find((s: any) => s.id === row.id);
  //     })
  //     .map((row: any) => {
  //       return {
  //         id: row.id,
  //         name: row.name,
  //         termWork: null,
  //         examWork: null,
  //         editable: false,
  //         oldTermWork: null,
  //         oldExamWork: null,
  //         total: null,
  //         grade: null,
  //       };
  //     });

  //   if (newStudents.length > 0) {
  //     this.students = this.students.concat(newStudents);
  //     this.filteredStudents = this.students;

  //   }

  //   const invalidRecords = data.filter((row: any) => !row.id || !row.name);
  //   if (invalidRecords.length > 0) {
  //     this.errorMsg2 = `${invalidRecords.length} rows were not added. Please make sure each row has both an ID and name.`;
  //     this.IsInvalidRecords = true;
  //   }
  //   this.renderer.setProperty(this.fileRef.nativeElement, 'value', null);
  // }

  missingStudents = [];

  modalIsOpen = false;
  IsInvalid = false;
  errorMsg = '';

  onExcelUploadGrades(files: FileList) {
    const file = files[0];
    this.isLoading = true;
    this.gradeService
      .addStudentGradesExcel(this.courseId, this.termId, file)
      .subscribe((res) => {
        if (res.status === 201) {
          this.students = this.students.map(
            (student) => {
              const excelStudent = res.body.data.find(
                (s) => +s.student_id === +student.student_id
              );
              if (excelStudent.term_work && excelStudent.exam_work) {
                return {
                  ...student,
                  term_work: excelStudent.term_work,
                  exam_work: excelStudent.exam_work,
                  total_grade:
                    +excelStudent.term_work + +excelStudent.exam_work,
                  grade: this.gradeService.calculateGrade(
                    +excelStudent.term_work + +excelStudent.exam_work
                  ),
                };
              } else {
                this.missingStudents.push(student.student_id);
                return student;
              }
            }
          );
          this.filteredStudents = this.students;
          if (this.missingStudents.length > 0) {
            this.modalIsOpen = true;
          }
          this.isLoading = false;
        } else {
          // alert('Invalid data in excel file');
          this.errorMsg = 'Invalid data in excel file';
          this.IsInvalid = true;
        }
      } ,
        (err) => {
          this.message = err.error.message;
          this.type = 'failed';
          this.snackbar.show();
          this.isLoading = false;
            }
      );
    this.renderer.setProperty(this.fileRefgrade.nativeElement, 'value', null);
  }

  deleteAllGrades() {
    this.isLoading = true;
    this.gradeService
      .deleteAllStudentGrades(this.courseId, this.termId, this.user_password)
      .subscribe(
        (res) => {
          if (res.status === 200) {
            this.students = this.students.map((student) => {
              return {
                ...student,
                term_work: null,
                exam_work: null,
                total_grade: null,
                grade: null,
              };
            });
            this.message = 'All grades deleted successfully';
            this.type = 'success';
            this.isLoading = false;
            this.snackbar.show();
            this.filteredStudents = this.students;
          }
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.message = err.error.error;
          this.type = 'failed';
          this.isLoading = false;
          this.snackbar.show();
        }
      );
  }

  toggleStudentsWithNoGrades() {
    if (this.filteredStudents.length === this.students.length) {
      this.filteredStudents = this.students.filter((student) => {
        return !student.term_work || !student.exam_work;
      });
    } else {
      this.filteredStudents = this.students;
    }
  }
  sortOrder = 1;

  //sort by all columns
  sortBy(column: string) {
    if (column === 'name') {
      this.filteredStudents = this.filteredStudents.sort((a, b) => {
        if (a.student.name > b.student.name) {
          return 1 * this.sortOrder;
        } else if (a.student.name < b.student.name) {
          return -1 * this.sortOrder;
        } else {
          return 0;
        }
      });
    } else {
      this.filteredStudents = this.filteredStudents.sort((a, b) => {
        if (a[column] > b[column]) {
          return 1 * this.sortOrder;
        } else if (a[column] < b[column]) {
          return -1 * this.sortOrder;
        } else {
          return 0;
        }
      });
    }

    this.sortOrder = this.sortOrder * -1;
  }
  ISduplicated = false;

  onSubmit(Form) {
    let studentId = Form.value.studentId;
    let studentName = Form.value.studentName;

    if (this.students.some((student) => +student.student_id === +studentId)) {
      // alert(`A student with ID ${studentId} already exists.`);
      this.ISduplicated = true;
      return;
    }
    this.gradeService
      .addStudentToCourse(studentName, this.courseId, this.termId, studentId)
      .subscribe((res) => {
        this.students.push({
          student_id: studentId,
          student: {
            name: studentName,
          },
          termWork: null,
          examWork: null,
          editable: false,
          oldTermWork: null,
          oldExamWork: null,
          total: null,
          grade: null,
        });
        this.filteredStudents = this.students;

        Form.reset();
      });
  }

  onFileSelected(files: FileList) {
    const file = files[0];
    this.isLoading = true;

    this.gradeService
      .addStudentsToCourse(this.courseId, this.termId, file)
      .subscribe(
        (res) => {
          let newStudents = res.body.data.students.map(
            (student) => {
              return {
                student_id: student.student_id,
                student: {
                  name: student.student.name,
                },
                termWork: null,
                examWork: null,
                editable: false,
                oldTermWork: null,
                oldExamWork: null,
                total: null,
                grade: null,
              };
            },
            (err) => {}
          );
          this.isLoading = false;

          // check if any of the new students already exist in the students array
          this.students = this.students.concat(
            newStudents.filter((newStudent) => {
              return !this.students.some(
                (student) => +student.student_id === +newStudent.student_id
              );
            })
          );

          this.filteredStudents = this.students;
        },
        (err) => {
          if (err.status === 400) {
            this.message = 'Invalid data in excel file';
            this.type = 'failed';
            this.snackbar.show();
            this.isLoading = false;
          } else {
            this.message = err.error.message;
            this.type = 'failed';
            this.snackbar.show();
            this.isLoading = false;
          }
        }
      );
  }

  DeleteStudent(student_id: string) {
    this.isLoading = true;

    this.deleteStudent = true;

    this.gradeService
      .deleteStudentFromCourse(this.courseId, this.termId, student_id)
      .subscribe(
        (res) => {
          this.students = this.students.filter((student) => {
            return +student.student_id !== +student_id;
          });
          this.filteredStudents = this.students;
          this.isLoading = false;
        },
        (err) => {
          // alert('Something went wrong');
          this.message = err.error.message;
          this.type = 'failed';
        }
      );
  }

  exportGrades() {
    this.gradeService.exportGradesToExcel(this.courseId, this.termId).subscribe(
      (res) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(res.body);
        downloadLink.download = `${this.courseCode}-${this.termId}.xlsx`;
        downloadLink.click();
      },
      (err) => {
        this.message = err.error.message;
        this.type = 'failed';
        this.snackbar.show();
      }
    );
  }
  deleteAllStudents() {
    this.isLoading = true;
    console.log(this.user_password);
    this.gradeService
      .deleteAllStudentsFromCourse(
        this.courseId,
        this.termId,
        this.user_password
      )
      .subscribe(
        (res) => {
          this.students = [];
          this.filteredStudents = this.students;
          this.message = 'All students deleted successfully';
          this.type = 'success';
          this.isLoading = false;
          this.snackbar.show();
        },
        (err) => {
          this.message = err.error.error;
          this.type = 'failed';
          this.snackbar.show();
          console.log(err);
          this.isLoading = false;
        }
      );
  }

  closeModal() {
    this.modalIsOpen = false;
  }
  closeModal2() {
    this.ISduplicated = false;
  }
  closeModal3() {
    this.IsInvalid = false;
  }
  closeModal4() {
    this.IsInvalidRecords = false;
  }

  closeModal5() {
    this.errorMsg = 'Are you sure you want to delete this student ?';
    this.deleteStudent = false;
  }
}
