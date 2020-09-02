import { TestBed } from '@angular/core/testing';

import { Cumco013Service } from './cumco013.service';

describe('Cumco018Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Cumco013Service = TestBed.get(Cumco013Service);
    expect(service).toBeTruthy();
  });
});
