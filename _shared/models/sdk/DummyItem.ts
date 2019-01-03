/* tslint:disable */

declare var Object: any;
export interface DummyItemInterface {
  "title"?: string;
  "description"?: string;
  "isDumb"?: boolean;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class DummyItem implements DummyItemInterface {
  "title": string;
  "description": string;
  "isDumb": boolean;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: DummyItemInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DummyItem`.
   */
  public static getModelName() {
    return "DummyItem";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DummyItem for dynamic purposes.
  **/
  public static factory(data: DummyItemInterface): DummyItem{
    return new DummyItem(data);
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
      name: 'DummyItem',
      plural: 'DummyItems',
      path: 'DummyItems',
      idName: 'id',
      properties: {
        "title": {
          name: 'title',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "isDumb": {
          name: 'isDumb',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
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
      }
    }
  }
}
