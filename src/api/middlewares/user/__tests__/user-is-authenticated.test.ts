import { userIsAuthenticated } from '../user-is-authenticated';

describe('userIsAuthenticated() - middleware', function () {
  it('should continue request if user is authenticated', function () {
    // Given
    const context = {
      isAuthenticated: jest.fn(),
    };
    const next = jest.fn();

    // When
    // @ts-ignore
    userIsAuthenticated(context, next);

    // Then
    expect(context.isAuthenticated).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
