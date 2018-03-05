import { DrType } from "./dr-type.enum";
import { DrObject, DEFAULT_OBJECT } from "./dr-object";

export interface DrGroupedObject extends DrObject {

    objects: DrObject[]
    
}


export const DEFAULT_GROUPED_OBJECT: DrGroupedObject = Object.assign({}, DEFAULT_OBJECT, {
    objects: [],
    drType: DrType.GROUPED_OBJECT
 });
 
 export function createDrGroupedObject(properties: any): DrGroupedObject {
     return  Object.assign({}, DEFAULT_GROUPED_OBJECT, properties);
 }
