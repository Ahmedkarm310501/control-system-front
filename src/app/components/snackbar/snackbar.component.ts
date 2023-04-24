import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  forwardRef,
} from '@angular/core';

@Component({
  selector: 'app-snackbar',
  template: `
    <div
      *ngIf="showSnackbar"
      #snackbar
      class="snackbar"
      [ngStyle]="{
        'background-color': type === 'success' ? '#00F593' : '#FF0033',
        color: type === 'success' ? 'black' : 'white'
      }"
    >
      <div class="symbol">
        <h1 *ngIf="type === 'success'">&#x2713;</h1>
        <h1 *ngIf="type !== 'success'">&#x2613;</h1>
      </div>
      <div class="message">{{ message }}</div>
    </div>
  `,
  styleUrls: ['./snackbar.component.css'],
})
export class SnackbarComponent {
  @Input() type: string;
  @Input() message: string;
  showSnackbar = false;

  show() {
    this.showSnackbar = true;
    setTimeout(() => {
      this.showSnackbar = false;
    }, 3000);
  }
}
