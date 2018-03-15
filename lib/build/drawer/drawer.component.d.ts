import { OnInit, ElementRef, EventEmitter } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { DataStoreService } from '../services/data-store.service';
import { MouseEventData } from '../models/mouse-event-data';
export declare class DrawerComponent implements OnInit {
    private _dataService;
    private _elementRef;
    elementState: any;
    overrideProperties: any;
    hoverClass: any;
    handleMouseEvents: boolean;
    clickedObject: EventEmitter<DrObject>;
    mouseDownObject: EventEmitter<MouseEventData>;
    mouseMoveObject: EventEmitter<MouseEventData>;
    mouseUpObject: EventEmitter<MouseEventData>;
    private _location;
    constructor(_dataService: DataStoreService, _elementRef: ElementRef);
    ngOnInit(): void;
    isHiddenSelection(id: number): DrObject;
    onBackgroundClick(evt: any): void;
    onBackgroundMouseDown(evt: any): void;
    onBackgroundMouseMove(evt: any): void;
    onBackgroundMouseUp(evt: any): void;
    onClick(data: DrObject): void;
    onMouseDown(data: MouseEventData): void;
    onMouseMove(data: MouseEventData): void;
    onMouseUp(data: MouseEventData): void;
}
