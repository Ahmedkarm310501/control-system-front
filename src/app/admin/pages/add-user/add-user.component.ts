import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @ViewChild('snackbar') snackbar: SnackbarComponent;
  constructor() { }

  
  ngOnInit(): void {
  }
  onSubmit(form: any) {
    this.snackbar.show();
    console.log(form);
  }


}
