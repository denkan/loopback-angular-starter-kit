import { UserCreateModule } from './create.module';

describe('CreateModule', () => {
  let createModule: UserCreateModule;

  beforeEach(() => {
    createModule = new UserCreateModule();
  });

  it('should create an instance', () => {
    expect(createModule).toBeTruthy();
  });
});
