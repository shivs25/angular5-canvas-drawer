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
    dashedLine: boolean;
    
}

export const DEFAULT_OBJECT: DrObject = {
    id: 0,
    drType: DrType.INVALID,
    name: "Object",
    visible: true,
    transformX: 0,
    transformY: 0,
    scaleX: 1,
    scaleY: 1,
    clickable: true,
    showFill: true,
    showStroke: true,
    fill: "white",
    stroke: "black",
    strokeWidth: 1,
    opacity: 1,
    dashedLine: false
}