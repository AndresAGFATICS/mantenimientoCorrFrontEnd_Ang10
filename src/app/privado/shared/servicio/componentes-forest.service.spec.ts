import { TestBed } from '@angular/core/testing';

import { ComponentesForestService } from './componentes-forest.service';

describe('ComponentesForestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentesForestService = TestBed.get(ComponentesForestService);
    expect(service).toBeTruthy();
  });
});
