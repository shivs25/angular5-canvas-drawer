import { DrRect, DEFAULT_RECT } from "./dr-rect";
import { DrType } from "./dr-type.enum";

export interface DrImage extends DrRect {
    initial: boolean;
    url: string;
    showImage: boolean;
}

export const DEFAULT_IMAGE: DrImage = Object.assign({}, DEFAULT_RECT, {
    url: "/assets/image-placeholder-dark.png",
    showStroke: false,
    showFill: false,
    stroke: "#000000",
    fill: "#ffffff",
    drType: DrType.IMAGE,
    initial: true,
    showImage: true
});

export function createDrImage(properties: any): DrImage {
    return Object.assign({}, DEFAULT_IMAGE, properties);
}