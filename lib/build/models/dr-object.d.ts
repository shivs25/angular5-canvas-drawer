import { DrType } from "./dr-type.enum";
export interface DrObject {
    id: number;
    drType: DrType;
    name: string;
    visible: boolean;
    clickable: boolean;
    rotation: number;
}
export declare const DEFAULT_OBJECT: DrObject;
