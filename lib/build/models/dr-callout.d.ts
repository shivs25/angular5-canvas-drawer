import { DrRect } from "./dr-rect";
import { DrPoint } from "./dr-point";
export interface DrCallout extends DrRect {
    pointerLocked: boolean;
    basePoint1: DrPoint;
    basePoint2: DrPoint;
    pointerLocation: DrPoint;
}
export declare const DEFAULT_CALLOUT: DrCallout;
export declare function createDrCallout(properties: any): DrCallout;
