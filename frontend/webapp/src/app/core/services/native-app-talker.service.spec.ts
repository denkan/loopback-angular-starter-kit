import { TestBed, inject } from '@angular/core/testing';

import { NativeAppTalkerService } from './native-app-talker.service';

describe('NativeAppTalkerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NativeAppTalkerService]
    });
  });

  it('should be created', inject([NativeAppTalkerService], (service: NativeAppTalkerService) => {
    expect(service).toBeTruthy();
  }));
});
