/* tslint:disable */
import {
  PushReceiver
} from '../../sdk/index';

declare var Object: any;
export interface PushNotificationInterface {
  "trackId"?: string;
  "notificationData": any;
  "sentAt"?: Date;
  "sentResponse"?: any;
  "sentResponseStatus"?: string;
  "id"?: number;
  "pushReceiverId"?: string;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  pushReceiver?: PushReceiver;
}

export class PushNotification implements PushNotificationInterface {
  "trackId": string;
  "notificationData": any;
  "sentAt": Date;
  "sentResponse": any;
  "sentResponseStatus": string;
  "id": number;
  "pushReceiverId": string;
  "createdAt": Date;
  "updatedAt": Date;
  pushReceiver: PushReceiver;
  constructor(data?: PushNotificationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PushNotification`.
   */
  public static getModelName() {
    return "PushNotification";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PushNotification for dynamic purposes.
  **/
  public static factory(data: PushNotificationInterface): PushNotification{
    return new PushNotification(data);
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
      name: 'PushNotification',
      plural: 'PushNotifications',
      path: 'PushNotifications',
      idName: 'id',
      properties: {
        "trackId": {
          name: 'trackId',
          type: 'string'
        },
        "notificationData": {
          name: 'notificationData',
          type: 'any'
        },
        "sentAt": {
          name: 'sentAt',
          type: 'Date'
        },
        "sentResponse": {
          name: 'sentResponse',
          type: 'any'
        },
        "sentResponseStatus": {
          name: 'sentResponseStatus',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "pushReceiverId": {
          name: 'pushReceiverId',
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
        pushReceiver: {
          name: 'pushReceiver',
          type: 'PushReceiver',
          model: 'PushReceiver',
          relationType: 'belongsTo',
                  keyFrom: 'pushReceiverId',
          keyTo: 'id'
        },
      }
    }
  }
}
