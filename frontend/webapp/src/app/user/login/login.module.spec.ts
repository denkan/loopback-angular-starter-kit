import { UserLoginModule } from './login.module';

describe('LoginModule', () => {
  let loginModule: UserLoginModule;

  beforeEach(() => {
    loginModule = new UserLoginModule();
  });

  it('should create an instance', () => {
    expect(loginModule).toBeTruthy();
  });
});
