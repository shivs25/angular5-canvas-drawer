import { OnInit, ElementRef } from '@angular/core';
import { DrText } from '../../models/dr-text';
import { DataStoreService } from '../../services/data-store.service';
import { EditableTextAreaComponent } from '../editable-text-area/editable-text-area.component';
import { DrPoint } from '../../models/dr-point';
export declare class TextEditToolComponent implements OnInit {
    private _dataService;
    private _elementRef;
    _container: ElementRef;
    _textArea: EditableTextAreaComponent;
    currentObject: DrText;
    cssBounds: any;
    textAreaStyle: any;
    selectionTransform: string;
    rotation: number;
    inputBorder: boolean;
    selectionStyle: any;
    _offset: DrPoint;
    constructor(_dataService: DataStoreService, _elementRef: ElementRef);
    onTextAreaInput(evt: any): void;
    onTextAreaLoaded(evt: any): void;
    onClick(): void;
    ngOnInit(): void;
    private getTop();
    private getBottom();
    private getMarginTop(offsetHeight);
    private getHAlign();
    private divify();
}
