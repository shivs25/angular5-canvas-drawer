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
    showFill: boolean;
    showStroke: boolean;
    fill: string;
    stroke: string;
    strokeWidth: number;
    opacity: number;
    
}

export const INITIAL_OBJECT_STATE: DrObject = {
    id: 0,
    drType: DrType.INVALID,
    name: "Object",
    visible: true,
    transformX: 0,
    transformY: 0,
    scaleX: 1,
    scaleY: 1,
    clickable: false,
    showFill: true,
    showStroke: true,
    fill: "white",
    stroke: "black",
    strokeWidth: 1,
    opacity: 1
}