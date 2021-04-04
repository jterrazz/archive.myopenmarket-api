import _ from 'lodash';

// TODO Add recursive check for nested properties
export class PropertyAccess {
  _publicProperties = [];
  _selfProperties = [];

  addPublicProperties(properties: string[]) {
    this._publicProperties.push(...properties);
  }

  getPublicProperties() {
    return _.pick(this, this._publicProperties);
  }

  addSelfProperties(properties: string[]) {
    this._selfProperties.push(...properties);
  }

  getSelfProperties(withPublicProperties = true) {
    const properties = withPublicProperties
      ? [...this._selfProperties, this._publicProperties]
      : this._selfProperties;
    return _.pick(this, properties);
  }
}
