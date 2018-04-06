import { DrRect } from "./dr-rect";
export interface DrImage extends DrRect {
    url: string;
}
export declare const DEFAULT_IMAGE: DrImage;
export declare function createDrImage(properties: any): DrImage;
