import _ from 'lodash';

export class RoleFilter {
  _publicProperties = [];
  _selfProperties = [];

  addPublicProperties(properties: string[]) {
    this._publicProperties.push(...properties);
  }

  filterPublicProperties() {
    const filteredObject = _.pick(this, this._publicProperties);
    Object.keys(filteredObject).map((filteredObjectKey) => {
      if (filteredObject[filteredObjectKey] instanceof RoleFilter) {
        filteredObject[filteredObjectKey] = filteredObject[
          filteredObjectKey
        ].filterPublicProperties();
      }
    });
    return filteredObject;
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
      if (filteredObject[filteredObjectKey] instanceof RoleFilter) {
        filteredObject[filteredObjectKey] = filteredObject[filteredObjectKey].filterSelfProperties(
          withPublicProperties,
        );
      }
    });
    return filteredObject;
  }
}
