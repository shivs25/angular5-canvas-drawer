import { OnInit, TemplateRef, EventEmitter } from '@angular/core';
import { DrObject } from '../../models/dr-object';
export declare class DrObjectComponent implements OnInit {
    elementTemplate: TemplateRef<any>;
    data: DrObject;
    click: EventEmitter<DrObject>;
    onClick(data: DrObject): void;
    constructor();
    ngOnInit(): void;
}
