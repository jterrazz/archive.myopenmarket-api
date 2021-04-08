import { RoleFilter } from '../role-filter';

describe('role-filter', () => {
  class User extends RoleFilter {
    publicProp = 'publicProp';
    selfProp = 'selfProp';
  }

  const defaultUser = new User();
  defaultUser.addPublicProperties(['publicProp']);
  defaultUser.addSelfProperties(['selfProp']);

  class UserContainer extends RoleFilter {
    user = defaultUser;
  }

  describe('filterPublicProperties()', () => {
    it('filters public properties', () => {
      // Given
      const user = new User();
      user.addPublicProperties(['publicProp']);

      // When
      const publicProperties = user.filterPublicProperties();

      // Then
      expect(publicProperties).toEqual({
        publicProp: 'publicProp',
      });
    });

    it('filters nested public properties', () => {
      // Given
      const userContainer = new UserContainer();
      userContainer.addPublicProperties(['user']);

      // When
      const publicProperties = userContainer.filterPublicProperties();

      // Then
      expect(publicProperties).toEqual({
        user: { publicProp: 'publicProp' },
      });
    });
  });

  describe('filterSelfProperties()', () => {
    it('filters self and public properties', () => {
      // Given
      const user = new User();
      user.addPublicProperties(['publicProp']);
      user.addSelfProperties(['selfProp']);

      // When
      const publicProperties = user.filterSelfProperties();

      // Then
      expect(publicProperties).toEqual({
        publicProp: 'publicProp',
        selfProp: 'selfProp',
      });
    });

    it('filters nested self properties', () => {
      // Given

      const userContainer = new UserContainer();
      userContainer.addSelfProperties(['user']);

      // When
      const publicProperties = userContainer.filterSelfProperties(false);

      // Then
      expect(publicProperties).toEqual({
        user: { selfProp: 'selfProp' },
      });
    });
  });
});
