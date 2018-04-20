import { DrRect } from "./dr-rect";
export interface DrImage extends DrRect {
    initial: boolean;
    url: string;
    showImage: boolean;
}
export declare const DEFAULT_IMAGE: DrImage;
export declare function createDrImage(properties: any): DrImage;
