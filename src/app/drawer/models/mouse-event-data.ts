import { DrPoint } from "./dr-point";
import { DrObject } from "./dr-object";

export interface MouseEventData {
    location: DrPoint;
    data: DrObject;
}