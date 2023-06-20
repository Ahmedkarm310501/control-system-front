import { TestBed } from '@angular/core/testing';

import { CompareCoursesService } from './compare-courses.service';

describe('CompareCoursesService', () => {
  let service: CompareCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompareCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
