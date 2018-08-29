import { DrObject } from "./dr-object";
export interface DrGroupedObject extends DrObject {
    objects: DrObject[];
}
export declare const DEFAULT_GROUPED_OBJECT: DrGroupedObject;
export declare function createDrGroupedObject(properties: any): DrGroupedObject;
