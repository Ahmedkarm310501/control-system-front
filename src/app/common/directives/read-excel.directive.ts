import {
  Directive,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as XLSX from 'xlsx';

@Directive({
  selector: '[appReadExcel]',
})
export class ReadExcelDirective implements OnChanges {
  @Input() file: File;
  @Output() uploaded = new EventEmitter<any>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['file'] && changes['file'].currentValue) {
      this.readExcel();
    }
  }

  readExcel() {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      this.uploaded.emit(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
    };
    reader.readAsBinaryString(this.file);
    // this.file = null;
  }
}
