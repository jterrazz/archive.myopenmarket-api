/* eslint-disable  @typescript-eslint/no-explicit-any */

import _ from 'lodash';

export class RoleFilter {
  _publicProperties: string[] = [];
  _selfProperties: string[] = [];

  addPublicProperties(properties: string[]): void {
    this._publicProperties.push(...properties);
  }

  filterPublicProperties(): any {
    const properties = this._publicProperties;
    const filteredObject = _.pick(this, properties);

    Object.keys(filteredObject).map((filteredObjectKey) => {
      if (Array.isArray(filteredObject[filteredObjectKey])) {
        filteredObject[filteredObjectKey] = filteredObject[filteredObjectKey].map((t) => {
          return RoleFilter._getFilteredPublicProperty(t);
        });
      }
      filteredObject[filteredObjectKey] = RoleFilter._getFilteredPublicProperty(
        filteredObject[filteredObjectKey],
      );
    });
    return filteredObject;
  }

  private static _getFilteredPublicProperty(property) {
    if (property?.filterPublicProperties) {
      return property.filterPublicProperties();
    }

    return property;
  }

  addSelfProperties(properties: string[]): void {
    this._selfProperties.push(...properties);
  }

  filterSelfProperties(withPublicProperties = true): any {
    const properties = withPublicProperties
      ? [...this._selfProperties, ...this._publicProperties]
      : this._selfProperties;

    const filteredObject = _.pick(this, properties);

    Object.keys(filteredObject).map((filteredObjectKey) => {
      if (Array.isArray(filteredObject[filteredObjectKey])) {
        filteredObject[filteredObjectKey] = filteredObject[filteredObjectKey].map((t) => {
          return RoleFilter._getFilteredSelfProperty(t, withPublicProperties);
        });
      }
      filteredObject[filteredObjectKey] = RoleFilter._getFilteredSelfProperty(
        filteredObject[filteredObjectKey],
        withPublicProperties,
      );
    });
    return filteredObject;
  }

  private static _getFilteredSelfProperty(property: any, withPublicProperties: boolean): any {
    if (property?.filterSelfProperties) {
      return property.filterSelfProperties(withPublicProperties);
    }

    return property;
  }
}
