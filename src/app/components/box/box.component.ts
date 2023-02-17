import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css'],
})
export class BoxComponent implements OnInit {
  @Input() name: string;
  @Input() number: number;
  @Input() color: string;

  constructor() {}

  ngOnInit(): void {}
}
