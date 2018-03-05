import { DrType } from "./dr-type.enum";
export interface DrObject {
    id: number;
    drType: DrType;
    name: string;
    visible: boolean;
    transformX: number;
    transformY: number;
    scaleX: number;
    scaleY: number;
    clickable: boolean;
}
export declare const DEFAULT_OBJECT: DrObject;
