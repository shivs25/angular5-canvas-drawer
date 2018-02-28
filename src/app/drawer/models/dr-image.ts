import { DrRect, DEFAULT_RECT } from "./dr-rect";
import { DrType } from "./dr-type.enum";

export interface DrImage extends DrRect {

    url: string;
    
}

export const DEFAULT_IMAGE: DrImage = Object.assign({}, DEFAULT_RECT, {
    url: "",
    drType: DrType.IMAGE
});

export function createDrImage(properties): DrImage {
    return Object.assign({}, DEFAULT_IMAGE, properties);
}