import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onFileSelected(event : any) {
    console.log(event);
  }

  onUpload() {

    console.log("upload");

  }
  onSubmit(form: any) {
    console.log("submit");
  }


}
