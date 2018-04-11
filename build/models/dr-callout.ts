import { DrObject, DEFAULT_OBJECT } from "./dr-object";
import { DrType } from "./dr-type.enum";
import { DrStyledObject, DEFAULT_STYLED_OBJECT } from "./dr-styled-object";
import { DrRect, DEFAULT_RECT } from "./dr-rect";
import { DrPoint } from "./dr-point";

export interface DrCallout extends DrRect {

  pointerLocked: boolean,
  basePoint1: DrPoint;
  basePoint2: DrPoint;
  pointerLocation: DrPoint;
  drawPointer: boolean;
}

export const DEFAULT_CALLOUT: DrCallout = Object.assign({}, DEFAULT_RECT, {
   pointerLocked: false,
   basePoint1: { x: 0, y: 0 },
   basePoint2: { x: 0, y: 0 },
   pointerLocation: { x: 0, y: 0 },
   drawPointer: true,
   drType: DrType.CALLOUT
});

export function createDrCallout(properties: any): DrCallout {
    return  Object.assign({}, DEFAULT_CALLOUT, properties);
}