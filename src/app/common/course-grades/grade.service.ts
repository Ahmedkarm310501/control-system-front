import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor() { }
  // function to calculate grade for each student and return the grade
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
    }
    else if (total >= 60) {
      return 'D+';
    }
    else if (total >= 50) {
      return 'D';
    }
    else {
      return 'F';
    }
  }
}
