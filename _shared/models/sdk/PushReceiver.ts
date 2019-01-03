/* tslint:disable */
import {
  AppUser
} from '../../sdk/index';

declare var Object: any;
export interface PushReceiverInterface {
  "id"?: string;
  "appId"?: string;
  "deviceType"?: string;
  "deviceToken"?: string;
  "providerType": string;
  "providerToken"?: string;
  "appUserId"?: string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  appUser?: AppUser;
}

export class PushReceiver implements PushReceiverInterface {
  "id": string;
  "appId": string;
  "deviceType": string;
  "deviceToken": string;
  "providerType": string;
  "providerToken": string;
  "appUserId": string;
  "createdAt": Date;
  "updatedAt": Date;
  appUser: AppUser;
  constructor(data?: PushReceiverInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PushReceiver`.
   */
  public static getModelName() {
    return "PushReceiver";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PushReceiver for dynamic purposes.
  **/
  public static factory(data: PushReceiverInterface): PushReceiver{
    return new PushReceiver(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'PushReceiver',
      plural: 'PushReceivers',
      path: 'PushReceivers',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'string'
        },
        "appId": {
          name: 'appId',
          type: 'string'
        },
        "deviceType": {
          name: 'deviceType',
          type: 'string'
        },
        "deviceToken": {
          name: 'deviceToken',
          type: 'string'
        },
        "providerType": {
          name: 'providerType',
          type: 'string'
        },
        "providerToken": {
          name: 'providerToken',
          type: 'string'
        },
        "appUserId": {
          name: 'appUserId',
          type: 'string'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        appUser: {
          name: 'appUser',
          type: 'AppUser',
          model: 'AppUser',
          relationType: 'belongsTo',
                  keyFrom: 'appUserId',
          keyTo: 'id'
        },
      }
    }
  }
}
