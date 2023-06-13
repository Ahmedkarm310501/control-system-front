import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSemesterComponent } from './configure-semester.component';

describe('ConfigureSemesterComponent', () => {
  let component: ConfigureSemesterComponent;
  let fixture: ComponentFixture<ConfigureSemesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureSemesterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
