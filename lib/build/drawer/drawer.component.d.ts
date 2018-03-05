import { OnInit, EventEmitter } from '@angular/core';
import { DrObject } from '../models/dr-object';
import { DataStoreService } from '../services/data-store.service';
import { MouseEventData } from '../models/mouse-event-data';
export declare class DrawerComponent implements OnInit {
    private _dataService;
    elementState: any;
    overrideProperties: any;
    hoverClass: any;
    handleMouseEvents: boolean;
    clickedObject: EventEmitter<DrObject>;
    mouseDownObject: EventEmitter<MouseEventData>;
    mouseMoveObject: EventEmitter<MouseEventData>;
    mouseUpObject: EventEmitter<MouseEventData>;
    elements: DrObject[];
    constructor(_dataService: DataStoreService);
    ngOnInit(): void;
    onBackgroundClick(evt: any): void;
    onBackgroundMouseDown(evt: any): void;
    onBackgroundMouseMove(evt: any): void;
    onBackgroundMouseUp(evt: any): void;
    onClick(data: DrObject): void;
    onMouseDown(data: MouseEventData): void;
    onMouseMove(data: MouseEventData): void;
    onMouseUp(data: MouseEventData): void;
}
