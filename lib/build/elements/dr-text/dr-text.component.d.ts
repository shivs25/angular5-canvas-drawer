import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrObject } from '../../models/dr-object';
export declare class DrTextComponent extends DrObjectComponent {
    TEXT_PADDING: number;
    lineData: any;
    private _data;
    visualData: DrObject;
    getTextX(): number;
    getTextY(): number;
    getMultiLineTextY(): number;
    getVAlignment(): string;
    getHAlignment(): string;
}
