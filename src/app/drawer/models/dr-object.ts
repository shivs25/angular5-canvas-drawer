import { DrType } from "./dr-type.enum";

export class DrObject {

    id: number;
    drType: DrType;
    name: string = "Object";
    visible: boolean = true;
    transformX: number = 0;
    transformY: number = 0;
    scaleX: number = 1;
    scaleY: number = 1;
    clickable: boolean;
    showFill: boolean = false;
    showStroke: boolean = false;
    fill: string = "white";
    stroke: string = "black";
    strokeWidth: number = 1;
    opacity: number = 1;
    
}
