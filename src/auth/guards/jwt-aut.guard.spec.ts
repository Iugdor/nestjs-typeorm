import { JwtAuthGuard } from './jwt-aut.guard';

describe('JwtAutGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
