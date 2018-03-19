import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrObject } from '../../models/dr-object';
export declare const TEXT_PADDING: number;
export declare const SPACE_PLACEHOLDER: string;
export declare function replaceSpaces(s: string): string;
export declare class DrTextComponent extends DrObjectComponent {
    TEXT_PADDING: number;
    lineData: any;
    private _data;
    visualData: DrObject;
    redoSpaces(l: string): string;
    getTextX(): number;
    getTextY(): number;
    getMultiLineTextY(): number;
    getVAlignment(): string;
    getHAlignment(): string;
}
