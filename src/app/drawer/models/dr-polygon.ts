import { DrObject } from "./dr-object";
import { DrPoint } from './dr-point';

export interface DrPolygon extends DrObject {

    points: DrPoint[];
}
