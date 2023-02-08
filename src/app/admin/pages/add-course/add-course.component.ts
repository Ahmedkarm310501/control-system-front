import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(form: any) {
    console.log(form);
  }



}
