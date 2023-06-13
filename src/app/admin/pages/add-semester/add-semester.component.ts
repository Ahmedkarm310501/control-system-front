import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-semester',
  templateUrl: './add-semester.component.html',
  styleUrls: ['./add-semester.component.css'],
})
export class AddSemesterComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onSubmit(form: any) {
    console.log('Form Submitted!');
    // navigate to configure semester page
    this.router.navigate(['/configure-semester']);
  }
}
