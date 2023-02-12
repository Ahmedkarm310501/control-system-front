import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() show = false;
  @Output() closeModal = new EventEmitter<void>();

  constructor() {}

  close() {
    this.closeModal.emit();
  }
}
