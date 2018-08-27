import { DrType } from "./dr-type.enum";

export interface DrObject {

    id: number;
    drType: DrType;
    name: string;
    visible: boolean;
    clickable: boolean;
    rotation: number;
    customType: string;
}

export const DEFAULT_OBJECT: DrObject = {
    id: 0,
    drType: DrType.INVALID,
    name: "Object",
    visible: true,
    clickable: true,
    rotation: 0,
    customType: null
}