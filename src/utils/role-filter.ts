import _ from 'lodash';

export class RoleFilter {
  _publicProperties: string[] = [];
  _selfProperties: string[] = [];

  addPublicProperties(properties: string[]) {
    this._publicProperties.push(...properties);
  }

  filterPublicProperties() {
    const properties = this._publicProperties;
    const filteredObject = _.pick(this, properties);

    Object.keys(filteredObject).map((filteredObjectKey) => {
      if (Array.isArray(filteredObject[filteredObjectKey])) {
        filteredObject[filteredObjectKey] = filteredObject[filteredObjectKey].map((t) => {
          return this._getFilteredPublicProperty(t);
        });
      }
      filteredObject[filteredObjectKey] = this._getFilteredPublicProperty(
        filteredObject[filteredObjectKey],
      );
    });
    return filteredObject;
  }

  _getFilteredPublicProperty(property) {
    if (property?.filterPublicProperties) {
      return property.filterPublicProperties();
    }

    return property;
  }

  addSelfProperties(properties: string[]) {
    this._selfProperties.push(...properties);
  }

  filterSelfProperties(withPublicProperties = true) {
    const properties = withPublicProperties
      ? [...this._selfProperties, ...this._publicProperties]
      : this._selfProperties;

    const filteredObject = _.pick(this, properties);

    Object.keys(filteredObject).map((filteredObjectKey) => {
      if (Array.isArray(filteredObject[filteredObjectKey])) {
        filteredObject[filteredObjectKey] = filteredObject[filteredObjectKey].map((t) => {
          return this._getFilteredSelfProperty(t, withPublicProperties);
        });
      }
      filteredObject[filteredObjectKey] = this._getFilteredSelfProperty(
        filteredObject[filteredObjectKey],
        withPublicProperties,
      );
    });
    return filteredObject;
  }

  _getFilteredSelfProperty(property, withPublicProperties) {
    if (property?.filterSelfProperties) {
      return property.filterSelfProperties(withPublicProperties);
    }

    return property;
  }
}
