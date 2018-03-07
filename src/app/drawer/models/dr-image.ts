import { DrRect, DEFAULT_RECT } from "./dr-rect";
import { DrType } from "./dr-type.enum";

export interface DrImage extends DrRect {

    url: string;
    
}

export const DEFAULT_IMAGE: DrImage = Object.assign({}, DEFAULT_RECT, {
    url: "/assets/image-placeholder-dark.png",
    showStroke: false,
    showFill: true,
    fill: "#ffffff",
    drType: DrType.IMAGE
});

export function createDrImage(properties: any): DrImage {
    return Object.assign({}, DEFAULT_IMAGE, properties);
}