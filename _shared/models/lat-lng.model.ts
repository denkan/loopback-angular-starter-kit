import * as geolib from 'geolib';

export class LatLng {
  latitude: number;
  longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  toString() {
    return this.latitude + ',' + this.longitude;
  }

  getDistance(destination: LatLng, accuracy?: number, precision?: number) {
    return geolib.getDistance(this, destination, accuracy, precision);
  }

  static fromString(latLngAsString: string) {
    const latlng = (latLngAsString + ',').split(',');
    return new LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));
  }

  static fromObject(latLngAsObject: object) {
    const latitude: number = latLngAsObject['latitude'] ||  latLngAsObject['lat'];
    const longitude: number = latLngAsObject['longitude']  ||  latLngAsObject['lng'] ||  latLngAsObject['lon'];
    return new LatLng(latitude, longitude);
  }

}
