import { TestBed } from '@angular/core/testing';

import { UIHandlerService } from './uihandler.service';

describe('UIHandlerService', () => {
  let service: UIHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
