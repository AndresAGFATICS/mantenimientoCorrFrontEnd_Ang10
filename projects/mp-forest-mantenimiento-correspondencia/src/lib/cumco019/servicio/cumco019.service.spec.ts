import { TestBed } from '@angular/core/testing';

import { Cumco019Service } from './cumco019.service';

describe('Cumco019Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Cumco019Service = TestBed.get(Cumco019Service);
    expect(service).toBeTruthy();
  });
});
