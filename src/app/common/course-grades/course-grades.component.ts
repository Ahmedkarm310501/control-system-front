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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-grades',
  templateUrl: './course-grades.component.html',
  styleUrls: ['./course-grades.component.css'],
})
export class CourseGradesComponent implements OnInit {
  @ViewChild('f') fileRef: ElementRef;
  @ViewChild('fG') fileRefgrade: ElementRef;
  constructor(
    private gradeService: GradeService,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) {}
  gradesFile: File;
  namesFile: File;
  courseId = this.route.snapshot.paramMap.get('courseId');
  termId = this.route.snapshot.paramMap.get('termId');
  courseCode: string;
  courseName: string;
  deptName: string;
  students: any;
  filteredStudents: any;
  ngOnInit(): void {
    console.log(this.courseId);
    this.gradeService.getCourseData(this.courseId).subscribe((res) => {
      console.log(res);
      this.courseCode = res.data.course_code;
      this.courseName = res.data.name;
      this.deptName = res.data.deptName;
    });

    this.gradeService
      .getCourseGrades(this.courseId, this.termId)
      .subscribe((res) => {
        console.log(res);
        this.students = res.data.map((student) => {
          return {
            ...student,
            editable: false,
            oldTermWork: student.term_work,
            oldExamWork: student.exam_work,
          };
        });
        this.filteredStudents = this.students;
      });
  }
  // students = studData.map((student) => {
  //   return {
  //     ...student,
  //     editable: false,
  //     oldTermWork: student.termWork,
  //     oldExamWork: student.examWork,
  //   };
  // });

  isShown = false;
  shown() {
    this.isShown = !this.isShown;
  }
  close() {
    this.isShown = false;
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
    console.log(this.students);
    this.filteredStudents = this.students.filter((student) => {
      return student.id.toString().includes(searchTerm);
    });
  }

  onFileChangeGrades(event: any) {
    console.log(event);
    this.gradesFile = event.target.files[0];
  }
  onFileChangeNames(event: any) {
    this.namesFile = event.target.files[0];
  }
  /**/
  IsInvalidRecords = false;
  errorMsg2 = '';
  onExcelUploadNames(data: any) {
    console.log(data);
    const newStudents = data
      .filter((row: any) => row.id && row.name) // Only keep rows with non-empty ID and name
      .filter((row: any) => {
        // Only keep rows where student ID doesn't already exist in students array
        return !this.students.find((s: any) => s.id === row.id);
      })
      .map((row: any) => {
        return {
          id: row.id,
          name: row.name,
          termWork: null,
          examWork: null,
          editable: false,
          oldTermWork: null,
          oldExamWork: null,
          total: null,
          grade: null,
        };
      });

    if (newStudents.length > 0) {
      this.students = this.students.concat(newStudents);
      this.filteredStudents = this.students;
      console.log(this.filteredStudents);
    }

    const invalidRecords = data.filter((row: any) => !row.id || !row.name);
    if (invalidRecords.length > 0) {
      // alert(
      //   ` ${invalidRecords.length} rows were not added. Please make sure each row has both an ID and name.`
      // );
      this.errorMsg2 = `${invalidRecords.length} rows were not added. Please make sure each row has both an ID and name.`;
      this.IsInvalidRecords = true;
    }
  }

  missingStudents = [];

  modalIsOpen = false;
  IsInvalid = false;
  errorMsg = '';
  onExcelUploadGrades(data: any) {
    console.log(data);
    const validatedData = data.filter((excelStudent) => {
      console.log(excelStudent);
      const termWork = +excelStudent.termWork;
      const examWork = +excelStudent.examWork;
      // Check that term work is between 0 and 40, and exam work is between 0 and 60
      if (termWork < 0 || termWork > 40 || examWork < 0 || examWork > 60) {
        // alert(
        //   `Invalid data for student ${excelStudent.id}: termWork=${termWork}, examWork=${examWork}`
        // );
        this.errorMsg = `Invalid data for student ${excelStudent.id}: termWork=${termWork}, examWork=${examWork}`;

        this.IsInvalid = true;
        return false;
      }
      return true;
    });
    console.log(`validatedData = ${JSON.stringify(validatedData)}`);

    this.students = this.students.map((student) => {
      const excelStudent = validatedData.find((s) => +s.id === +student.id);
      if (excelStudent) {
        return {
          ...student,
          termWork: excelStudent.termWork,
          examWork: excelStudent.examWork,
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
      // alert(
      //   `There are ${this.missingStudents.length} missing students: ${this.missingStudents}`
      // );
      this.modalIsOpen = true;
      // const modal = document.getElementById('exampleModalll');
      // const myModal = new Modal(modal);
      // myModal.show();
      // show modal with missing students
    }

    this.renderer.setProperty(this.fileRef.nativeElement, 'value', null);
  }

  deleteAllGrades() {
    // let cc = confirm("Are you sure you want to delete all grades?");
    // if (cc) {}
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

  //sort by all columns
  sortBy(column: string) {
    this.filteredStudents = this.filteredStudents.sort((a, b) => {
      if (a[column] > b[column]) {
        return 1 * this.sortOrder;
      } else if (a[column] < b[column]) {
        return -1 * this.sortOrder;
      } else {
        return 0;
      }
    });
    this.sortOrder = this.sortOrder * -1;
  }
  ISduplicated = false;
  onSubmit(Form) {
    let studentId = Form.value.studentId;
    let studentName = Form.value.studentName;
    console.log(studentId, studentName);
    console.log(this.students);

    if (this.students.some((student) => +student.id === +studentId)) {
      // alert(`A student with ID ${studentId} already exists.`);
      console.log(studentId);
      this.ISduplicated = true;
      return;
    }

    const newStudent = {
      id: studentId,
      name: studentName,
      termWork: null,
      examWork: null,
      editable: false,
      oldTermWork: null,
      oldExamWork: null,
      total: null,
      grade: null,
    };
    this.students.push(newStudent);
    this.filteredStudents = this.students;
  }

  // showStudentsWithNoGrades() {
  //   this.filteredStudents = this.students.filter((student) => {
  //     return !student.termWork || !student.examWork;
  //   });
  // }

  // // openModal() {
  // //   this.showModal = true;
  // // }

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
}
