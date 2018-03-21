import { DrObjectComponent } from '../dr-object/dr-object.component';
import { DrawerObjectHelperService } from '../../services/drawer-object-helper.service';
import { DrObject } from '../../models/dr-object';
import { TextRenderingService } from '../../services/text-rendering.service';
export declare class DrTextComponent extends DrObjectComponent {
    private _textService;
    TEXT_PADDING: number;
    lineData: any;
    private _data;
    constructor(_textService: TextRenderingService, _objectHelperService: DrawerObjectHelperService);
    visualData: DrObject;
    getTextX(): number;
    getTextY(): number;
    getMultiLineTextY(): number;
    getVAlignment(): string;
    getHAlignment(): string;
}
