import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddCourseService } from './add-course.service';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  constructor(private router: Router, private addCourseService: AddCourseService) {}

  ngOnInit(): void {
  }
  onSubmit(form: any) {
    this.addCourseService
      .addCourse(form.course_name, form.course_name, form.dept_code)
      .subscribe((res) => {
        alert('Course Added Successfully');
        console.log(res);
        console.log(form);
        
      }
        , (err) => {
          alert('Error Occured');
          console.log(err);
        });
    
    this.router.navigate(['/courses']);
  }
  
 


}
