import { OnInit, TemplateRef, EventEmitter } from '@angular/core';
import { DrObject } from '../../models/dr-object';
import { MouseEventData } from '../../models/mouse-event-data';
export declare class DrObjectComponent implements OnInit {
    elementTemplate: TemplateRef<any>;
    data: DrObject;
    overrideProperties: any;
    hoverClass: string;
    canInteract: boolean;
    elementId: any;
    visualData: DrObject;
    click: EventEmitter<DrObject>;
    mouseDown: EventEmitter<MouseEventData>;
    mouseMove: EventEmitter<MouseEventData>;
    mouseUp: EventEmitter<MouseEventData>;
    onClick(evt: any, data: DrObject): void;
    onMouseDown(evt: any, data: DrObject): void;
    onMouseMove(evt: any, data: DrObject): void;
    onMouseUp(evt: any, data: DrObject): void;
    constructor();
    ngOnInit(): void;
}
