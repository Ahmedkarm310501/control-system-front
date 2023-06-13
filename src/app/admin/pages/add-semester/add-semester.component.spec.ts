import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSemesterComponent } from './add-semester.component';

describe('AddSemesterComponent', () => {
  let component: AddSemesterComponent;
  let fixture: ComponentFixture<AddSemesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSemesterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
